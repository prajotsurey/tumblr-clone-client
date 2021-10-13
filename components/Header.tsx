import React, { useState } from 'react'
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { CustomLink } from './CustomLink';
import { useApolloClient } from '@apollo/client';
import { getAccessToken, setAccessToken } from '../accessToken';
import { useRouter } from 'next/dist/client/router';
import { CustomButton } from './CustomButton';
import Sidebar from './Sidebar';
import { BsList } from "react-icons/bs";
interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = ({}) => {

  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  
  const [ sidebarShow, setSidebarShow ] = useState(false)

  const router = useRouter();
  const handleLogout = async () => {
    await setAccessToken('')
    await logout({
      update: (cache) => {
        cache.evict({ fieldName: 'Me' })
      }
    });
    router.push('/');    
  }

  return (
    <div className="width-full z-50 h-14 inset-x-0 fixed top-0 border-b border-opacity-10 bg-tumblrBackground">
      <div className="flex flex-row h-full max-w-headerMax m-auto items-center justify-between">
          {
            sidebarShow
            ?
            <button className="large:hidden" onClick={() => {setSidebarShow(false)}}><BsList className="text-xl text-white ml-3"/></button>
            :
            <button className="large:hidden" onClick={() => {setSidebarShow(true)}}><BsList className="text-xl text-white ml-3"/></button>
          }
        <div className="text-2xl font-extrabold ml-3 text-white">
          <svg viewBox="0 0 21 36.8" width="20" height="33" fill="RGB(255,255,255)"><path d="M21 36.75h-6.2c-5.577 0-9.733-2.844-9.733-9.646V16.21H0v-5.9C5.576 8.876 7.909 4.12 8.177 0h5.79v9.354h6.757v6.856h-6.756v9.486c0 2.843 1.448 3.826 3.753 3.826h3.271L21 36.75z"></path></svg>
        </div>
        <div className="text-2xl font-extrabold ml-1 text-white large:hidden">
        </div>
        <div className="hidden large:block">
          {!data?.Me
          ?
            <div className="flex flex-row">
              <div className="w-24 mr-1">
                <CustomLink text="Log in" color="green" linkTo="/login" variant="small" />
              </div>
              <div className="w-24">
                <CustomLink text="Sign in" color="blue" linkTo="/register" variant="small" />
              </div>
            </div>
          : 
          <div className="w-24 mr-3">
            <button type="submit" className="p-2 rounded-sm font-default bg-tumblrBlue w-full font-bold text-center" onClick={handleLogout}>
              Logout
            </button>
          </div>
          }
        </div>
        <Sidebar sidebarShow={sidebarShow} setSidebarShow={setSidebarShow} handleLogout={handleLogout}/>
      </div>
    </div>
  );
}