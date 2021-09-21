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
          className="p-3 border-1 shadow-xl" />
      </label>
    </>
  );
}