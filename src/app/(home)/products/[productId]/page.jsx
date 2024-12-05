import React from "react";
import CardComponentOne from "@/_components/_common/CardComponentOne";
import SingleProductHeader from "@/_components/SingleProductHeader";
import Image from "next/image";
import RatingComponent from "@/_components/RatingComponent";
import ProductCarousel from "@/_components/ProductCarousel";
import SingleProductDetail from "@/_components/SingleProductDetail";

const RELATED_PRODUCTS = [
  {
    imageUrl: "/images/cardImage.png",
    title: "Whole Grain bread",
    price: 40,
  },
  {
    imageUrl: "/images/cardImage.png",
    title: "Premium Cookies",
    price: 30,
  },
  {
    imageUrl: "/images/cardImage.png",
    title: "Premium Bread",
    price: 10,
  },
  {
    imageUrl: "/images/cardImage.png",
    title: "Premium Cookies",
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
  return (
    <div>
      <SingleProductHeader />
      <div className="product-info">
        {/* carousel */}
        <ProductCarousel images={IMAGES} />
        {/* <div className="product-carousel">Product carousel</div> */}
        <div className="single-product-detail">
          <SingleProductDetail />
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
