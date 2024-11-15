"use client";
import React from "react";

// const CommonButton = ({type, onClick, loader, className="", disabled=false, text}) => {
const CommonButton = ({
  type,
  loader,
  className = "",
  disabled = false,
  onClick,
  text,
}) => {
  return (
    <>
      <button disabled={disabled} onClick={onClick} type={type} className={className}>
        {/* {loader ? "loading" : text} */}
        {/* {`${text} ${loader ? "<Loader/>" : ""}`} */}
        {text}
      </button>
    </>
  );
};

export default CommonButton;
