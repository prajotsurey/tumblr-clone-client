import { Formik, Form } from 'formik';
import router from 'next/dist/client/router';
import React from 'react'
import { setAccessToken, getAccessToken } from '../accessToken';
import { FormErrorSection } from '../components/FormErrorSection';
import { InputField } from '../components/InputField';
import { useCreatePostMutation } from '../generated/graphql';
import mapToFormikErrors from '../utils/mapToFormikErrors';
import withApollo from '../utils/withApollo';
import login from './login';

interface createPostProps {

}

const createPost: React.FC<createPostProps> = ({}) => {
  const [createPost] = useCreatePostMutation();
  return (
    <div className="h-screen grid grid-cols-1 place-items-center">
      <div className="rounded-md border border-black p-5">
        <Formik
          onSubmit={async (values, {setErrors}) => {
            const response = await createPost({
              variables: {
                ...values
              },
              update: (cache) => {
                cache.evict({ fieldName: 'posts' })
              }
            })
            if(response.data.createpost.errors){
              setErrors(mapToFormikErrors(response.data.createpost.errors))
            } else {
              router.push('/')
            }
          }}
          initialValues={{
            title: "",
            text: "",
          }}
          >
          {({
            touched,
            errors
          }) => (
            <>
            <FormErrorSection errors={errors} touched={touched}/>
            <Form className="flex flex-col">
              <div className="mt-4">  
                <InputField 
                  name="title"
                  type="text"
                  label="title"
                  placeholder="text"
                  />
              </div>
              <div className="mt-4">
                <InputField 
                name="text"
                type="text"
                label="text"
                placeholder="text"
                />
              </div>
              <button className="mt-4 h-8 bg-red block" type="submit">Create Post</button>
            </Form>
            </>
          )}
          
        </Formik>
      </div>
    </div>
  );
}

export default withApollo({ ssr:false })(createPost);