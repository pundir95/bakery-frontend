const SavedAddresses = ({ handleAddNew }) => {
  const addresses = [
    {
      address: "Storgatan 45, 2 tr (2nd floor), 123 45 Göteborg, Sweden",
      time: "39 Mins",
    },
    {
      address: "Storgatan 45, 2 tr (2nd floor), 123 45 Göteborg, Sweden",
      time: "45 Mins",
    },
    {
      address: "Storgatan 45, 2 tr (2nd floor), 123 45 Göteborg, Sweden",
      time: "19 Mins",
    },
    {
      address: "Storgatan 45, 2 tr (2nd floor), 123 45 Göteborg, Sweden",
      time: "22 Mins",
    },
  ];

  return (
    <div className="p-4">
      <div className="">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Saved Addresses</h2>
          <button
            className="bg-pink-500 text-white px-4 py-2 rounded"
            onClick={handleAddNew}
            type="button"
          >
            Add New
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {addresses.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 justify-between items-center shadow-sm"
            >
              <div>
                <p className="text-sm font-medium">{item.address}</p>
              </div>
              <div className="text-right flex justify-between items-center mt-2">
                <button className="bg-red-500 text-white px-2 py-2 rounded-md" type="button">
                  Deliver Here
                </button>
                <div className="text-xs text-gray-500 mb-2">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-lg font-semibold mt-4">Apply Coupon</h2>
      <div className="p-4 border mt-4 rounded-lg">
        <div className="flex justify-between mb-2">
          <div className="text-lg font-semibold">Available Coupon</div>
          <div className="text-[#FF6363] cursor-pointer">See all offers</div>
        </div>
        <div className="border rounded-lg p-2 mb-4 flex justify-between items-center shadow-sm bg-[#FFFAF4] border-[#FF6363]">
          <div>
            <p className="text-sm font-medium">
              Flat 10% on your First Purchase. FLAT10
            </p>
          </div>
          <button className="text-white px-6 py-1 rounded-lg border bg-[#FF6363]" type="button">
            Apply
          </button>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Enter Coupon"
            className="border rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button className="bg-[#FF6363] text-white px-6 py-2 rounded-lg" type="button">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedAddresses;
