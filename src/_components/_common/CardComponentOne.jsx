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
import { useDispatch } from "react-redux";
import { addItem } from "../../../redux/cartSlice";
import { INSTANCE } from "@/_Api Handlers/apiConfig";

const CardComponentOne = ({ data, showButtons = false }) => {
  console.log(data, "this is data");
  // commented for future use
  // const { images, name } = data;
  const { title, imageUrl, price, name } = data;

  const pathName = usePathname();
  const dispatch = useDispatch();

  const isProductsPage = pathName === "/products";

  const handleCart = (event, payload) => {
    event.stopPropagation();
    console.log(payload,'payloadskfdjksdjf');

    callApi({
      endPoint: ADD_TO_CART,
      method: "POST",
      instanceType:INSTANCE?.authorized,
      payload: {
        "product_variant": payload.id,
        "quantity": 1
      },
    })
      .then((res) => {
        if(res.data.error){
          toastMessage(res.data.error, "error");
          return;
        }
        dispatch(addItem(res.data));
        toastMessage("Product added successfully","success");
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  return (
    <div className="group relative">
      {" "}
      {/* <div className="max-w-xs rounded overflow-hidden border border-gray-200 pt-12 pb-7 rounded-[26px]">
        <Image
          src={
            data?.feature_image
              ? createPreview(data?.feature_image?.image)
              : "/images/cardImage.png"
          }
          alt="card-image"
          width={280}
          height={202}
        />

        <div className="flex space-x-4 px-4 justify-between">
          <p className="text-xl mb-0">{name}</p>
          <p className="font-bold text-redPrimary text-xl mb-0">
            ${data?.product_detail?.inventory?.regular_price}
          </p>

        </div>
      </div> */}
      <div className="w-full">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {/* {favorites.map((favorite) => ( */}
          <div className="gap-2 mb-2 border h-64 w-56 rounded-lg flex flex-col justify-between p-4 cursor-pointer">
            <div className="h-4/5">
              <img
                src={
                  data?.feature_image
                    ? createPreview(data?.feature_image?.image)
                    : "/images/cardImage.png"
                }
                alt={"image"}
                className="h-4/5 w-full"
              />
            </div>
            <div className="flex flex items-center justify-between">
              <div className="text-black font-semibold text-sm">{name}</div>
              <div className="font-semibold" style={{ color: "#FF2F2F" }}>
                ${data?.product_detail?.inventory?.regular_price || price}
              </div>
            </div>
          </div>
          {/* ))} */}
        </div>
      </div>
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
            onClick={(e) => handleCart(e,data)}
          >
            <Cart fill="white" />
          </button>
          <button className="p-3 bg-red-500 text-white rounded-full">
            <Eye fill="white" />
          </button>
        </div>
      )}
      {isProductsPage && (
        <div
        className="absolute inset-0 flex items-center justify-center gap-2 
opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/80 rounded-[26px]"
      >
        <button
          className="p-3 bg-red-500 text-white rounded-lg"
          onClick={(event) => handleCart(event, data)}
        >
          ADD TO CART
        </button>
      </div>
      )}
    </div>
  );
};

export default CardComponentOne;
