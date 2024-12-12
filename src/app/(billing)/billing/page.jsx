"use client";

import { callApi } from "@/_Api Handlers/apiFunctions";
import { GET_CART } from "@/_Api Handlers/endpoints";
import BillingDetailsSection from "@/_components/BillingDetailsSection";
import DeliveryDetailsSection from "@/_components/DeliveryDetailsSection";
import SavedAddresses from "@/_components/SavedAddress";
import SummarySection from "@/_components/SummarySection";
import { toastMessage } from "@/_utils/toastMessage";
import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

const BillingDetails = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const formConfig = useForm();
  const { handleSubmit } = formConfig;

  const cartItems = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  useEffect(()=>{
    callApi({
      endPoint: GET_CART,
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        // toastMessage("Product added successfully");
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  },[]);

  const onSubmit = (values) => {
    console.log(values, "billing details=====================>>>>>>>>>>>>>>>");
  };

  const summaryProducts =    [
    {
      id: 1,
      name: "Premium Croissant",
      price: 20,
      quantity: 10,
      img: "/images/bread.png"
    },
    {
      id: 2,
      name: "Premium Bread",
      price: 30,
      quantity: 20,
      img: "/images/bread.png"
    },
    {
      id: 3,
      name: "Premium Biscuit",
      price: 40,
      quantity: 30,
      img: "/images/bread.png"
    }
  ]

  const handleAddNew = () => {
    setShowAddressForm(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="flex gap-6 p-6">
      <div className="flex flex-col gap-6 pl-10 flex-1">
        {showAddressForm ? (
          <>
            <BillingDetailsSection formConfig={formConfig}/>
            <DeliveryDetailsSection formConfig={formConfig}/>
          </>
        ) : (
          <SavedAddresses handleAddNew={handleAddNew} />
        )}
      </div>
      <SummarySection summaryProducts={cartItems}/>
    </div>
    </form>
  );
};

export default BillingDetails;
