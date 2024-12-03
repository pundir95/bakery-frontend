"use client";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import { callApi } from "@/_Api Handlers/apiFunctions";
import { successType, toastMessage } from "@/_utils/toastMessage";
import { ADD_TO_CART } from "@/_Api Handlers/endpoints";
import { createPreview } from "@/_utils/helpers";
import Heart from "../../../public/icons/heart";
import Cart from "../../../public/icons/cart";
import Eye from "../../../public/icons/eye";

const CardComponentOne = ({ data, showButtons = false }) => {
  console.log(data, "this is data");
  // commented for future use
  // const { images, name } = data;
  const { title, imageUrl, price, name } = data;

  const pathName = usePathname();

  const isProductsPage = pathName === "/products";

  const handleCart = (event, payload) => {
    event.stopPropagation();

    callApi({
      endPoint: ADD_TO_CART,
      method: "POST",
      payload: payload,
    })
      .then((res) => {
        toastMessage("Product added successfully");
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  return (
    <div className="group relative">
      {" "}
      <div className="max-w-xs rounded overflow-hidden border border-gray-200 pt-12 pb-7 rounded-[26px]">
        <Image
          // src={images[0]}
          src={
            data?.feature_image
              ? createPreview(data?.feature_image?.image)
              : "/images/cardImage.png"
          }
          // src="/images/cardImage.png"
          alt="card-image"
          width={280}
          height={202}
        />

        <div className="flex space-x-4 px-4 justify-between">
          {/* <h2 className="font-bold text-xl mb-2">{name}</h2> */}
          <p className="text-xl mb-0">{name}</p>
          <p className="font-bold text-redPrimary text-xl mb-0">
            ${data?.product_detail?.inventory?.regular_price}
          </p>

          {/* <p className="text-red-600 text-lg">{`$ ${price}`}</p> */}
        </div>
      </div>
      {isProductsPage && (
        <button
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={(event) => handleCart(event, data)}
        >
          Add to Cart
        </button>
      )}
      {showButtons && (
        <div
          className="absolute inset-0 flex items-center justify-center gap-2 
  opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/80 rounded-[26px]"
        >
          <button className="p-3 bg-red-500 text-white rounded-full">
            <Heart fill="white" />
          </button>
          <button
            className="p-3 bg-red-500 text-white rounded-full"
            onClick={handleCart}
          >
            <Cart fill="white" />
          </button>
          <button className="p-3 bg-red-500 text-white rounded-full">
            <Eye fill="white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CardComponentOne;
