import React from "react";
import CommonButton from "./_common/CommonButton";

const SearchBar = () => {
  return (
    <>
      <div className="flex items-center relative max-w-[900px] mt-8 mx-auto">
        {/* Input Field */}
        <input
          type="text"
          placeholder="Enter your zipcode"
          className="pl-5 py-4 rounded-full outline-none text-gray-600 flex-grow border-2 border-red-500  pr-[195px]"
        />
        {/* Button */}
        <CommonButton
          text="Find"
          type="submit"
          className="bg-red-500 text-white px-6 py-3 max-w-[182px] w-full rounded-full ml-2 absolute top-1/2 -translate-y-1/2 rounded-full right-[6px]"
        />
      </div>
      <p className="max-w-[1000px] text-[18px] mx-auto mt-4">
        Enter your zip code to discover products and offers available near you.
      </p>
    </>
  );
};

export default SearchBar;
