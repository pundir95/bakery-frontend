"use client";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import { callApi } from "@/_Api Handlers/apiFunctions";
import { successType, toastMessage } from "@/_utils/toastMessage";
import { ADD_TO_CART } from "@/_Api Handlers/endpoints";

const CardComponentOne = ({ data }) => {
  const { images, name } = data;

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
      <div className="max-w-xs rounded overflow-hidden shadow-lg border border-gray-200">
        <Image
          // src={images[0]}
          src="/images/cardImage.png"
          alt="card-image"
          width={280}
          height={202}
        />

        <div className="flex space-x-4 p-4">
          <h2 className="font-bold text-xl mb-2">{name}</h2>
          {/* <p className="text-red-600 text-lg">{`$ ${price}`}</p> */}
        </div>
      </div>
      {isProductsPage && (
          <button
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(event) => handleCart(event,data)}
          >
            Add to Cart
          </button>
        )}
    </div>
  );
};

export default CardComponentOne;
