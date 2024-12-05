"use client";
import React, { useState, useEffect } from "react";
import SingleCategory from "./SingleCategory";
import FiltersSection from "./FiltersSection";
import CardComponentOne from "./_common/CardComponentOne";
import CommonButton from "./_common/CommonButton";
import Link from "next/link";
import { callApi, METHODS } from "@/_Api Handlers/apiFunctions";
import { PRODUCT_ENDPOINT,CATEGORIES_ENDPOINT } from "@/_Api Handlers/endpoints";
const DUMMY_CATEGORIES = [
  {
    img: "/images/category-image.png",
    label: "Bread",
    value: "",
  },
  {
    img: "/images/category-image.png",
    label: "Cookies",
    value: "cookies",
  },
  {
    img: "/images/category-image.png",
    label: "Macron",
    value: "macron",
  },
  {
    img: "/images/category-image.png",
    label: "Pretzel",
    value: "pretzel",
  },
  {
    img: "/images/category-image.png",
    label: "Cupcakes",
    value: "cupcakes",
  },
  {
    img: "/images/category-image.png",
    label: "Cakes",
    value: "cakes",
  },
];
const DUMMY_PRODUCTS = [
  {
    imageUrl: "/images/cardImage.png",
    title: "Whole Grain bread",
    price: 40,
    id: 1,
  },
  {
    imageUrl: "/images/cardImage.png",
    title: "Premium Cookies",
    price: 30,
    id: 2,
  },
  {
    imageUrl: "/images/cardImage.png",
    title: "Premium Bread",
    price: 10,
    id: 3,
  },
  {
    imageUrl: "/images/cardImage.png",
    title: "Premium Cookies",
    price: 10,
    id: 4,
  },
];
const onCategoryClick = (selectedCategory) => {
  console.log(selectedCategory, "selectedCategory");
};
const CategoriesListing = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [hideButton, setHideButton] = useState(false);
  const [categories, setCategories] = useState([]);

  console.log(categories, "categories");

  // const CategoryDataToMap = categories.slice(4,(products.length - 1))


  useEffect(() => {
    callApi({
      endPoint:PRODUCT_ENDPOINT,
      method:METHODS.get,
      params:{page:page}
    }).then((response)=>{
        setProducts((prev) => [...prev, ...(response?.data?.results || [])]);
        if (response?.data?.next === null) {
                setHideButton(true);
              }
    }).catch((err)=>{
      console.error("Error fetching products:", err);
    }).finally(()=>{

    })
  }, [page]);

  useEffect(() => {
    callApi({
      endPoint:CATEGORIES_ENDPOINT,
      method:METHODS.get,
      params:{page:1}
    }).then((response)=>{
        setCategories(response?.data?.results);
    }).catch((err)=>{
      console.error("Error fetching products:", err);
    }).finally(()=>{

    })
  }, []);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="bg-[#FFFDF4]">
      <h1 className="text-center uppercase font-bebas-neue text-[25px] font-bold leading-[78px] text-customRed">
        Select Your{" "}
        <span className="uppercase font-bebas-neue text-[25px] font-bold leading-[78px] text-customBlack">
          Designed categories,
        </span>
      </h1>{" "}
      {/* categories listing */}
      <div className="flex justify-center items-center space-x-4">
        {categories?.map((cat, index) => (
          <SingleCategory
            data={cat}
            key={index}
            // onCategoryClick={onCategoryClick}
          />
        ))}
      </div>
      {/* categories listing */}
      {/* filters */}
      <div className="mt-4 mb-4">
        <FiltersSection />
      </div>
      {/* filters */}
      {/* product listing */}
      <div className="mt-3 mb-4 flex space-x-5 flex-wrap justify-center">
        {products?.map((curItem, index) => (
          <Link href={`products/${curItem?.id}`}>
            <CardComponentOne key={index} data={curItem} />
          </Link>
        ))}
      </div>
      {/* product listing */}
      <div className="flex justify-center">
      {!hideButton && (
        <CommonButton
          className="text-center bg-red-500 text-white px-6 py-2 rounded-full ml-2"
          text="Load More"
          type="button"
          onClick={handleLoadMore}
        />
      )}
      </div>
    </div>
  );
};

export default CategoriesListing;
