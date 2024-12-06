import React,{useState} from "react";

const SummarySection = ({summaryProducts}) => {
  const [quantities, setQuantities] = useState(
    summaryProducts?.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {})
  );

  const handleQuantityChange = (id, type) => {
    setQuantities((prevQuantities) => {
      const newQuantity = type === "increment" ? prevQuantities[id] + 1 : prevQuantities[id] - 1;
      return {
        ...prevQuantities,
        [id]: Math.max(newQuantity, 1),
      };
    });
  };

  const calculateSubtotal = () => {
    return summaryProducts.reduce(
      (total, item) => total + item.price * quantities[item.id],
      0
    );
  };

  const calculateVAT = (subtotal) => {
    const VATPercentage = 0.05;
    return subtotal * VATPercentage;
  };

  const shippingCharges = 50;

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const vat = calculateVAT(subtotal);
    return subtotal + vat + shippingCharges;
  };

  const subtotal = calculateSubtotal();
  const vat = calculateVAT(subtotal);
  const total = calculateTotal();

  return (
    <div>
      <div className="flex flex-col p-5 bg-[#FFFAF4] shadow-lg rounded-lg w-96 flex-1 h-full justify-between border">

        <div className="">
          <ul className="space-y-4">
            {summaryProducts?.map((item) => (
              <li key={item.id} className="flex items-center">
                <img
                  src={item.img}
                  alt="Premium Croissant"
                  className="w-12 h-12 rounded mr-4"
                />
                <div className="flex-grow">
                  <p className="font-medium text-black">{item.name}</p>
                  <p className="text-sm text-[#FF6363]">${item.price}.00</p>
                </div>
                {/* <p className="font-medium text-black">$120.00</p> */}
                <div className="flex bg-white border flex-col items-center px-1 rounded-md border-black">
                  <button className=" text-black cursor-pointer" onClick={() => handleQuantityChange(item.id, "decrement")} type="button">
                    -
                  </button>
                  <div className="">{quantities[item.id]}</div>
                  <button className="text-red-500 cursor-pointer" onClick={() => handleQuantityChange(item.id, "increment")} type="button">
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
          <span className="font-semibold">${subtotal}.00</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-semibold">VAT</span>
          <span className="font-semibold">${vat.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-semibold">Shipping charges</span>
          <span className="font-semibold">${shippingCharges}.00</span>
        </div>
        <div className="flex justify-between mt-2 border-t pt-2">
          <span className="font-bold">Total</span>
          <span className="font-bold text-lg text-[#FF6363]">${total.toFixed(2)}</span>
        </div>

        <button className="mt-5 bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-600 transition duration-200 w-full" type="submit">
          Confirm Order
        </button>
      </div>
      </div>
    </div>
  );
};

export default SummarySection;
