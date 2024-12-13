"use client";

import { INSTANCE } from "@/_Api Handlers/apiConfig";
import { callApi } from "@/_Api Handlers/apiFunctions";
import { CHECKOUT, GET_ADDRESS, GET_CART } from "@/_Api Handlers/endpoints";
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
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();
  const formConfig = useForm();
  const { handleSubmit } = formConfig;

  const dispatch = useDispatch();


  useEffect(()=>{
    callApi({
      endPoint: GET_ADDRESS,
      method: "GET",
      instanceType:INSTANCE?.authorized
    })
      .then((res) => {
        console.log(res,'RESPONSE OF ADDRESS dsfadfdsfdf');
        setAddresses(res?.data?.results)
      })
      .catch((error) => {
        console.error("Error getting address:", error);
      });
  },[])

  useEffect(()=>{
    callApi({
      endPoint: GET_CART,
      method: "GET",
      instanceType: INSTANCE?.authorized,
    })
      .then((res) => {
        if (res?.data?.items?.length > 0) {
          res.data.items.forEach((item) => {
            dispatch(addItem( item ));
          });
      }})
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

  const handleAddress = (item) =>{
    setSelectedAddress(item)
  }

  const handleCheckout = () => {
    if(!selectedAddress){
      toastMessage("Please select address", "error");
      return
    }
    callApi({
      endPoint: CHECKOUT,
      method: "POST",
      instanceType:INSTANCE?.authorized
    })
      .then((res) => {
        console.log(res);
        toastMessage("Order placed successfully", "success");
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
    
    setSelectedAddress(null);
  }

  const cartItems = useSelector((state) => state.cart.items);

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
          <SavedAddresses handleAddNew={handleAddNew} addresses={addresses} handleAddress={handleAddress}/>
        )}
      </div>
      <SummarySection summaryProducts={cartItems} handleCheckout={handleCheckout}/>
    </div>
    </form>
  );
};

export default BillingDetails;
