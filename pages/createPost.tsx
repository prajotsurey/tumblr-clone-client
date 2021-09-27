import { Formik, Form } from 'formik';
import router, { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react'
import { setAccessToken, getAccessToken } from '../accessToken';
import { CreatePostForm } from '../components/createPostForm';
import { CustomButton } from '../components/CustomButton';
import { FormErrorSection } from '../components/FormErrorSection';
import { InputField } from '../components/InputField';
import { useCreatePostMutation, useMeQuery, usePostsQuery } from '../generated/graphql';
import mapToFormikErrors from '../utils/mapToFormikErrors';
import withApollo from '../utils/withApollo';
import login from './login';
import Modal from 'react-modal'
import { CreateTray } from '../components/CreateTray';
import { Header } from '../components/Header';
import { Post } from '../components/Post';

Modal.setAppElement('#__next')


interface createPostProps {

}

const createPost: React.FC<createPostProps> = ({}) => {

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
        isOpen={true}
        onRequestClose={() => router.push('/dashboard')}
        contentLabel="Post modal"
      >
        <CreatePostForm />
      </Modal>
    </div>
  );
}

export default withApollo({ ssr:false })(createPost);