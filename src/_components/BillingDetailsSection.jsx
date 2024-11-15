"use client";
import CommonTextInput from "@/_form-fields/CommonTextInput";
import { BillingDetailsValidations } from "@/_validations/billingDetailsValidations";
import React from "react";
import { useForm } from "react-hook-form";
import LocationField from "./_common/LocationField";
import CommonButton from "./_common/CommonButton";

const BillingDetailsSection = () => {
  const formConfig = useForm();
  const { handleSubmit } = formConfig;
  const onSubmit = (values) => {
    console.log(values, "billing details");
  };
  return (
    <div className="billing-details border-[1px] border-[#FFFAF433]">
      <div className="heading">
        <h2>Billing Details</h2>
      </div>
      <div className="details-form">
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <LocationField
            fieldName="address"
            formConfig={formConfig}
            rules={BillingDetailsValidations["address"]}
            placeholder="Enter Address"
            label="Address"
          />
          <CommonButton type="submit" text="Submit"/>
        </form>
      </div>
    </div>
  );
};

export default BillingDetailsSection;
