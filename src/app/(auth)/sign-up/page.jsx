"use client";
import CompanySignup from "@/_components/CompanySignup";
import IndivisualSignup from "@/_components/IndivisualSignup";
import SignupTypeSection from "@/_components/SignupTypeSection";
import React, { useState } from "react";

const SignUp = () => {
  const [signUpType, setSignUpType] = useState("");
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
      <IndivisualSignup />
    </div>
  );
};

export default SignUp;
