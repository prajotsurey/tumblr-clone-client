import React from 'react'
import { CustomLink } from './CustomLink';

interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <div className="width-full h-14 inset-x-0 fixed top-0">
      <div className="flex flex-row h-full w-full items-center align-center justify-between">
        <div className="text-2xl font-extrabold ml-1 text-white">
          t
        </div>
        <div className="flex flex-row">
          <div className="w-24 mr-1">
            <CustomLink text="Log in" color="green" linkTo="/login" variant="small" />
          </div>
          <div className="w-24">
            <CustomLink text="Sign in" color="blue" linkTo="/register" variant="small" />
          </div>
        </div>
      </div>
    </div>
  );
}