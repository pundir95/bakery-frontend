import BillingDetailsSection from "@/_components/BillingDetailsSection";
import DeliveryDetailsSection from "@/_components/DeliveryDetailsSection";
import SummarySection from "@/_components/SummarySection";
import React from "react";

const BillingDetails = () => {
  return (
    <div className="flex gap-6 p-6">
      <div className="flex flex-col gap-6 pl-10 flex-1">
      <BillingDetailsSection />
      <DeliveryDetailsSection />
      {/* <SavedAddresses />
      <ApplyCoupon /> */}
      
      </div>
      <SummarySection/>
    </div>
  );
};

export default BillingDetails;



// const SavedAddresses = () => {
//   const addresses = [
//     { address: 'Storgatan 45, 2 tr (2nd floor), 123 45 Göteborg, Sweden', time: '39 Mins' },
//     { address: 'Storgatan 45, 2 tr (2nd floor), 123 45 Göteborg, Sweden', time: '45 Mins' },
//     { address: 'Storgatan 45, 2 tr (2nd floor), 123 45 Göteborg, Sweden', time: '19 Mins' },
//     { address: 'Storgatan 45, 2 tr (2nd floor), 123 45 Göteborg, Sweden', time: '22 Mins' },
//   ];

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Saved Addresses</h2>
//         <button className="bg-pink-500 text-white px-4 py-2 rounded">Add New</button>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
//         {addresses.map((item, index) => (
//           <div
//             key={index}
//             className="border rounded-lg p-4 flex justify-between items-center shadow-sm"
//           >
//             <div>
//               <p className="text-sm font-medium">{item.address}</p>
//             </div>
//             <div className="text-right">
//               <p className="text-xs text-gray-500 mb-2">{item.time}</p>
//               <button className="bg-red-500 text-white px-4 py-2 rounded">Deliver Here</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const ApplyCoupon = () => {
//   return (
//     <div className="p-4 mt-6">
//       <h2 className="text-lg font-semibold mb-4">Apply Coupon</h2>
//       <div className="border rounded-lg p-4 mb-4 flex justify-between items-center shadow-sm">
//         <div>
//           <p className="text-sm font-medium">Flat 10% on your First Purchase. FLAT10</p>
//         </div>
//         <button className="bg-pink-500 text-white px-4 py-2 rounded">Apply</button>
//       </div>
//       <div className="flex items-center gap-4">
//         <input
//           type="text"
//           placeholder="Enter Coupon"
//           className="border rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
//         />
//         <button className="bg-pink-500 text-white px-4 py-2 rounded">Apply</button>
//       </div>
//     </div>
//   );
// };

