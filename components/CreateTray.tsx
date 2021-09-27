import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CreateTrayProps {

}

export const CreateTray: React.FC<CreateTrayProps> = ({}) => {
  return (
    <div className="flex flex-row">
      <div className="rounded-sm overflow-hidden w-dashboardProfile h-dashboardProfile mr-6 right-full top-0 bg-gray-200">
        <Image 
          src="/pyramid_open_512.png" 
          width={500}
          height={500} 
          alt="Picture of the author" />
      </div>
      <div className="flex flex-row flex-grow items-center bg-white rounded-sm h-24 p-4">
        {/* when this link is clicked actual url is loaded which is dashboard with query parameter 'new' */}
          {/* if that page is reloaded the browser reloads the displayed url. As a result the createPost page is reloaded*/}
          {/* https://dev.to/toomuchdesign/contextual-routing-and-modal-routes-in-next-js-18fn */}
        <Link 
          href="/dashboard/?new=1" //actual url
          as="/createPost/" //displayed url
          > 
          <div className="text-4xl font-extrabold ">
            Create Post
          </div>
        </Link>
      </div>
    </div>
  );
}