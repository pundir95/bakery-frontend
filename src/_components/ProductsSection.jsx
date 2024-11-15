"use client"
import React,{useState,useEffect} from "react";
import CardComponentOne from "./_common/CardComponentOne";
import Link from "next/link";
import { callApi,METHODS } from "@/_Api Handlers/apiFunctions";
import { PRODUCT_ENDPOINT } from "@/_Api Handlers/endpoints";
const DUMMY_DATA = [
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

const ProductsSection = () => {
const [products, setProducts] = useState([]);

const dataToMap = products.slice(4,(products.length - 1))

  useEffect(() => {
    callApi({
      endPoint:PRODUCT_ENDPOINT,
      method:METHODS.get,
      params:{page:1}
    }).then((response)=>{
      setProducts(response?.data?.results);
    }).catch((err)=>{
      console.error("Error fetching products:", err);
    }).finally(()=>{

    })
  }, []);
  

  return (
    <>
      <h5>Popular Produts</h5>
      <h4 className="uppercase font-bold text-4xl md:text-5xl">
        Delightful <br />
        <span className="uppercase text-red-600">Temptations</span>
      </h4>{" "}
      <div className="flex space-x-5">
        {dataToMap?.map((curItem, index) => (
          <CardComponentOne key={index} data={curItem} />
        ))}
      </div>
      <Link
        href="/products"
        className="bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition duration-300"
      >
        View All Products →
      </Link>
      {/* <button className="bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition duration-300">
        View All Products →
      </button> */}
    </>
  );
};

export default ProductsSection;
