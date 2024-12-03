import React from "react";

const LimitedTimeOffers = () => {
  const offers = [
    {
      name: "Classic Danish rye bread",
      oldPrice: 30,
      newPrice: 20,
      minQuantity: 10,
      image: "/images/cardImage.png",
    },
    {
      name: "Croissants",
      oldPrice: 13,
      newPrice: 10,
      minQuantity: 10,
      image: "/images/cardImage.png",
    },
    {
      name: "Donuts",
      oldPrice: 7,
      newPrice: 5,
      minQuantity: 10,
      image: "/images/cardImage.png",
    },
  ];

  return (
    // <div className="text-center py-12 ">
    //   <p className="text-eyebrowColor font-semibold text-[20px] mb-7 text-center">Limited Time Offers</p>
    //   <h4 className="uppercase text-4xl md:text-5xl font-bebas text-center mb-10">
    //     <span className="text-customRed font-bebas">Hot Deals fresh</span> Out {" "}
    //     Of The Oven
    //   </h4>{" "}
    // </div>
    <section className="bg-white text-center py-10 px-10">
      <h2 className="text-sm text-[#813D33] uppercase">Limited Time Offers</h2>
      <h1 className="text-4xl font-bold text-red-500 mt-2">
        HOT DEALS FRESH OUT <span className="text-black">OF THE OVEN!</span>
      </h1>
      <div className="flex items-center justify-between mt-4">
        <div className="text-gray-600 text-wrap w-2/5 text-start">
          Get your hands on our exclusive deals, fresh from the oven! Enjoy
          special discounts on your favorite treats for a limited time only.
        </div>
        {/* Countdown Timer */}
        <div className="flex justify-center items-center space-x-4">
          <div className="bg-[#FF6363] p-3 rounded-xl">
            <div className="text-xl font-bold text-white">02</div>
          </div>
          <div className="bg-[#FF6363] px-2 py-1  rounded-xl">
            <div className="text-xl font-bold text-white">20</div>
            <div className="text-xs text-white">Hours</div>
          </div>
          <div className="bg-[#FF6363] p-3 rounded-xl">
            <div className="text-xl font-bold text-white">50</div>
          </div>
          <div className="bg-[#FF6363] p-3 rounded-xl">
            <div className="text-xl font-bold text-white">21</div>
          </div>
        </div>
      </div>
      {/* Offers Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-10">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 text-left relative"
          >
            <img
              src={offer.image}
              alt={offer.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <div>
              <div className="text-lg font-bold mt-4 text-black flex justify-center">
                {offer.name}
              </div>
            </div>
            {/* <div className="text-gray-500 mt-2 border">
              Starts from{" "}
              <span className="text-red-500 font-bold">${offer.newPrice}</span>{" "}
              <span className="line-through">${offer.oldPrice}</span>
            </div>
            <p className="text-gray-600">Min Quantity: {offer.minQuantity}</p> */}
            <div className="flex justify-between">
              <div>
                <div className="text-black">Starts from</div>
                <div>
                  <span className="line-through font-bold text-lg text-[#C2C2C2]">${offer.oldPrice}</span>
                  <span className="text-[#FF2F2F] font-bold text-lg">
                    ${offer.newPrice}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-black">Min Quantity</div>
                <div className="text-[#FF2F2F] text-lg font-bold">{offer.minQuantity}</div>
              </div>
            </div>
            {/* <div className="flex justify-center mt-4"> */}
              <button className="text-black absolute rounded-full py-1 px-2 bg-[#FFE794] bottom-[-6] right-40">
                &rarr;
              </button>
            {/* </div> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default LimitedTimeOffers;
