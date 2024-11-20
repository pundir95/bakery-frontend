"use client";
import CompanySignup from "@/_components/CompanySignup";
import SignupForm from "@/_components/SignupForm";
import SignupTabs from "@/_components/SignupTabs";
import SignupTypeSection from "@/_components/SignupTypeSection";
import VerificationModal from "@/_components/VerificationModal";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const TABS_OPTIONS = {
  individual: "individual",
  company: "company",
};
const SignUp = () => {
  const formConfig = useForm();
  const [activeTab, setActiveTab] = useState(TABS_OPTIONS?.individual);
  const [isVerified, setIsVerified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVerifyClick = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = () => {
    setIsVerified(true);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleTabsClick = (selectedTab) => {
    setActiveTab(selectedTab);
  }
  const onSubmit = (values) => {
    console.log(values,'kdjfhjkdjkkjfdkdsjfs');
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
      // name: `${first_name} ${last_name}`,
      // address: address?.formatted_address,
      // city: city?.formatted_address,
      // state: state?.value,
      // country: "US",
      // zipcode: zipcode,
      // term_condition: terms_and_conditions,
      // contact_no: phone_number,
      // user: {
      //   email: email,
      //   role: "bakery",
      //   first_name: first_name,
      //   last_name: last_name,
      //   password: password,
      // },
      // need to confirm this from backend first
      // primary: true,
      name: `${first_name} ${last_name}`,
      term_condition: terms_and_conditions,
      contact_no: phone_number,
      email: email,
      role: "bakery",
      first_name: first_name,
      last_name: last_name,
      password: password,
      company_name: company_name,
    };

    console.log(payload, "payload");
    signUp(payload)
      .then((res) => {
        toastMessage("User registered succesfully", successType);
        router.push("/login");
      })
      .catch((err) => {
        console.log(err.message, "signup error");
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
      });
  };

  return (
    <div>
      {/* {signUpType === "indivisual" ? (
        <IndivisualSignup />
      ) : signUpType === "company" ? (
        <CompanySignup />
      ) : (
        <SignupTypeSection
          signUpType={signUpType}
          setSignUpType={setSignUpType}
        />
      )} */}
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
      {isModalOpen && (
        <VerificationModal
          handleModalSubmit={handleModalSubmit}
          handleModalClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default SignUp;
