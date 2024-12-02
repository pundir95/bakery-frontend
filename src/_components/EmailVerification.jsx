import React from 'react'
import EmailInput from '@/_form-fields/EmailInput'
import CommonButton from './_common/CommonButton';
import { IndivisualSignupValidations } from '@/_validations/authValidations';

const EmailVerification = ({onSubmit,formConfig}) => {
  const { handleSubmit } = formConfig;
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
    <EmailInput
              fieldName="email"
              formConfig={formConfig}
              type="text"
              placeholder="Enter your email"
              className="common-field text-black"
              rules={IndivisualSignupValidations["email"]}
              label="Email Address"
              // handleVerifyClick={handleVerifyClick}
              // isVerified={isVerified}
            />
            <CommonButton
              type="submit"
              className="sign-in-button w-full py-4 mt-4 bg-gray-300 text-gray-600 font-normal mb-2 rounded-md hover:bg-[#5F6F52] max-w-[300px] hover:text-white rounded-[50px] cursor-pointer transition-all duration-400 ease-in-out"
              text="Verify"
            />
            </form>
          </>
  )
}

export default EmailVerification