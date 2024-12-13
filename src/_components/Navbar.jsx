"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CommonButton from "./_common/CommonButton";
import { logout } from "@/_Api Handlers/apiFunctions";
import { toastMessage } from "@/_utils/toastMessage";
import { DEFAULT_ERROR_MESSAGE } from "@/_constants/constant";
import Cookies from "js-cookie";
import { manageUserAuthorization } from "@/_utils/helpers";
import { useRouter } from "next/navigation";
import Cart from "../../public/icons/cart";
import { useSelector } from "react-redux";

const NAV_LINKS = [
  {
    label: "Home",
    href: "/home",
  },
  {
    label: "About Us",
    href: "/",
  },
  {
    label: "Shop",
    href: "/",
  },
  {
    label: "Blog",
    href: "/",
  },
  {
    label: "Support",
    href: "/support",
  },
];
const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const token = Cookies.get("token");
  const firstName = Cookies.get("firstName");
  const lastName = Cookies.get("lastName");
  const name = `${firstName} ${lastName}`;

  // const handleLogout = () => {
  //   const payload = {};
  //   logout(payload)
  //     .then((res) => {
  //       toastMessage("Logged out successfully");
  //       manageUserAuthorization({ action: "remove" });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
  //     });
  // };

  const cartItemsCount = useSelector((state) => state.cart.items.length);

  console.log(useSelector((state) => state.cart.items),"kjkfdjskldfcart");
  const handleLogout = () => {
    // const values = {
    //   token: token,
    // };
    // logout(values)
    //   .then((res) => {
    //     manageUserAuthorization({ action: "remove" });
    //     router.push("/login");
    //   })
    //   .catch((err) => {
    //     toastMessage(
    //       err?.response?.data?.non_field_errors?.[0] || DEFAULT_ERROR_MESSAGE
    //     );
    //   });

    manageUserAuthorization({ action: "remove" });
    router.push("/login");
    // toastMessage("Logged out successfully");
  };

  return (
    <div
      className="w-full shadow-md"
      style={{
        background: "linear-gradient(95.58deg, #FFFAF4 0%, #FFDC83 99.47%)",
      }}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo Section */}
        <div className="text-xl font-bold">
          <Link href="/home">Logo</Link>
        </div>
        {/* Navigation Links Section */}
        <div className="space-x-6 hidden md:flex">
          {NAV_LINKS?.map(({ label, href }, index) => (
            <Link
              key={index}
              href={href}
              className={`text-gray-700 hover:text-gray-900 ${
                pathname === href ? "active-nav-link" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Login and Signup Section */}
        {token ? (
          <div className="logout flex gap-4 text-black">
            <p>{name}</p>
            <CommonButton type="button" text="logout" onClick={handleLogout} />
            <div className="relative" onClick={() => router.push(`/billing`)}>
              <Cart fill="#000000" />
              <div className="absolute bottom-4 left-5 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                {cartItemsCount}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-x-4">
            <Link className="text-gray-700 hover:text-gray-900" href="/login">
              Login{" "}
            </Link>
            <Link href="/sign-up" className="text-gray-700 hover:text-gray-900">
              Signup{" "}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
