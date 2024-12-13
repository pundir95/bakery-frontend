"use client";
import React, { useEffect, useState } from "react";
import RatingComponent from "./RatingComponent";
import CommonButton from "./_common/CommonButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import LocationField from "./_common/LocationField";
import { useForm } from "react-hook-form";
import { ADD_TO_CART, PRODUCT_ENDPOINT } from "@/_Api Handlers/endpoints";
import { callApi } from "@/_Api Handlers/apiFunctions";
const quantities = ["100gm", "150gm", "200gm"];
import { useParams } from "next/navigation";
import { toastMessage } from "@/_utils/toastMessage";
import { addItem } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

const SingleProductDetail = ({ rating = 3, reviews = 6, product }) => {
  const formConfig = useForm();
  const [count, setCount] = useState(1);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState("");
 
  const params = useParams();
  const productId = params?.productId;

  const dispatch = useDispatch();

  const minQuantity = product?.product_detail?.advanced?.min_order_quantity ? product?.product_detail?.advanced?.min_order_quantity : 1

  const handleCounter = (action) => {
    if (action === "increement") {
      setCount((prev) => prev + 1);
    } else {
      if (count > minQuantity) {
        setCount((prev) => prev - 1);
      }
    }
  };

  const handleCart = (payload) => {
    // event.stopPropagation();
    console.log(payload,'payloadskfdjksdjf');
    if(!selectedQuantity?.inventory?.id){
      toastMessage("Please select a valid quantity", "error");
      return;
    }

    callApi({
      endPoint: ADD_TO_CART,
      method: "POST",
      payload: {
        "product_variant": selectedQuantity?.inventory?.id,
        "quantity": count
      },
    })
      .then((res) => {
        dispatch(addItem(res.data));
        toastMessage("Product added successfully",Success);
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]*>/g, '');
  };
  
  return (
    <div>
      <RatingComponent rating={rating} reviews={reviews} />
      <div className="text-[35px] font-normal leading-[42px] text-left text-black">
        {product?.name}
      </div>
      <div className="product-code text-[16px] font-normal leading-[42px] text-left text-[#9E9E9E]">
        Product Code: COOK12345
      </div>
      <div className="product-price product-code text-[40px] font-normal leading-[42px] text-left text-[#FF6363]">
        ${product?.product_detail?.inventory?.regular_price}
      </div>
      <div className="quantities mt-3">
        {product?.product_detail?.variants?.map((qt) => (
          <CommonButton
            type="button"
            text={`${qt?.inventory?.weight} ${qt?.inventory?.unit}`}
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
        <div className="min-quantity">Min Quantity : {minQuantity}</div>
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
        onClick={()=>handleCart(product) }
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
       stripHtmlTags(product?.description)}
    </div>
  );
};

export default SingleProductDetail;
