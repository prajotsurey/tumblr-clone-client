import React from 'react'
import { Post as postType} from '../generated/graphql';

interface PostProps {
  post: {
    id: number;
    title: string;
    text: string;
  }
}

export const Post: React.FC<PostProps> = ({post}) => {
  return (
    <div className="flex flex-row mb-5">
      <div className="rounded-sm w-dashboardProfile h-dashboardProfile mr-6 bg-gray-200">

      </div>
      <div className="flex flex-col flex-grow bg-white rounded-sm">
        <div className="p-3 pb-0 mb-3">
          username
        </div>
        <div className="px-3 pb-3 text-3xl">
          {post.text}
        </div>
        <div className="mt-4 px-3 pb-3 flex flex-row justify-between text-gray-400 ">
          <div className="font-bold text-md">
            5 notes
          </div>
          <div>
            *Icons*
          </div>
        </div>
      </div>
    </div>
  );
}