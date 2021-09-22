import Link from 'next/link';
import React from 'react'
import { UrlObject } from 'url';

interface CustomLinkProps {
  color: String | null;
  text: String | null;
}

export const CustomButton: React.FC<CustomLinkProps> = ({text, color}) => {
  if( color === "blue" ) {
    return (
      <button type="submit" className="p-3 rounded-sm bg-tumblrBlue w-full font-medium text-center">
        {text}
      </button>
    );
  } else if( color === "green" ) {
    return (
      <button type="submit" className="p-3 rounded-sm bg-tumblrGreen w-full font-medium text-center">
        {text}
      </button>
    );
  } else {
    return (
      <button type="submit" className="p-3 rounded-sm bg-none w-full font-medium text-center">
        {text}
      </button>
    );
  }
}