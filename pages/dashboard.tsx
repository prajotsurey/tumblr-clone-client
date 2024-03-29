import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Modal from 'react-modal';
import { CreatePostForm } from '../components/createPostForm';
import { CreateTray } from '../components/CreateTray';
import { Header } from '../components/Header';
import Loading from '../components/Loading';
import { Post } from '../components/Post';
import { useMeQuery, usePaginatedPostsQuery } from '../generated/graphql';
import withApollo from '../utils/withApollo';

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
  const {data, error, loading, fetchMore} = usePaginatedPostsQuery({
    notifyOnNetworkStatusChange: true
  });
  const router = useRouter()
  const { data:MeData, loading: MeLoading } = useMeQuery();

  if(loading || MeLoading) {
    return(
      <Loading />
    )
  }


  if(!MeData.Me){
    router.push('/')
    return(<>
    </>)
  } else {

  return (
    <div className="min-h-screen font-default bg-tumblrBackground flex flex-row justify-center">
      <Head>
        <title>
          tumblr: dashboard
        </title>
      </Head>
      <Header />
      <div className="flex flex-row relative w-centerFull mt-12 large:mt-24 px-6 justify-center large:justify-start">
        <div className="max-w-centerLeftMax w-full">
          <div className="hidden large:block">
          <CreateTray />
          </div>
          <div className="mt-5">
            {data?.paginatedPosts.posts.map(p => <Post key={p.id} post={p}/>) }
          </div>
          {data?.paginatedPosts.hasMore
          ? <div className="w-centerLeftPostMax ml-auto mb-4 flex flex-row items-center">
            <button
            className="p-1 px-3 font-default rounded-sm bg-tumblrBlue font-bold text-center m-auto" 
            onClick={() => {
              fetchMore({
                variables: {
                  cursor:
                  data.paginatedPosts.posts[data.paginatedPosts.posts.length - 1].createdAt,
                }
              })
            }}>
              Load more posts
            </button>
          </div>
          : null
          }
        </div>
        <div className="hidden sticky top-24 large:flex large:flex-grow h-20 px-4">
          <div className="bg-white rounded-sm w-full h-full p-3">
            <div className="text-xl font-bold">
              {MeData.Me.username}
            </div>
            <div className="text-md text-gray-400">
              Joined at {" "}
              {new Date(MeData.Me.createdAt).toDateString()}
            </div>
          </div>
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
}

export default withApollo({ ssr:true })(dashboard);