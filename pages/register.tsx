import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { InputField } from '../components/InputField';
import withApollo from '../utils/withApollo';
import { gql, useMutation } from '@apollo/client';
import { useRegisterMutation, ValidateOutput } from '../generated/graphql';
import * as Yup from 'yup';
import { FormErrorSection } from '../components/FormErrorSection';
import mapToFormikErrors from '../utils/mapToFormikErrors';

const Register= () => {

  const [register] = useRegisterMutation()
  
  // const validationSchema = Yup.object({

  //   username: Yup.string().required('Required'),
  //   email: Yup.string().email('Invalid email address').required('Required'),
  //   password: Yup.string().required('Required'),
  //   passwordConfirm: Yup.string().required('Required'),

  // })
  
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
            setErrors(mapToFormikErrors(response.data.registerUser.errors))
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