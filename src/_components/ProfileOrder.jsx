import React from "react";
import Eye from "../../public/icons/eye";
import Cart from "../../public/icons/cart";
import QuestionMark from "../../public/icons/questionMark";
import Location from "../../public/icons/location";

const ProfileOrder = () => {
  const orders = [
    {
      id: "1879872132466",
      date: "Sun, Oct 13, 2024",
      time: "11:46 PM",
      status: "In Transit",
      address: "Storgatan 45, 2 tr (2nd floor), 123 45 Göteborg, Sweden",
      items: "Classic Basket, Papaya (1 unit)",
      totalPaid: "$200",
    },
    {
      id: "1879872132467",
      date: "Sat, Oct 12, 2024",
      time: "10:00 PM",
      status: "Delivered",
      address: "Storgatan 45, 2 tr (2nd floor), 123 45 Göteborg, Sweden",
      items: "Tropical Basket, Mango (2 units)",
      totalPaid: "$300",
    },
    {
      id: "1879872132468",
      date: "Fri, Oct 11, 2024",
      time: "09:30 PM",
      status: "Delivered",
      address: "Storgatan 45, 2 tr (2nd floor), 123 45 Göteborg, Sweden",
      items: "Classic Basket, Papaya (1 unit)",
      totalPaid: "$200",
    },
  ];

  const inTransitOrders = orders.filter(
    (order) => order.status === "In Transit"
  );
  const pastOrders = orders.filter((order) => order.status === "Delivered");

  return (
    <div className="w-full">
            {/* Orders Section */}
            <h3 className="text-black font-extrabold mb-2">In Transit Orders</h3>
            {inTransitOrders.length > 0 ? (
              inTransitOrders.map((order) => (
                <div
                  key={order.id}
                  className="border border-[#ddd] rounded-xl p-4 mb-4 flex justify-between"
                >
                  <div>
                    <div className="mb-2 text-[#555] flex items-center gap-2">
                      <Location />
                      Order #{order.id} | {order.date}, {order.time}
                      <div className="bg-[#FFF9CC] text-[#ffc107] font-bold px-2 py-1 rounded-lg ml-4">
                        {order.status}
                      </div>
                    </div>
                    <p className="text-[#555] text-sm mb-1">{order.address}</p>
                    <p className="text-black text-sm font-extrabold mb-1">Items Order</p>
                    <p className="text-[#555] text-sm">{order.items}</p>
                  </div>
                  <div className="flex flex-col justify-between items-end mt-4 py-4">
                    <div className="text-[#333] text-sm">
                      <span className="text-black font-extrabold text-sm">Total Paid:</span> {order.totalPaid}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <div className="rounded-full p-2 bg-[#F2FFEC]">
                        <Eye />
                      </div>
                      <div className="rounded-full p-2 bg-[#F2FFEC]">
                        <Cart />
                      </div>
                      <div className="rounded-full p-2 bg-[#F2FFEC]">
                        <QuestionMark />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No in-transit orders.</p>
            )}

            <h3 className="text-black font-extrabold mb-2">Past Orders</h3>
            {pastOrders.length > 0 ? (
              pastOrders.map((order) => (
                <div
                  key={order.id}
                  className="border border-[#ddd] rounded-xl p-4 mb-4 flex justify-between"
                >
                  <div>
                    <div className="mb-2 text-[#555] flex items-center gap-2">
                      <Location />
                      Order #{order.id} | {order.date}, {order.time}
                      <div className="bg-[#CCFFCF] text-[#08A300] font-bold px-2 py-1 rounded-lg ml-4">
                        {order.status}
                      </div>
                    </div>
                    <p className="text-[#555] text-sm mb-1">{order.address}</p>
                    <p className="text-black text-sm font-extrabold mb-1">Items Order</p>
                    <p className="text-[#555] text-sm">{order.items}</p>
                  </div>
                  <div className="flex flex-col justify-between items-end mt-4 py-4">
                    <div className="text-[#333] text-sm">
                      <span className="text-black font-extrabold text-sm">Total Paid:</span> {order.totalPaid}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <div className="rounded-full p-2 bg-[#F2FFEC]">
                        <Eye />
                      </div>
                      <div className="rounded-full p-2 bg-[#F2FFEC]">
                        <Cart />
                      </div>
                      <div className="rounded-full p-2 bg-[#F2FFEC]">
                        <QuestionMark />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No past orders.</p>
            )}
          </div>
  );
};

export default ProfileOrder;
