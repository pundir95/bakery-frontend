import React from "react";
import CommonButton from "./_common/CommonButton";

const SingleCategory = ({ data ,onCategoryClick,currentCategory}) => {
  const { name } = data;
  const handleClick = () => {
    console.log("first");
  };
  return (
    <>
      {/* <div
        className="flex flex-col items-center"
        onClick={() => onCategoryClick(value)}
      > */}
      <div className="flex flex-col items-center cursor-pointer" onClick={()=> onCategoryClick(name)}>
        <img
          src={"/images/category-image.png"}
          className="w-28 h-38 rounded-full object-cover"
          alt="category-image"
        />
        <p className={`mt-2 text-center text-sm font-medium ${currentCategory === name ? "text-[#FF6363]" : "text-black"}`}>{name}</p>
      </div>
    </>
  );
};

export default SingleCategory;
