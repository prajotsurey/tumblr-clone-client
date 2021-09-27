import { Formik, Form } from 'formik';
import router from 'next/dist/client/router';
import React, { useEffect } from 'react'
import { setAccessToken, getAccessToken } from '../accessToken';
import { CreatePostForm } from '../components/createPostForm';
import { CustomButton } from '../components/CustomButton';
import { FormErrorSection } from '../components/FormErrorSection';
import { InputField } from '../components/InputField';
import { useCreatePostMutation, useMeQuery } from '../generated/graphql';
import mapToFormikErrors from '../utils/mapToFormikErrors';
import withApollo from '../utils/withApollo';
import login from './login';
import Modal from 'react-modal'

Modal.setAppElement('#__next')


interface createPostProps {

}

const createPost: React.FC<createPostProps> = ({}) => {

  useEffect(() => {
    router.prefetch('/dashboard')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Modal
        isOpen={true} // The modal should always be shown on page load, it is the 'page'
        onRequestClose={() => router.push('/dashboard')}
        contentLabel="Post modal"
      >
        <CreatePostForm />
    </Modal>
  );
}

export default withApollo({ ssr:false })(createPost);