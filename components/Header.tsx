import React from 'react'
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { CustomLink } from './CustomLink';
import { useApolloClient } from '@apollo/client';
import { getAccessToken, setAccessToken } from '../accessToken';
import { useRouter } from 'next/dist/client/router';

interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = ({}) => {

  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  
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
    <div className="width-full h-14 inset-x-0 fixed top-0 border-b">
      <div className="flex flex-row h-full w-full items-center align-center justify-between">
        <div className="text-2xl font-extrabold ml-1 text-white">
          t
        </div>
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
        <div className="w-24 mr-1">
          <button type="submit" className="p-2 rounded-sm bg-tumblrBlue w-full font-medium text-center" onClick={handleLogout}>
            Logout
          </button>
        </div>
        }
      </div>
    </div>
  );
}