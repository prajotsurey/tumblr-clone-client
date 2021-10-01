import React from 'react'
import Image from 'next/image'
import { NoteSection } from './NoteSection';
import { Post as PostType } from '../generated/graphql';

interface PostProps {
  post: PostType
}

export const Post: React.FC<PostProps> = ({post}) => {
  return (
    <div className="flex flex-row mb-5">
      <div className="rounded-sm  overflow-hidden w-dashboardProfile h-dashboardProfile mr-6 right-full top-0 bg-gray-200 ">
        <Image 
          src="/pyramid_open_512.png" 
          width={500}
          height={500} 
          alt="Picture of the author" />
      </div>
      <div className="flex flex-col flex-grow bg-white rounded-sm">
        <div className="p-3 pb-0 mb-3">
          {post.creator.username}
        </div>
        <div className="px-3 pb-3 text-3xl">
          {post.text}
        </div>
        <div className="mt-4 px-3 pb-3 flex flex-row justify-between text-gray-400 ">
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