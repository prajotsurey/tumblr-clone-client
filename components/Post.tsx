import React from 'react'
import Image from 'next/image'
import { NoteSection } from './NoteSection';
import { Maybe, Note, Post as PostType, Scalars, User } from '../generated/graphql';

interface PostProps {
  post: any
}

export const Post: React.FC<PostProps> = ({post}) => {
  return (
    <div className="flex flex-row mb-5 font-default">
      <div className="hidden large:block rounded-sm overflow-hidden w-dashboardProfile h-dashboardProfile mr-6 right-full top-0 bg-gray-200 flex-shrink-0">
        <Image 
          src="/pyramid_open_512.png" 
          width={500}
          height={500} 
          alt="Picture of the author" />
      </div>
      <div className="flex flex-col flex-grow bg-white w-auto rounded-sm">
        <div className="flex flex-row items-center px-6 py-3 large:bg-white bg-gray-300 mb-3"> 
          <div className="block h-10 w-10 large:hidden">
            <Image 
              src="/pyramid_open_512.png" 
              width={500}
              height={500} 
              alt="Picture of the author" />
          </div>
          <div className="text-sm font-bold pl-3 large:pl-0">
            {post.creator.username}
          </div>
        </div>
        <div className="px-6 pb-3 text-3xl">
          {post.text}
        </div>
        <div className="mt-4 px-6 pb-3 flex flex-row justify-between text-gray-400 ">
          <div className="font-bold text-md">
            {
              post.noteCount === 1
              ?
              `${post.noteCount} note`
              :
              `${post.noteCount} notes`
            }
          </div>
          <NoteSection noteStatus={post.noteStatus} postId={post.id}/>
        </div>
      </div>
    </div>
  );
}