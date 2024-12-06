"use client";
import CommonTextInput from "@/_form-fields/CommonTextInput";
import { BillingDetailsValidations } from "@/_validations/billingDetailsValidations";
import React from "react";
import { useForm } from "react-hook-form";
import LocationField from "./_common/LocationField";
import CommonButton from "./_common/CommonButton";

const BillingDetailsSection = ({formConfig}) => {
  // const formConfig = useForm();
  // const { handleSubmit } = formConfig;
  // const onSubmit = (values) => {
  //   console.log(values, "billing details");
  // };
  return (
    <>
    <h2 className="text-xl font-semibold">Billing Details</h2>
    <div className="font-sans w-full mx-auto p-6 bg-[#ffffff] shadow-md rounded-lg border">
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        {/* Billing Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CommonTextInput
            formConfig={formConfig}
            placeholder="Enter Name"
            fieldName={"name"}
            rules={BillingDetailsValidations?.["name"]}
            label="Name"
          />
          <CommonTextInput
            formConfig={formConfig}
            placeholder="Enter Mobile Number"
            fieldName={"phone_number"}
            rules={BillingDetailsValidations?.["phone_number"]}
            label="Mobile Number"
            isNumberOnly={true}
            maxLength={10}
          />
          <CommonTextInput
            formConfig={formConfig}
            placeholder="Enter Email"
            fieldName={"email"}
            rules={BillingDetailsValidations?.["email"]}
            label="Email"
          />
          <CommonTextInput
            formConfig={formConfig}
            placeholder="Enter City"
            fieldName={"city"}
            rules={BillingDetailsValidations?.["city"]}
            label="City"
          />
          <CommonTextInput
            formConfig={formConfig}
            placeholder="Enter State"
            fieldName={"state"}
            rules={BillingDetailsValidations?.["state"]}
            label="State"
          />
          <CommonTextInput
            formConfig={formConfig}
            placeholder="Enter Zip Code"
            fieldName={"zip_code"}
            rules={BillingDetailsValidations?.["zip_code"]}
            label="Zipcode"
            isNumberOnly={true}
          />
        </div>
        {/* <textarea
          placeholder="Address *"
          className="w-full p-3 mt-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          rows="3"
          required
        ></textarea> */}
        <LocationField
            fieldName="address"
            formConfig={formConfig}
            rules={BillingDetailsValidations["address"]}
            placeholder="Enter Address"
            label="Address"
          />
      {/* </form> */}
    </div>
    </>
  );
};

export default BillingDetailsSection;
