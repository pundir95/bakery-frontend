"use client";
import React,{useState} from "react";
import CommonButton from "./_common/CommonButton";
import { CHECK_ZIP } from "@/_Api Handlers/endpoints";
import { callApi, METHODS } from "@/_Api Handlers/apiFunctions";
import { toastMessage } from "@/_utils/toastMessage";

const SearchBar = () => {
  const [zipCode, setZipCode] = useState();
  
  const handleSearch = () => {
  if(zipCode){
    const payload = {
      "zipcode": zipCode
    }
    callApi({
      endPoint: CHECK_ZIP,
      method: METHODS.post,
      payload: payload,
    })
      .then((response) => {
        toastMessage(response.data?.delivery_message,"success");
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        toastMessage(err.response.data.message,'error')
      })
  }
  };
  return (
    <>
      <div className="flex items-center relative max-w-[900px] mt-8 mx-auto">
        {/* Input Field */}
        <input
          type="text"
          value={zipCode}
          placeholder="Enter your zipcode"
          className="pl-5 py-4 rounded-full outline-none text-gray-600 flex-grow border-2 border-red-500  pr-[195px]"
          onChange={(e) => {
            const numbersOnly = e.target.value.replace(/[^0-9]/g, "");
            setZipCode(numbersOnly);
          }}
        />
        {/* Button */}
        <CommonButton
          text="Find"
          type="submit"
          className="bg-red-500 text-white px-6 py-3 max-w-[182px] w-full rounded-full ml-2 absolute top-1/2 -translate-y-1/2 rounded-full right-[6px]"
          onClick={handleSearch}
        />
      </div>
      <p className="max-w-[1000px] text-[18px] mx-auto mt-4">
        Enter your zip code to discover products and offers available near you.
      </p>
    </>
  );
};

export default SearchBar;
