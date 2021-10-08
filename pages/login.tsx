import { Form, Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { getAccessToken, setAccessToken } from '../accessToken';
import { CustomButton } from '../components/CustomButton';
import { FormErrorSection } from '../components/FormErrorSection';
import { Header } from '../components/Header';
import { InputField } from '../components/InputField';
import { useLoginMutation, useMeQuery } from '../generated/graphql';
import mapToFormikErrors from '../utils/mapToFormikErrors';
import withApollo from '../utils/withApollo';
import { useApolloClient } from '@apollo/client';


const Register= () => {

  const [login] = useLoginMutation()
  const router = useRouter();
  const apolloClient = useApolloClient();

  const { data: MeData, loading: MeLoading } = useMeQuery();

  if(MeData?.Me && !MeLoading) {
    router.push('/dashboard')
  }


  return(
    <div className="h-screen bg-tumblrBackground grid grid-cols-1 place-items-center">
      <Header />
    <div className="flex flex-col  w-userFormWidth">
      <div className="text-7xl text-white font-extrabold text-center mb-4">
        tumblr
      </div>
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
              router.push('/dashboard')
              setAccessToken(response.data.login.token)
              await apolloClient.resetStore();

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
              <div >  
                <InputField 
                  name="username"
                  type="text"
                  label="Username"
                  placeholder="Username"
                  />
              </div>
              <div className="mt-2 mb-2">
                <InputField 
                name="password"
                type="password"
                label="password"
                placeholder="Password"
                />
              </div>
              <CustomButton color="blue" text="Log in"/>
            </Form>
            </>
          )}
          
        </Formik>
      </div>
    </div>
  )
}


export default withApollo({ ssr: false })(Register);