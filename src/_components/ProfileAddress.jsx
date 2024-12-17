import React from "react";
import Location from "../../public/icons/location";

const ProfileAddress = ({addresses}) => {
  // const addresses = [
  //   {
  //     address: "Storgatan 45, 2 tr (2nd floor), 123 45 Göteborg, Sweden"
  //   },
  //   {
  //     address: "Storgatan 45, 2 tr (2nd floor), 123 45 Göteborg, Sweden"
  //   },
  //   {
  //     address: "Storgatan 45, 2 tr (2nd floor), 123 45 Göteborg, Sweden"
  //   },
  //   {
  //     address: "Storgatan 45, 2 tr (2nd floor), 123 45 Göteborg, Sweden"
  //   },
  //   {
  //     address: "Storgatan 45, 2 tr (2nd floor), 123 45 Göteborg, Sweden"
  //   },
  //   {
  //     address: "Storgatan 45, 2 tr (2nd floor), 123 45 Göteborg, Sweden"
  //   },
  // ];

  const handleDelete = (id) => {
    console.log(`Delete card with id: ${id}`);
  };

  const handleMakeDefault = (id) => {
    console.log(`Make card with id: ${id} default`);
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-6">
        {addresses.map((card, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 shadow-md flex gap-4 w-2/5 bg-white"
          >
            <div className="bg-gray-300 p-2 w-min h-min">
              <Location />
            </div>
            <div className="flex flex-col justify-between w-4/5 gap-4">
              <div className="text-black text-sm">{`${card.address}, ${card.city}, ${card.state}`}</div>
              <div className="flex gap-4">
                <div className="text-green-600 text-sm cursor-pointer">EDIT</div>
                <div className="text-gray-400 text-sm cursor-pointer">DELETE</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-6 px-6 py-2 text-sm text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none">
        Add Address
      </button>
    </div>
  );
};

export default ProfileAddress;