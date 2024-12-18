'use client'
import React,{useEffect, useState} from "react";
import Location from "../../../../public/icons/location";
import OrderCart from "../../../../public/icons/orderCart";
import Heart from "../../../../public/icons/heart";
import CreditCard from "../../../../public/icons/card";
import Setting from "../../../../public/icons/setting";
import ProfileOrder from "@/_components/ProfileOrder";
import ProfileFavourite from "@/_components/ProfileFavourite";
import ProfilePayment from "@/_components/ProfilePayment";
import ProfileAddress from "@/_components/ProfileAddress";
import ProfileSetting from "@/_components/ProfileSetting";
import Sidebar from "@/_components/Sidebar";
import { ADDRESS, FAVOURITE_ENDPOINT, PROFILE_UPDATE, UPDATE_PASSWORD } from "@/_Api Handlers/endpoints";
import { callApi, METHODS } from "@/_Api Handlers/apiFunctions";
import { INSTANCE } from "@/_Api Handlers/apiConfig";

const Profile = () => {
  const [currentCategory, setCurrentCategory] = useState('orders');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [favouriteItems, setFavouriteItems] = useState([])
  const [addresses, setAddresses] = useState([]);
  const [sideBarItems, setSideBarItems] = useState("orders");
  const [profileData, setProfileData] = useState();

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSideBarItem = (item) => {
    setSideBarItems(item);
  };

  const handleEditProfile = () => {
    handleSideBarItem("editProfile");
    toggleSidebar();
  }

  const handleChangePassword = () => {
    handleSideBarItem("changePassword");
    // toggleSidebar();
  }

  useEffect(()=>{
    callApi({
      endPoint: FAVOURITE_ENDPOINT,
      method: METHODS.get,
      instanceType: INSTANCE?.authorized,
    })
      .then((response) => {
        console.log(response,"response");
        setFavouriteItems(response?.data?.results);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      })

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
          endPoint: PROFILE_UPDATE,
          method: "GET",
          instanceType: INSTANCE?.authorized,
        })
          .then((res) => {
            console.log(res, "RESPONSE OF ADDRESS NNNNNNNNNNN");
            setProfileData(res?.data);
          })
          .catch((error) => {
            console.error("Error getting address:", error);
          });
  },[])

  const renderContent = () => {
    switch (currentCategory) {
      case 'orders':
        return <ProfileOrder toggleSidebar={toggleSidebar} handleSideBarItem={handleSideBarItem}/>;
      case 'favorites':
        return <ProfileFavourite favorites={favouriteItems}/>;
      case 'payments':
        return <ProfilePayment />;
      case 'addresses':
        return <ProfileAddress addresses={addresses}/>;
      case 'settings':
        return <ProfileSetting />;
      default:
        return <ProfileOrder />;
    }
  };


  return (
    <>
      <div className="bg-white px-12 py-20">
        {/* navbar */}
        <div className="flex justify-between">
          <div>
            <h2 className="text-black text-xl font-semibold mb-2">David Williams</h2>
            <div className="flex gap-4">
              <p className="text-black"> +46 123 456 7890 </p>
              <p className="text-black">davidwilliams@gmail.com</p>
            </div>
          </div>
          <div>
            <button className="bg-[#FF6D2F] text-white py-2 px-4 rounded-md" onClick={handleEditProfile}>
              Edit Profile
            </button>
          </div>
        </div>
        {/* main section */}
        <div className="flex p-6 gap-6">
          <div className="w-[250px] bg-[#f8f9fa] p-5 border border-[#ddd] rounded-lg">
            <ul className="space-y-6">
              <li className="flex gap-2 items-center cursor-pointer" onClick={() => handleCategoryChange('orders')}>
                <div className="p-2 rounded-full bg-[#D9D9D9]">
                  <OrderCart />
                </div>
                <div  className="text-[#808080] no-underline">
                  Orders
                </div>
              </li>
              <li className="flex gap-2 items-center cursor-pointer" onClick={() => handleCategoryChange('favorites')}>
                <div className="p-2 rounded-full bg-[#D9D9D9]">
                  <Heart />
                </div>
                <div className="text-[#808080] no-underline">
                  Favorites
                </div>
              </li>
              <li className="flex gap-2 items-center cursor-pointer" onClick={() => handleCategoryChange('payments')}>
                <div className="p-2 rounded-full bg-[#D9D9D9]">
                  <CreditCard />
                </div>
                <div className="text-[#808080] no-underline">
                  Payments
                </div>
              </li>
              <li className="flex gap-2 items-center cursor-pointer" onClick={() => handleCategoryChange('addresses')}>
                <div className="p-2 rounded-full bg-[#D9D9D9]">
                  <Location />
                </div>
                <div className="text-[#808080] no-underline">
                  Addresses
                </div>
              </li>
              <li className="flex gap-2 items-center cursor-pointer" onClick={() => handleCategoryChange('settings')}>
                <div className="p-2 rounded-full bg-[#D9D9D9]">
                  <Setting />
                </div>
                <div href="#" className="text-[#808080] no-underline">
                  Settings
                </div>
              </li>
            </ul>
          </div>
          {/* right side section */}
          {renderContent()}
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} sideBarItems={sideBarItems} handleChangePassword={handleChangePassword} profileData={profileData}/>
    </>
  );
};

export default Profile;
