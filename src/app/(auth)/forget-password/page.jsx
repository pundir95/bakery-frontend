"use client";
import {
  changePassword,
  forgetPassword,
  sendEmailOtp,
  verifyOtp,
} from "@/_Api Handlers/apiFunctions";
import CommonButton from "@/_components/_common/CommonButton";
import ChangePassword from "@/_components/ChangePassword";
import OtpInput from "@/_components/OtpInput";
import OtpSection from "@/_components/OtpSection";
import { DEFAULT_ERROR_MESSAGE } from "@/_constants/constant";
import CommonTextInput from "@/_form-fields/CommonTextInput";
import { successType, toastMessage } from "@/_utils/toastMessage";
import { ForgetPasswordValidations } from "@/_validations/authValidations";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ForgetPassword = () => {
  const router = useRouter();
  const formConfig = useForm();
  const [step, setStep] = useState();
  // storing email and otp for last step
  const [passwordUpdatePayload, setPasswordUpdatePayload] = useState({
    otp: "",
    email: "",
  });

  console.log(step, "step");
  const { handleSubmit, watch } = formConfig;

  // for step 1 (send otp)
  const onSubmit = (values) => {
    setPasswordUpdatePayload({
      ...passwordUpdatePayload,
      email: values?.email,
    });
    sendEmailOtp(values)
      .then((res) => {
        setStep("otp");
        toastMessage("OTP Sent successfully to you email", successType);
      })
      .catch((err) => console.log(err));
  };

  // step 2:verify otp
  const handleSubmitOTP = (otp) => {
    setPasswordUpdatePayload({ ...passwordUpdatePayload, otp: otp });
    // toastMessage("OTP verified successfully", successType);
    // setStep("password-change");
    const payload = {
      otp: otp,
      email: passwordUpdatePayload?.email,
    };
    verifyOtp(payload)
      .then((res) => {
        toastMessage("OTP verified successfully", successType);
        setStep("password-change");
      })
      .catch((err) => {
        // update required: add invalid otp message according to the api response
        console.log(err, "otp verify error");
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
      });
  };

  // step 2:update password

  const onPasswordChange = (values) => {
    const { password } = values;
    // toastMessage("Password updated successfully", successType);
    // router.push("/home");

    const payload = {
      email: passwordUpdatePayload?.email,
      new_password: password,
    };
    changePassword(payload)
      .then((res) => {
        toastMessage("Password updated successfully", successType);
        router.push("/home");
      })
      .catch((err) =>
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE)
      );
  };

  return (
    <div>
      {step !== "password-change" && step !== "otp" && (
        <>
          <h3>Forgot your Password?</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <CommonTextInput
              fieldName="email"
              formConfig={formConfig}
              type="text"
              placeholder="Enter Email"
              rules={ForgetPasswordValidations["email"]}
              label="Email address"
            />
            <CommonButton text="Send OTP" type="submit" />
          </form>
        </>
      )}
      {step === "otp" && <OtpSection handleSubmitOTP={handleSubmitOTP} />}
      {step === "password-change" && (
        <ChangePassword
          onPasswordChange={onPasswordChange}
          fieldOneName="password"
          fieldTwoName="confirm_password"
        />
      )}
    </div>
  );
};

export default ForgetPassword;