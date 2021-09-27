import React, { useEffect } from 'react'
import { CreateTray } from '../components/CreateTray';
import { CustomLink } from '../components/CustomLink';
import { Header } from '../components/Header';
import { Post } from '../components/Post';
import { useMeQuery, usePostsQuery } from '../generated/graphql';
import withApollo from '../utils/withApollo';
import Modal from 'react-modal';
import { useRouter } from 'next/router'
import { CreatePostForm } from '../components/createPostForm';
import Image from 'next/image'
import { redirect } from 'next/dist/next-server/server/api-utils';

interface dashboardProps {

}

const modalStyles = {
  content: {
    position: 'relative',
    width: '540px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'show'
  },
  overlay: {
    backgroundColor: 'rgba(0, 25, 53, 0.95)'
  }
}

const dashboard: React.FC<dashboardProps> = ({}) => {
  const {data, error, loading} = usePostsQuery();
  const router = useRouter()
  const { data: MeData, loading: MeLoading } = useMeQuery();

  if(!MeData?.Me && !MeLoading) {
    router.push('/')
  }

  return (
    <div className="h-screen bg-tumblrBackground flex flex-row justify-center">
      <Header />
      <div className="flex flex-row w-centerFull mt-24 px-6">
        <div className="max-w-centerLeftMax w-full">
          <CreateTray />
          <div className="mt-5">
            {data?.posts.map(p => <Post post={p}/>) }
          </div>
        </div>
        <div className="">

        </div>
      </div>
      <Modal
        isOpen={!!router.query.new}
        onRequestClose={() => router.push('/dashboard')}
        contentLabel="Post modal"
        style={modalStyles}
      >
        <div className="rounded-md overflow-hidden w-dashboardProfile h-dashboardProfile mr-6 right-full top-0 bg-gray-200 absolute">
          <Image 
            src="/pyramid_open_512.png" 
            width={500}
            height={500} 
            alt="Picture of the author" />
        </div>
        <CreatePostForm />
      </Modal>
    </div>
  );
}

export default withApollo({ ssr:true })(dashboard);