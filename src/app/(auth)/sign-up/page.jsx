"use client";
import { signUp, verifyEmail,verifyEmailOTP } from "@/_Api Handlers/apiFunctions";
import CompanySignup from "@/_components/CompanySignup";
import SignupForm from "@/_components/SignupForm";
import SignupTabs from "@/_components/SignupTabs";
import SignupTypeSection from "@/_components/SignupTypeSection";
import VerificationModal from "@/_components/VerificationModal";
import { DEFAULT_ERROR_MESSAGE } from "@/_constants/constant";
import { toastMessage } from "@/_utils/toastMessage";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { successType } from "@/_utils/toastMessage";
import { useRouter } from "next/navigation";
import EmailVerification from "@/_components/EmailVerification";
import OtpSection from "@/_components/OtpSection";

const TABS_OPTIONS = {
  individual: "individual",
  company: "company",
};
const SignUp = () => {
  const formConfig = useForm();
  const [activeTab, setActiveTab] = useState(TABS_OPTIONS?.individual);
  const [isVerified, setIsVerified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState();
  const [passwordUpdatePayload, setPasswordUpdatePayload] = useState({
    otp: "",
    email: "",
  });

  const router = useRouter();

  const handleVerifyClick = () => {
    setIsModalOpen(true);
  };

  // const handleModalSubmit = () => {
  //   setIsVerified(true);
  //   setIsModalOpen(false);
  // };

  // const handleModalClose = () => {
  //   setIsModalOpen(false);
  // };

  const handleTabsClick = (selectedTab) => {
    formConfig.reset({
      company_name: "",
      // email: "",
      password: "",
      confirm_password: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      terms_and_conditions: false,
    });
    setActiveTab(selectedTab);
  };

  const handleVerify = (values) => {
    setPasswordUpdatePayload({
      ...passwordUpdatePayload,
      email: values?.email,
    });
    const { email } = values;

    const payload = {
      email: email,
    };

    verifyEmail(payload)
      .then((res) => {
        setStep("otp");
        toastMessage(
          "Verification email has been sent successfully",
          successType
        );
      })
      .catch((err) => {
        const emailError = err?.response?.data?.email?.[0];
        console.log(emailError, "signup error");
        toastMessage(emailError || DEFAULT_ERROR_MESSAGE);
      });
  };

  const handleSubmitOTP = (otp) => {
    setPasswordUpdatePayload({ ...passwordUpdatePayload, otp: otp });

    const payload = {
      otp: otp,
      email: passwordUpdatePayload?.email,
    };
    verifyEmailOTP(payload)
      .then((res) => {
        toastMessage("OTP verified successfully", successType);
        setStep("signup-form");
      })
      .catch((err) => {
        // update required: add invalid otp message according to the api response
        console.log(err, "otp verify error");
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
      });
  };

  const onSubmit = (values) => {
    console.log(values, "kdjfhjkdjkkjfdkdsjfs");

    const {
      company_name,
      email,
      password,
      first_name,
      last_name,
      phone_number,
      terms_and_conditions,
    } = values;
    // update required : Confirm about city,state and country key values

    // for extracting state , city and country from address
    // const { state, city, country } = returnAddressInfo(
    //   address?.address_components
    // );

    const payload = {
      name: `${first_name} ${last_name}`,
      contact_no: phone_number,
      term_condition: terms_and_conditions,
      user: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        role: "bakery",
      },
      address: "123 Bakery St",
      city: "Bakerstown",
      state: "CA",
      country: "SE",
      zipcode: "12345",
      primary: true,
      ...(company_name && { company_name: company_name }),
    };

    console.log(payload, "payload");
    signUp(payload)
      .then((res) => {
        toastMessage("User registered succesfully", successType);
        router.push("/login");
      })
      .catch((err) => {
        const emailError = err?.response?.data?.user?.email?.[0];
        console.log(emailError, "signup error");
        toastMessage(emailError || DEFAULT_ERROR_MESSAGE);
      });
  };

  return (
    <div>
      {step !== "signup-form" && step !== "otp" && (
        <>
          <EmailVerification onSubmit={handleVerify} formConfig={formConfig}/>
        </>
      )}
      {step === "otp" && <OtpSection handleSubmitOTP={handleSubmitOTP} />}
      {step === "signup-form" && (
        <>
          <SignupTabs
            activeTab={activeTab}
            handleTabsClick={handleTabsClick}
            tabOption={TABS_OPTIONS}
          />

          <SignupForm
            formConfig={formConfig}
            activeTab={activeTab}
            tabOption={TABS_OPTIONS}
            onSubmit={onSubmit}
            isVerified={isVerified}
            handleVerifyClick={handleVerifyClick}
          />
        </>
      )}
    </div>
  );
};

export default SignUp;
