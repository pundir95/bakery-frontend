"use client";
import React, { useState } from "react";
import RatingComponent from "./RatingComponent";
import CommonButton from "./_common/CommonButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import LocationField from "./_common/LocationField";
import { useForm } from "react-hook-form";
const quantities = ["100gm", "150gm", "200gm"];

const SingleProductDetail = ({ rating = 3, reviews = 6 }) => {
  const formConfig = useForm();
  const [count, setCount] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState("100gm");
  const handleCounter = (action) => {
    if (action === "increement") {
      setCount((prev) => prev + 1);
    } else {
      if (count > 0) {
        setCount((prev) => prev - 1);
      }
    }
  };
  return (
    <div>
      <RatingComponent rating={rating} reviews={reviews} />
      <div className="text-[35px] font-normal leading-[42px] text-left text-black">
        Premium Cookies
      </div>
      <div className="product-code text-[16px] font-normal leading-[42px] text-left text-[#9E9E9E]">
        Product Code: COOK12345
      </div>
      <div className="product-price product-code text-[40px] font-normal leading-[42px] text-left text-[#FF6363]">
        $10.00
      </div>
      <div className="quantities mt-3">
        {quantities?.map((qt) => (
          <CommonButton
            type="button"
            text={qt}
            // className={`bg-[#FF6363] w-[94px] h-[40px] mr-2 rounded-[7px] `}
            className={`${qt === selectedQuantity ? "bg-[#FF6363]" : "bg-[#E7E7E7]"} w-[94px] h-[40px] mr-2 rounded-[7px]`}
            onClick={()=> setSelectedQuantity(qt)}
          />
        ))}
      </div>
      <div className="quantity-section">
        <div className="text-[35px] font-normal leading-[42px] text-left text-black">
          Quantity
        </div>
        <div className="min-quantity">Min Quantity : 10</div>
        <div className="text-[16px] font-normal leading-[42px] text-left text-[#9E9E9E]">
          Minimum order quantities may vary based on your location
        </div>

        <div className="counterDiv ">
          <div
            className="decreement"
            onClick={() => handleCounter("decrement")}
          >
            <FontAwesomeIcon icon={faMinus} />
          </div>
          <div className="count-display">{count}</div>
          <div
            className="increement"
            onClick={() => handleCounter("increement")}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
      </div>
      <CommonButton
        text="Add to cart"
        type="button"
        className="bg-red-500 text-white px-6 py-2 rounded-7px mt-2"
      />{" "}
      <div className="deliver-location">
        <p className=" text-[#000000]">Deliver Location</p>
        <LocationField formConfig={formConfig} fieldName="delivery_location" />
        <CommonButton
          type="button"
          text="Change"
          className={`bg-[#FF6363] w-[94px] h-[40px] mr-2 rounded-[7px] mt-2 `}
        />
      </div>
      <div className="description flex items center space-x-40">
        <p className="text-[#8F8F8F]">Description</p>
        <FontAwesomeIcon
          className="text-[#8F8F8F] cursor-pointer"
          icon={showDescription ? faMinus : faPlus}
          onClick={() => setShowDescription((prev) => !prev)}
        />
      </div>
      {showDescription &&
        "Indulge in the timeless delight of our Classic Chocolate Chip Cookies, baked to golden perfection with rich, velvety chocolate chips in every bite. Crispy on the edges, chewy in the center—these cookies are a classic for a reason. For the true chocolate lover, our Double Chocolate Fudge Cookies offer a decadent experience. Packed with dark chocolate chunks and a soft, fudgy center, each cookie is a rich, indulgent treat that melts in your mouth."}
    </div>
  );
};

export default SingleProductDetail;
