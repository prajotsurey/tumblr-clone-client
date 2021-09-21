import { Form, Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { getAccessToken, setAccessToken } from '../accessToken';
import { FormErrorSection } from '../components/FormErrorSection';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import mapToFormikErrors from '../utils/mapToFormikErrors';
import withApollo from '../utils/withApollo';

const Register= () => {

  const [login] = useLoginMutation()
  const router = useRouter();
  return(
    <div className="h-screen grid grid-cols-1 place-items-center">
      <div className="rounded-md border border-black p-5">
        <Formik
          onSubmit={async (values, {setErrors}) => {
            const response = await login({
              variables: {
                ...values
              }
            })
            if(response.data.login.errors){
              setErrors(mapToFormikErrors(response.data.login.errors))
            } else {
              router.push('/')
              console.log(response.data.login.token)
              setAccessToken(response.data.login.token)
              console.log(getAccessToken())
            }
          }}
          initialValues={{
            username: "",
            password: "",
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
                  name="username"
                  type="text"
                  label="Username"
                  placeholder="Username"
                  />
              </div>
              <div className="mt-4">
                <InputField 
                name="password"
                type="password"
                label="password"
                placeholder="Password"
                />
              </div>
              <button className="mt-4 h-8 bg-red block" type="submit">Login</button>
            </Form>
            </>
          )}
          
        </Formik>
      </div>
    </div>
  )
}


export default withApollo({ ssr: false })(Register);