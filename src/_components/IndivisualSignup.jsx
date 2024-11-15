"use client";
import CommonTextInput from "@/_form-fields/CommonTextInput";
import { IndivisualSignupValidations } from "@/_validations/authValidations";
import React from "react";
import { useForm } from "react-hook-form";
import PasswordSection from "./_common/PasswordSection";
import LocationField from "./_common/LocationField";
import AuthRedirectSection from "./_common/AuthRedirectSection";
import TermsAndConditionsText from "./TermsAndConditionsText";
import { useRouter } from "next/navigation";
import CommonButton from "./_common/CommonButton";
import Cookies from "js-cookie";
import { signUp } from "@/_Api Handlers/apiFunctions";
import { successType, toastMessage } from "@/_utils/toastMessage";
import { DEFAULT_ERROR_MESSAGE, STATE_OPTIONS } from "@/_constants/constant";
import { returnAddressInfo } from "@/_utils/helpers";
import CommonSelect from "@/_form-fields/CommonSelect";

const IndivisualSignup = () => {
  const router = useRouter();
  const formConfig = useForm();
  const {
    handleSubmit,
    watch,
    register,
    setValue,
    formState: { errors },
  } = formConfig;
  const onSubmit = (values) => {
    const {
      address,
      password,
      first_name,
      last_name,
      phone_number,
      terms_and_conditions,
      zipcode,
      email,
      city,
      state,
    } = values;
    // update required : Confirm about city,state and country key values

    // for extracting state , city and country from address
    // const { state, city, country } = returnAddressInfo(
    //   address?.address_components
    // );

    const payload = {
      name: `${first_name} ${last_name}`,
      address: address?.formatted_address,
      city: city?.formatted_address,
      state: state?.value,
      country: "US",
      zipcode: zipcode,
      term_condition: terms_and_conditions,
      contact_no: phone_number,
      user: {
        email: email,
        role: "bakery",
        first_name: first_name,
        last_name: last_name,
        password: password,
      },
      // need to confirm this from backend first
      primary: true,
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
  console.log(watch("city"), "city");

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto space-y-4 font-[sans-serif] text-[#333] mt-4"
      >
        <h2>Sign Up!</h2>
        {/* section1 */}
        <CommonTextInput
          fieldName="first_name"
          formConfig={formConfig}
          type="text"
          placeholder="Enter first name"
          rules={IndivisualSignupValidations["first_name"]}
          label="First Name"
        />
        <CommonTextInput
          fieldName="last_name"
          formConfig={formConfig}
          type="text"
          placeholder="Enter last name"
          rules={IndivisualSignupValidations["last_name"]}
          label="Last Name"
        />
        {/* section1 */}
        {/* section2 */}
        <CommonTextInput
          fieldName="email"
          formConfig={formConfig}
          type="text"
          placeholder="Enter your email"
          rules={IndivisualSignupValidations["email"]}
          label="Email Address"
        />
        <CommonTextInput
          fieldName="phone_number"
          formConfig={formConfig}
          type="text"
          placeholder="Enter your phone number"
          rules={IndivisualSignupValidations["phone_number"]}
          label="Phone Number"
          isNumberOnly={true}
        />
        {/* section2 */}
        {/* password section */}
        <PasswordSection
          formConfig={formConfig}
          fieldOneName={"password"}
          fieldTwoName={"confirm_password"}
        />
        {/* password section */}
        <LocationField
          fieldName="address"
          formConfig={formConfig}
          placeholder="Enter Delivery Address"
          label="Delivery Address"
          rules={IndivisualSignupValidations["address"]}
          options={{
            types: ["address"],
            componentRestrictions: { country: ["us"] },
          }}
        />
        <CommonSelect
          options={STATE_OPTIONS}
          type="react-select"
          fieldName="state"
          formConfig={formConfig}
          placeholder="Select State"
          rules={IndivisualSignupValidations["state"]}
          label="State"
        />
        <LocationField
          fieldName="city"
          formConfig={formConfig}
          placeholder="Enter City"
          label="City"
          rules={IndivisualSignupValidations["city"]}
          options={{
            types: ["(cities)"],
          }}
        />
        <CommonTextInput
          fieldName="zipcode"
          formConfig={formConfig}
          type="text"
          placeholder="Enter your zip code"
          rules={IndivisualSignupValidations["zipcode"]}
          label="ZIP code"
          isNumberOnly={true}
        />
        <CommonTextInput
          fieldName="contact_method"
          formConfig={formConfig}
          type="text"
          placeholder="Enter your prefered contact code"
          rules={IndivisualSignupValidations["contact_method"]}
          label="Preferred Contact Method"
        />
        <div className="terms-and-conditions">
          <TermsAndConditionsText
            register={register}
            rules={IndivisualSignupValidations["terms_conditions"]}
            fieldName="terms_and_conditions"
            errors={errors}
          />{" "}
        </div>
        <CommonButton
          type="submit"
          className="sign-in-button"
          text="Create an account"
        />
        <AuthRedirectSection
          text="Have an account?"
          linkText="Log in"
          linkUrl="/login"
          className="right-align"
        />{" "}
      </form>
    </div>
  );
};

export default IndivisualSignup;
