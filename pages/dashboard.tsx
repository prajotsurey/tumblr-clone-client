import React from 'react'
import { CreateTray } from '../components/CreateTray';
import { CustomLink } from '../components/CustomLink';
import { Header } from '../components/Header';
import { Post } from '../components/Post';
import { usePostsQuery } from '../generated/graphql';
import withApollo from '../utils/withApollo';
import Modal from 'react-modal';
import { useRouter } from 'next/router'
import { CreatePostForm } from '../components/createPostForm';

interface dashboardProps {

}

const modalStyles = {
  content: {
    width: '540px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 25, 53, 0.95)'
  }
}

const dashboard: React.FC<dashboardProps> = ({}) => {
  const {data, error, loading} = usePostsQuery();
  const router = useRouter()
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
        <CreatePostForm />
      </Modal>
    </div>
  );
}

export default withApollo({ ssr:true })(dashboard);