import React from "react";

const SummarySection = () => {
  return (
    <div>
      {/* <h2 className="text-xl font-bold mb-4">Summary</h2> */}
      <div className="flex flex-col p-5 bg-[#FFFAF4] shadow-lg rounded-lg w-96 flex-1 h-full justify-between border">

        <div className="">
          <ul className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <li key={index} className="flex items-center">
                <img
                  src="/images/bread.png"
                  alt="Premium Croissant"
                  className="w-12 h-12 rounded mr-4"
                />
                <div className="flex-grow">
                  <p className="font-medium text-black">Premium Croissant</p>
                  <p className="text-sm text-[#FF6363]">$20.00</p>
                </div>
                {/* <p className="font-medium text-black">$120.00</p> */}
                <div className="flex bg-white border flex-col items-center px-1 rounded-md border-black">
                  <button className=" text-black ">
                    -
                  </button>
                  <div className="">20</div>
                  <button className="text-red-500">
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
        <div className="flex justify-between mt-4 border-t">
          <span className="font-semibold">Subtotal</span>
          <span className="font-semibold">$1600.00</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-semibold">VAT</span>
          <span className="font-semibold">$84.00</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-semibold">Shipping charges</span>
          <span className="font-semibold">$50.00</span>
        </div>
        <div className="flex justify-between mt-2 border-t pt-2">
          <span className="font-bold">Total</span>
          <span className="font-bold text-lg text-[#FF6363]">$1650.00</span>
        </div>

        <button className="mt-5 bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-600 transition duration-200 w-full">
          Confirm Order
        </button>
      </div>
      </div>
    </div>
  );
};

export default SummarySection;
