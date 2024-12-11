"use client"
import React,{useState,useEffect} from "react";
import CardComponentOne from "@/_components/_common/CardComponentOne";
import SingleProductHeader from "@/_components/SingleProductHeader";
import Image from "next/image";
import RatingComponent from "@/_components/RatingComponent";
import ProductCarousel from "@/_components/ProductCarousel";
import SingleProductDetail from "@/_components/SingleProductDetail";
import { PRODUCT_ENDPOINT } from "@/_Api Handlers/endpoints";
import { callApi } from "@/_Api Handlers/apiFunctions";

const RELATED_PRODUCTS = [
  {
    imageUrl: "/images/cardImage.png",
    name: "Whole Grain bread",
    price: 40,
  },
  {
    imageUrl: "/images/cardImage.png",
    name: "Premium Cookies",
    price: 30,
  },
  {
    imageUrl: "/images/cardImage.png",
    name: "Premium Bread",
    price: 10,
  },
  {
    imageUrl: "/images/cardImage.png",
    name: "Premium Cookies",
    price: 10,
  },
];

const IMAGES = [
  "/images/cardImage.png",
  "/images/bread.png",
  "/images/donut-hero.png",
];

const SingleProductPage = ({ params }) => {
  // could be a specific product name
  const { productId } = params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log('useEffect klsdjfs')
    callApi({
      endPoint: `${PRODUCT_ENDPOINT}${productId}`,
      method: "GET",
    })
      .then((res) => {
        // toastMessage("Product added successfully");
        console.log(res,"klsdjf");
        setProduct(res.data);
        // setCount(res?.data?.product_detail?.advanced?.min_order_quantity ? res?.data?.product_detail?.advanced?.min_order_quantity : 1)
        // setMinQuantity(res?.data?.product_detadvil?.advanced?.min_order_quantity? res?.data?.product_detail?.advanced?.min_order_quantity : 1)
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });  
  },[])

  return (
    <div>
      <SingleProductHeader />
      <div className="product-info">
        {/* carousel */}
        <ProductCarousel images={product?.images} />
        {/* <div className="product-carousel">Product carousel</div> */}
        <div className="single-product-detail">
          <SingleProductDetail product={product}/>
        </div>
      </div>
      {/* related product section */}
      <h1 className="text-center uppercase font-bebas-neue text-[18px] font-bold leading-[78px] text-customRed">
        Related{" "}
        <span className="uppercase font-bebas-neue text-[18px] font-bold leading-[78px] text-customBlack">
          Products
        </span>
      </h1>{" "}
      <div className="mt-3 mb-4 flex space-x-5 justify-center">
        {RELATED_PRODUCTS?.map((curItem, index) => (
          <CardComponentOne key={index} data={curItem} />
        ))}
      </div>
      {/* related product section */}
    </div>
  );
};

export default SingleProductPage;
