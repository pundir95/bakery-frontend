import React from "react";
import CommonButton from "./_common/CommonButton";

const SingleCategory = ({ data }) => {
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
      <div className="flex flex-col items-center cursor-pointer">
        <img
          src={"/images/category-image.png"}
          className="w-28 h-28 rounded-full object-cover"
          alt="category-image"
        />
        <p className="mt-2 text-center text-sm font-medium">{name}</p>
      </div>
      <CommonButton type={"button"} text="Add to cart" />
    </>
  );
};

export default SingleCategory;
