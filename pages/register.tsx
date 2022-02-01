import { Form, Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { CustomButton } from '../components/CustomButton';
import { FormErrorSection } from '../components/FormErrorSection';
import { Header } from '../components/Header';
import { InputField } from '../components/InputField';
import { TumblrLogo } from '../components/tumblrLogo';
import { useMeQuery, useRegisterMutation } from '../generated/graphql';
import mapToFormikErrors from '../utils/mapToFormikErrors';
import withApollo from '../utils/withApollo';

const Register= () => {

  const [register] = useRegisterMutation()
  const router = useRouter();
  const { data: MeData, loading: MeLoading } = useMeQuery();

  if(MeData?.Me && !MeLoading) {
    router.push('/dashboard')
  }
  return(
    <div className="h-screen bg-tumblrBackground grid grid-cols-1 place-items-center">
      <Head>
        <title>
          tumblr: register
        </title>
      </Head>
      <Header />
      <div className="flex flex-col w-userFormWidth">
        <TumblrLogo />
        <Formik
          onSubmit={async (values, {setErrors}) => {
            const response = await register({
              variables: {
                options: {
                  ...values
                }
              }
            })
            if(response.data.register.errors){
              setErrors(mapToFormikErrors(response.data.register.errors))
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
              <div >  
                <InputField 
                  name="username"
                  type="text"
                  label="Username"
                  placeholder="Username"
                  />
              </div>
              <div className="mt-2">  
                <InputField 
                  name="email"
                  type="email"
                  label="email"
                  placeholder="email"
                  />
              </div>
              <div className="mt-2">
                <InputField 
                name="password"
                type="password"
                label="password"
                placeholder="Password"
                />
              </div>
              <div className="mt-2 mb-2">
                <InputField 
                name="passwordConfirm"
                type="password"
                label="Confirm password"
                placeholder="Confirm Password"
                />
              </div>
              <CustomButton color="blue" text="Sign up"/>
            </Form>
            </>
          )}
          
        </Formik>
        <div className="text-white font-default text-center mt-3 mr-1">
          <span className="mr-1">
            Already have an account? 
          </span>
          <Link href="/login">
            <span className="underline cursor-pointer">
              Log in!
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}


export default withApollo({ ssr: false })(Register);