import { Formik, Form } from 'formik';
import router from 'next/dist/client/router';
import React from 'react'
import { setAccessToken, getAccessToken } from '../accessToken';
import { CustomButton } from '../components/CustomButton';
import { FormErrorSection } from '../components/FormErrorSection';
import { InputField } from '../components/InputField';
import { useCreatePostMutation, useMeQuery } from '../generated/graphql';
import mapToFormikErrors from '../utils/mapToFormikErrors';
import withApollo from '../utils/withApollo';

interface CreatePostFormProps {

}

export const CreatePostForm: React.FC<CreatePostFormProps> = ({}) => {
  const [createPost] = useCreatePostMutation();
  const { data, loading } = useMeQuery();

  return (
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
        errors,
        values,
        handleChange
      }) => (
        <>
        <FormErrorSection errors={errors} touched={touched}/>
        <Form className="flex flex-col">
          <div className="h-12 p-2 flex flex-row justify-end">
            <div className="">
            <button type="submit" className="p-1 px-3 rounded-sm bg-tumblrBlue w-full h-full font-medium text-white text-center">
              Create Post
            </button>
            </div>
          </div>
          <div className="font-bold pl-2 pt-1 pb-4">{data?.Me.username}</div>
          <input 
            name="title"
            type="text"
            placeholder="Title"
            value={values.title}
            onChange={handleChange}
            className="w-full px-6 pt-3 text-2xl rounded-sm focus:outline-none" 
          />
          <textarea 
            name="text"
            placeholder="Go ahead put anything"
            value={values.text}
            onChange={handleChange}
            className="w-full px-6 p-3 text-sm rounded-sm focus:outline-none h-60" 
          />
          <div></div>
        </Form>
        </>
      )}
      
    </Formik>
  );
}
