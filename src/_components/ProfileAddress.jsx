"use client";
import React, { useEffect, useState } from "react";
import Location from "../../public/icons/location";
import CommonTextInput from "@/_form-fields/CommonTextInput";
import { useForm } from "react-hook-form";
import { profileValidations } from "@/_validations/authValidations";
import LocationField from "./_common/LocationField";
import { ADDRESS } from "@/_Api Handlers/endpoints";
import { callApi } from "@/_Api Handlers/apiFunctions";
import { INSTANCE } from "@/_Api Handlers/apiConfig";
import { SWEDEN_COUNTY_OPTIONS } from "@/_constants/constant";
import { BillingDetailsValidations } from "@/_validations/billingDetailsValidations";
import CommonSelect from "@/_form-fields/CommonSelect";
import { toastMessage } from "@/_utils/toastMessage";

const ProfileAddress = ({ addresses }) => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const formConfig = useForm();
  const { handleSubmit, watch, register, setValue,reset } = formConfig;

  const onSubmit = (values) => {
    const payload = {
      name: values?.name,
      email: values?.email,
      contact_no: values?.phone_number,
      address: values?.address?.formatted_address,
      city: values?.city?.formatted_address,
      state: values?.state?.value,
      zipcode: values?.zip_code,
      // "country": "SE",
      primary: false,
    };
    callApi({
      endPoint: ADDRESS,
      method: "POST",
      instanceType: INSTANCE?.authorized,
      payload: payload,
    })
      .then((res) => {
        console.log(res);
        toastMessage(
          ` Address ${isEdit ? "updated" : "created"} successfully`,
          "success"
        );
        reset();
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  useEffect(() => {
    if (isEdit) {
      callApi({
        endPoint: ADDRESS,
        method: "GET",
        instanceType: INSTANCE?.authorized,
      })
        .then((res) => {
          const primaryAddress = res?.data?.results.find(
            (address) => address.primary === true
          );
          console.log(primaryAddress, "primary");
          if (primaryAddress) {
            setValue("name", primaryAddress.name);
            setValue("phone_number", primaryAddress.contact_no);
            setValue("email", primaryAddress.email);
            setValue("city", {
              label: primaryAddress.city,
              value: primaryAddress.city,
            });
            setValue("state", {
              label: primaryAddress.state,
              value: primaryAddress.state,
            });
            setValue("zip_code", primaryAddress.zipcode);
            setValue("address", {
              label: primaryAddress.address,
              value: primaryAddress.address,
            });
          } else {
            console.error("Primary address not found");
          }
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
        });
    }
  }, [isEdit]);

  // const addresses = [
  //   {
  //     address: "Storgatan 45, 2 tr (2nd floor), 123 45 Göteborg, Sweden"
  //   },
  //   {
  //     address: "Storgatan 45, 2 tr (2nd floor), 123 45 Göteborg, Sweden"
  //   },
  //   {
  //     address: "Storgatan 45, 2 tr (2nd floor), 123 45 Göteborg, Sweden"
  //   },
  //   {
  //     address: "Storgatan 45, 2 tr (2nd floor), 123 45 Göteborg, Sweden"
  //   },
  //   {
  //     address: "Storgatan 45, 2 tr (2nd floor), 123 45 Göteborg, Sweden"
  //   },
  //   {
  //     address: "Storgatan 45, 2 tr (2nd floor), 123 45 Göteborg, Sweden"
  //   },
  // ];

  const handleDelete = (id) => {
    console.log(`Delete card with id: ${id}`);
  };

  const handleMakeDefault = (id) => {
    console.log(`Make card with id: ${id} default`);
  };

  const handleEdit = () => {
    setIsEdit(true);
    setShowAddressForm(true);
  };

  return showAddressForm ? (
    <div className="p-6 w-full">
      <div>Add New Address</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <CommonTextInput
          formConfig={formConfig}
          placeholder="Address Line 1"
          fieldName={"address_one"}
          rules={profileValidations?.["address_one"]}
          // label=""6
        />
        <CommonTextInput
          formConfig={formConfig}
          placeholder="Address Line 2"
          fieldName={"address_two"}
          rules={profileValidations?.["address_two"]}
          // label=""
        />
        <CommonTextInput
          formConfig={formConfig}
          placeholder="Address Line 3"
          fieldName={"address_three"}
          rules={profileValidations?.["address_three"]}
          // label=""
        />
        <div className="mt-2">
          <LocationField
            fieldName="city"
            formConfig={formConfig}
            placeholder="Enter City"
            // label="City *"
            // rules={BillingDetailsValidations["city"]}
            options={{
              types: ["(cities)"],
              componentRestrictions: { country: ["se"] },
            }}
          />
        </div>
        <CommonTextInput
          formConfig={formConfig}
          placeholder="Zipcode"
          fieldName={"zipcode"}
        /> */}
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
          {/* <CommonTextInput
            formConfig={formConfig}
            placeholder="Enter City"
            fieldName={"city"}
            rules={BillingDetailsValidations?.["city"]}
            label="City"
          /> */}
          <LocationField
            fieldName="city"
            formConfig={formConfig}
            placeholder="Enter City"
            label="City *"
            rules={BillingDetailsValidations["city"]}
            options={{
              types: ["(cities)"],
              componentRestrictions: { country: ["se"] },
            }}
          />
          {/* <CommonTextInput
            formConfig={formConfig}
            placeholder="Enter State"
            fieldName={"state"}
            rules={BillingDetailsValidations?.["state"]}
            label="State"
          /> */}
          <CommonSelect
            formConfig={formConfig}
            label="State *"
            selectType="react-select"
            placeholder="Select State"
            options={SWEDEN_COUNTY_OPTIONS}
            fieldName="state"
            rules={BillingDetailsValidations["state"]}
            // className="add-edit-input"
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
        </div>
        <button
          className="bg-[#FF6D2F] text-white py-2 px-4 rounded-md mt-4"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  ) : (
    <div className="p-6">
      <div className="flex flex-wrap gap-6">
        {addresses.map((card, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 shadow-md flex gap-4 w-2/5 bg-white"
          >
            <div className="bg-gray-300 p-2 w-min h-min">
              <Location />
            </div>
            <div className="flex flex-col justify-between w-4/5 gap-4">
              <div className="text-black text-sm">{`${card.address}, ${card.city}, ${card.state}`}</div>
              <div className="flex gap-4">
                <div
                  className="text-green-600 text-sm cursor-pointer"
                  onClick={handleEdit}
                >
                  EDIT
                </div>
                <div className="text-gray-400 text-sm cursor-pointer">
                  DELETE
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="mt-6 px-6 py-2 text-sm text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none"
        onClick={() => setShowAddressForm(true)}
      >
        Add Address
      </button>
    </div>
  );
};

export default ProfileAddress;
