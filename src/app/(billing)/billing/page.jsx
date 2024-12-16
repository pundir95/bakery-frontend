"use client";

import { INSTANCE } from "@/_Api Handlers/apiConfig";
import { callApi } from "@/_Api Handlers/apiFunctions";
import {
  ADDRESS,
  APPLY_COUPON,
  CHECKOUT,
  GET_CART,
  USER_COUPON,
} from "@/_Api Handlers/endpoints";
import BillingDetailsSection from "@/_components/BillingDetailsSection";
import DeliveryDetailsSection from "@/_components/DeliveryDetailsSection";
import SavedAddresses from "@/_components/SavedAddress";
import SummarySection from "@/_components/SummarySection";
import { toastMessage } from "@/_utils/toastMessage";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { addItem, clearCart } from "../../../../redux/cartSlice";

const BillingDetails = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();
  const [coupon, setCoupon] = useState([]);
  const [cartID, setCartID] = useState();
  const formConfig = useForm();
  const { handleSubmit } = formConfig;

  const dispatch = useDispatch();

  console.log(coupon, "skdfjkdjfkdjfkdjfdkfjdfcoupon");
  console.log(selectedAddress, "selected address");

  useEffect(() => {
    callApi({
      endPoint: ADDRESS,
      method: "GET",
      instanceType: INSTANCE?.authorized,
    })
      .then((res) => {
        console.log(res, "RESPONSE OF ADDRESS dsfadfdsfdf");
        setAddresses(res?.data?.results);
      })
      .catch((error) => {
        console.error("Error getting address:", error);
      });

    callApi({
      endPoint: USER_COUPON,
      method: "GET",
      instanceType: INSTANCE?.authorized,
    })
      .then((res) => {
        console.log(res, "RESPONSE OF Coupon dsfadfdsfdf");
        setCoupon(res?.data?.results);
      })
      .catch((error) => {
        console.error("Error getting address:", error);
      });
  }, []);

  useEffect(() => {
    dispatch(clearCart());
    callApi({
      endPoint: GET_CART,
      method: "GET",
      instanceType: INSTANCE?.authorized,
    })
      .then((res) => {
        if (res?.data?.items?.length > 0) {
          res?.data?.items?.forEach((item) => {
            setCartID(res?.data?.id);
            dispatch(addItem( item ));
          });
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  }, []);

  const onSubmit = (values) => {
    console.log(values, "billing details=====================>>>>>>>>>>>>>>>");

    const payload = {
      name: values?.name,
      email: values?.email,
      contact_no: values?.phone_number,
      address: values?.address?.formatted_address,
      city: values?.city?.formatted_address,
      state: values?.state?.value,
      zipcode: values?.zip_code,
      // "country": "SE",
      primary: true,
    };
    if (showAddressForm) {
      callApi({
        endPoint: ADDRESS,
        method: "POST",
        instanceType: INSTANCE?.authorized,
        payload: payload,
      })
        .then((res) => {
          console.log(res);
          setSelectedAddress(res.data);
          handleCheckout(res.data);
          toastMessage("Order placed successfully", "success");
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
        });
    } else {
      handleCheckout();
    }
  };

  const summaryProducts = [
    {
      id: 1,
      name: "Premium Croissant",
      price: 20,
      quantity: 10,
      img: "/images/bread.png",
    },
    {
      id: 2,
      name: "Premium Bread",
      price: 30,
      quantity: 20,
      img: "/images/bread.png",
    },
    {
      id: 3,
      name: "Premium Biscuit",
      price: 40,
      quantity: 30,
      img: "/images/bread.png",
    },
  ];

  const handleAddNew = () => {
    setShowAddressForm(true);
  };

  const handleAddress = (item) => {
    setSelectedAddress(item);
  };

  const handleCheckout = (data) => {
    if (!selectedAddress && !data) {
      toastMessage("Please select address", "error");
      return;
    }
    const payload = {
      "shipping_address_id":selectedAddress?.id || data?.id
    };
    callApi({
      endPoint: CHECKOUT,
      method: "POST",
      instanceType: INSTANCE?.authorized,
      payload: payload,
    })
      .then((res) => {
        console.log(res);
        toastMessage("Order placed successfully", "success");
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });

    setSelectedAddress(null);
  };

  const handleApplyCoupon = (couponCode) => {
    const payload = {
      coupon_code: couponCode,
      cart_id: cartID,
    };

    callApi({
      endPoint: APPLY_COUPON,
      method: "POST",
      instanceType: INSTANCE?.authorized,
      payload: payload,
    })
      .then((res) => {
        console.log(res);
        toastMessage("Coupon Applied", "success");
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        toastMessage(`${error?.response?.data?.detail}`, "error");
      });
  };

  const cartItems = useSelector((state) => state.cart.items);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-6 p-6">
        <div className="flex flex-col gap-6 pl-10 flex-1">
          {showAddressForm ? (
            <>
              <BillingDetailsSection formConfig={formConfig} />
              <DeliveryDetailsSection formConfig={formConfig} />
            </>
          ) : (
            <SavedAddresses
              handleAddNew={handleAddNew}
              addresses={addresses}
              handleAddress={handleAddress}
              coupon={coupon}
              handleApplyCoupon={handleApplyCoupon}
            />
          )}
        </div>
        <SummarySection summaryProducts={cartItems} />
      </div>
    </form>
  );
};

export default BillingDetails;
