import React from 'react'

interface CreateTrayProps {

}

export const CreateTray: React.FC<CreateTrayProps> = ({}) => {
    return (
      <div className="flex flex-row">
        <div className="rounded-sm w-dashboardProfile h-dashboardProfile mr-6 bg-gray-200">

        </div>
        <div className="flex flex-row flex-grow items-center bg-white rounded-sm h-24 p-4">
          <div className="text-4xl font-extrabold">
            Create Post
          </div>
        </div>
      </div>
    );
}