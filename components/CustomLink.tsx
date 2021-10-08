import Link from 'next/link';
import React from 'react'
import { UrlObject } from 'url';

interface CustomLinkProps {
  color: String | null;
  text: String | null;
  linkTo: string | UrlObject;
  variant: 'normal' | 'small';
}

export const CustomLink: React.FC<CustomLinkProps> = ({linkTo, text, color, variant}) => {
  if( color === "blue" ) {
    return (
      <Link href={linkTo}>
        <div className={`${variant === 'normal' ? 'p-3' : 'p-2'} font-default rounded-sm bg-tumblrBlue w-full font-bold text-center cursor-pointer`}>
        {text}
        </div>
      </Link>
    );
  } else if( color === "green" ) {
    return (
      <Link href={linkTo}>
        <div className={`${variant === 'normal' ? 'p-3' : 'p-2'} font-default rounded-sm bg-tumblrGreen w-full font-bold text-center cursor-pointer`}>
        {text}
        </div>
      </Link>
    );
  } else {
    return (
      <Link href={linkTo}>
        <div className={`${variant === 'normal' ? 'p-3' : 'p-2'} font-default rounded-sm bg-none w-full font-bold text-center cursor-pointer`}>
        {text}
        </div>
      </Link>
    );
  }
}