import React from "react";
import Image from "next/image";
import SearchBar from "./SearchBar";
// import donutImg from '../../public/images/donut-img.png'

const HeaderSection = () => {
  return (
    <div className="hero-section bg-gradient-to-r from-[#FFFDF4] to-[#FFE8CC] pt-[144px] pb-20">
      {/* <Image src={donutImg} /> */}
      <h1 className="font-bebas text-[78px] leading-[78px] text-left text-customRed text-center mb-9">
        Freshly Baked Delights,<br />
        <span className="text-customBlack font-bebas">Crafted with <span className="font-bebas">Love</span> 🥐❤️</span>
      </h1>
      <p className="max-w-[1000px] mx-auto text-center text-[22px]">From warm, buttery croissants to decadent cakes, experience the joy of freshly baked goods made daily in our bakery. Indulge in the finest treats, made with the freshest ingredients just for you.</p>
      {/* add header section data here */}
      <SearchBar />
    </div>
  );
};

export default HeaderSection;
