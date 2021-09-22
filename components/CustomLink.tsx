import Link from 'next/link';
import React from 'react'
import { UrlObject } from 'url';

interface CustomLinkProps {
  color: String | null;
  text: String | null;
  linkTo: string | UrlObject;
}

export const CustomLink: React.FC<CustomLinkProps> = ({linkTo, text, color}) => {
  if( color === "blue" ) {
    return (
      <Link href={linkTo}>
        <div className="p-3 rounded-sm bg-tumblrBlue w-full font-medium text-center">
        {text}
        </div>
      </Link>
    );
  } else if( color === "green" ) {
    return (
      <Link href={linkTo}>
        <div className="p-3 rounded-sm bg-tumblrGreen w-full font-medium text-center">
        {text}
        </div>
      </Link>
    );
  } else {
    return (
      <Link href={linkTo}>
        <div className="p-3 rounded-sm bg-none w-full font-medium text-center">
        {text}
        </div>
      </Link>
    );
  }
}