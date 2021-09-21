import React from 'react'
import { ValidateOutput } from '../generated/graphql';

interface FormErrorSectionProps {
  errors: Record<string, string>
  touched: Record<string,Boolean>
}

export const FormErrorSection: React.FC<FormErrorSectionProps> = ({errors, touched}) => {
    return (
      <div>
        {Object.keys(touched).length !== 0 && Object.keys(errors).length !== 0
        ? <div className="p-3 rounded-md  bg-gray-50">Your form has an error. Please fix it.</div>
        : null
        }
      </div>
    );
}