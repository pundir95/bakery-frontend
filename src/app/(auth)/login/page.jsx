"use client";
import AuthRedirectSection from "@/_components/_common/AuthRedirectSection";
import CommonTextInput from "@/_form-fields/CommonTextInput";
import { LoginValidations } from "@/_validations/authValidations";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import CommonButton from "@/_components/_common/CommonButton";
import { login } from "@/_Api Handlers/apiFunctions";
import { useRouter } from "next/navigation";
import { successType, toastMessage } from "@/_utils/toastMessage";
import { manageUserAuthorization } from "@/_utils/helpers";
import { DEFAULT_ERROR_MESSAGE } from "@/_constants/constant";

const Login = () => {
  const router = useRouter();
  const formConfig = useForm();
  const { handleSubmit } = formConfig;
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const onSubmit = (values) => {
    login(values)
      .then((res) => {
        manageUserAuthorization({
          action: "add",
          token: res?.data?.access,
          refreshToken: res?.data?.refresh,
          firstName: res?.data?.first_name,
          lastName: res?.data?.last_name
        });

        // toastMessage("User logged in successfully", successType);
        router.push("/home");
      })
      .catch((err) => {
        toastMessage(
          err?.response?.data?.non_field_errors[0] || DEFAULT_ERROR_MESSAGE
        );
      });
  };
  return (
    <>
      {/* <AuthRedirectSection
        text="Don't have an account?"
        linkText="Sign up"
        linkUrl="/sign-up"
        className="right-align"
      /> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="login-form w-full max-w-[558px]"
      >
        <h2 className="text-3xl font-medium mb-4">Login!</h2>
        <CommonTextInput
          fieldName="email"
          formConfig={formConfig}
          type="text"
          placeholder="Enter Email"
          rules={LoginValidations["email"]}
          label="Username or email address"
          className="w-full common-field mb-4"
        />
        <CommonTextInput
          fieldName="password"
          formConfig={formConfig}
          placeholder="Enter Password"
          rules={LoginValidations["password"]}
          label="Your password"
          type={showPassword ? "text" : "password"}
          //   for adding icons
          onIconClick={toggleShowPassword}
          className="w-full common-field mb-4"
          icon={
            <Image
              src={showPassword ? "/icons/closedEye.svg" : "/icons/openEye.svg"}
              alt="Toggle Password Visibility Icon"
              width={24}
              height={24}
            />
          }
        />
        <AuthRedirectSection
          text=""
          linkText="Forgot your password"
          linkUrl="/forget-password"
          className="text-right"
        />
        <CommonButton
          type="submit"
          className="sign-in-button w-full py-4 mt-4 bg-gray-300 text-gray-600 font-normal mb-2 rounded-md hover:bg-[#5F6F52] max-w-[300px] hover:text-white rounded-[50px] cursor-pointer transition-all duration-400 ease-in-out"
          text="Sign in"
        />
        <AuthRedirectSection
          text="Don't have an acount? "
          linkText="Sign up"
          linkUrl="/sign-up"
        />
      </form>
      {/* <div className="social-login-section">
        <div className="or">Or</div>
        <button
          type="submit"
          onClick={handleLoginWithGoogle}
          className="social-login-button text-center px-5 py-2.5 rounded-full text-black text-sm tracking-wider font-medium border border-current outline-none bg-transparent  active:bg-[#333]"
        >
         <Image
            src="/icons/google-icon.svg"
            alt="Google Icon"
            width={24}
            height={24}
          />
          <div className="text">Continue with Google</div>
        </button>
      </div> */}
    </>
  );
};

export default Login;
