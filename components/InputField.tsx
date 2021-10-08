import React, { InputHTMLAttributes } from 'react';
import { useField, Form, FormikProps, Formik, FieldHookConfig } from 'formik';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
}

export const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, meta, helpers] = useField(props);

  return (
    <>
      <label>
        {/* {props.label} */}
        <input {...field} {...props} 
          className="w-full p-3 border-1 w-full font-default shadow-xl rounded-sm focus:outline-none" />
      </label>
    </>
  );
}