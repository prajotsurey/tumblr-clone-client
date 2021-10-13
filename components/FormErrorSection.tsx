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
      ? <div className="px-3 py-4 mb-2 text-center rounded-sm text-sm text-white bg-black bg-opacity-10">
          {Object.values(errors)[0]}
        </div>
      : null
      }
    </div>
  );
}