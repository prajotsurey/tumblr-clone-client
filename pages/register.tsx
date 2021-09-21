import { Form, Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { FormErrorSection } from '../components/FormErrorSection';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import mapToFormikErrors from '../utils/mapToFormikErrors';
import withApollo from '../utils/withApollo';

const Register= () => {

  const [register] = useRegisterMutation()
  const router = useRouter();
  return(
    <div className="h-screen grid grid-cols-1 place-items-center">
      <div className="rounded-md border border-black p-5">
        <Formik
          onSubmit={async (values, {setErrors}) => {
            const response = await register({
              variables: {
                options: {
                  ...values
                }
              }
            })
            if(response.data.registerUser.errors){
              setErrors(mapToFormikErrors(response.data.registerUser.errors))
            } else {
              router.push('/login')
            }
          }}
          initialValues={{
            username: "",
            email: "",
            password: "",
            passwordConfirm: ""
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
                  name="email"
                  type="email"
                  label="email"
                  placeholder="email"
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
              <div className="mt-4">
                <InputField 
                name="passwordConfirm"
                type="password"
                label="Confirm password"
                placeholder="Confirm Password"
                />
              </div>
              <button className="mt-4 h-8 bg-red block" type="submit">Submit</button>
            </Form>
            </>
          )}
          
        </Formik>
      </div>
    </div>
  )
}


export default withApollo({ ssr: false })(Register);