import React, { useEffect } from "react";
import Location from "../../public/icons/location";
import CommonTextInput from "@/_form-fields/CommonTextInput";
import { profileValidations } from "@/_validations/authValidations";
import { useForm } from "react-hook-form";
import CommonButton from "./_common/CommonButton";
import { PROFILE_UPDATE, UPDATE_PASSWORD } from "@/_Api Handlers/endpoints";
import { callApi } from "@/_Api Handlers/apiFunctions";
import { INSTANCE } from "@/_Api Handlers/apiConfig";

const Sidebar = ({
  isSidebarOpen,
  toggleSidebar,
  sideBarItems,
  handleChangePassword,
  profileData,
}) => {
  const formConfig = useForm();
  const { handleSubmit, watch, reset, register, setValue } = formConfig;
  const onSubmit = (values) => {
    console.log(values, "submit");
    if (sideBarItems === "editProfile") {
      const payload = {
        user: {
          first_name: values?.first_name,
          last_name: values?.last_name,
          email: values?.email,
          contact_no: values?.phone_number,
        },
      };
      console.log(payload,"payloadddjkdfjkdf")
      callApi({
        endPoint: PROFILE_UPDATE,
        method: "PATCH",
        instanceType: INSTANCE?.authorized,
        payload: payload,
      })
        .then((res) => {
          console.log(res, "RESPONSE OF ADDRESS NNNNNNNNNNN");
          toastMessage("Profile updated successfully", "success");
        })
        .catch((error) => {
          console.error("Error getting address:", error);
        });
    } else {
      callApi({
        endPoint: UPDATE_PASSWORD,
        method: "POST",
        instanceType: INSTANCE?.authorized,
        payload: {
          old_password: values.old_password,
          new_password: values.new_password,
          confirm_password: values.confirm_password,
        },
      })
        .then((res) => {
          console.log(res, "RESPONSE OF ADDRESS MMMMMMMMMMMMMMMMM");
        })
        .catch((error) => {
          console.error("Error getting address:", error);
        });
    }
    toggleSidebar();
    reset();
  };

  useEffect(() => {
    setValue("first_name", profileData?.user?.first_name);
    setValue("last_name", profileData?.user?.last_name);
    setValue("email", profileData?.user?.email);
    setValue("phone_number", profileData?.contact_no);
  }, [profileData]);
  return (
    <div
      className={`fixed top-0 right-0 w-full max-w-md h-screen bg-white shadow-lg hide-scrollbar z-50 transform ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 z-40`}
    >
      {sideBarItems === "orders" ? (
        <div className="p-4">
          {/* Order Header */}
          <div className="flex gap-6">
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={toggleSidebar}
            >
              ✖
            </button>
            <div className="text-lg font-bold text-black">
              Order #187812973688596
            </div>
          </div>

          <div className="mt-4">
            <div className="flex gap-4 mb-6">
              <div>
                <Location />
              </div>
              <div className="font-medium text-black">bakery</div>
            </div>
            <div className="flex gap-4">
              <div>
                <Location />
              </div>
              <div className="text-black">David Williams</div>
            </div>
            <p className="text-gray-500 text-sm ml-10">
              Storgatan 45, 2 tr (2nd floor), 123 45
              <br />
              Göteborg, Sweden
            </p>
            <div className="ml-10">
              <p className="text-black font-medium mt-2">
                Delivered on Mon, Oct 14, 2024, 12:15 AM
              </p>
              <span className="inline-block bg-[#E8E4FF] text-[#0003A3] text-xs font-medium px-2 py-1 rounded mt-2">
                On Time
              </span>
            </div>
          </div>

          {/* Order Details */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-black">Order Details</h3>
            <ul className="mt-4 space-y-4">
              {[1, 2, 3].map((_, index) => (
                <li key={index} className="flex items-center">
                  <img
                    src="/images/bread.png"
                    alt="Premium Croissant"
                    className="w-12 h-12 rounded mr-4"
                  />
                  <div className="flex-grow">
                    <p className="font-medium text-black">Premium Croissant</p>
                    <p className="text-sm text-[#FF6363]">$20.00</p>
                  </div>
                  <p className="font-medium text-black">$120.00</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Item Totals */}

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between mb-4">
              <p className="text-black">Items Total</p>
              <p className="text-black">$360.00</p>
            </div>
            <div className="flex justify-between text-gray-600">
              <p>Order Packing Charges</p>
              <p>$5.00</p>
            </div>
            <div className="flex justify-between text-gray-600">
              <p>Platform Fee</p>
              <p>$3.00</p>
            </div>
            <div className="flex justify-between text-green-600">
              <p>Discount Applied (FLAT10)</p>
              <p>-$20.00</p>
            </div>
            <div className="flex justify-between text-gray-600">
              <p>Delivery Fee</p>
              <p>$10.00</p>
            </div>
            <div className="flex justify-between text-gray-600">
              <p>Taxes</p>
              <p>$6.00</p>
            </div>
          </div>

          {/* Total Bill */}
          <div className="mt-6 border-t border-black pt-4 flex justify-between">
            <div className="text-black">Paid via Card</div>
            <div className="text-black font-bold">Total Bill</div>
            <div className="text-black font-bold">$364.00</div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4">
            <div className="flex justify-between">
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={toggleSidebar}
              >
                ✖
              </button>
              <div className="text-lg font-bold text-black">Edit Profile</div>
            </div>
            <div className="mt-4 space-y-6">
              {sideBarItems === "editProfile" ? (
                <div>
                  <CommonTextInput
                    formConfig={formConfig}
                    placeholder="Enter First Name"
                    fieldName={"first_name"}
                    rules={profileValidations?.["first_name"]}
                    label="First Name"
                  />
                  <CommonTextInput
                    formConfig={formConfig}
                    placeholder="Enter Last Name"
                    fieldName={"last_name"}
                    rules={profileValidations?.["last_name"]}
                    label="Last Name"
                  />
                  <CommonTextInput
                    formConfig={formConfig}
                    placeholder="Enter Email"
                    fieldName={"email"}
                    rules={profileValidations?.["email"]}
                    label="Email"
                  />
                  <CommonTextInput
                    formConfig={formConfig}
                    placeholder="Enter Contact Number"
                    fieldName={"phone_number"}
                    rules={profileValidations?.["phone_number"]}
                    label="Contact Number"
                    isNumberOnly={true}
                    maxLength={10}
                  />
                  <div
                    className="text-[#01A933] underline cursor-pointer mt-6"
                    onClick={handleChangePassword}
                  >
                    Change Password
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-6">
                  <CommonTextInput
                    formConfig={formConfig}
                    placeholder="Enter Old Password"
                    fieldName={"old_password"}
                    rules={profileValidations?.["old_password"]}
                    label="Enter Old Password"
                    type="password"
                  />
                  <CommonTextInput
                    formConfig={formConfig}
                    placeholder="Enter New Password"
                    fieldName={"new_password"}
                    rules={profileValidations?.["new_password"]}
                    label="Enter New Password"
                    type="password"
                  />
                  <CommonTextInput
                    formConfig={formConfig}
                    placeholder="Confirm New Password"
                    fieldName={"confirm_password"}
                    rules={profileValidations?.["confirm_password"]}
                    label="Confirm New Password"
                    type="password"
                  />
                </div>
              )}
              <div className="flex justify-center mt-20">
                <button
                  className="bg-[#FF6D2F] text-white py-2 px-4 rounded-md"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Sidebar;
