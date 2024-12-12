"use client";
import { createPreview } from "@/_utils/helpers";
import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-10 flex-1">
      {/* Thumbnails */}
      <div className="flex flex-col gap-4">
        {images?.length && images?.map((image, index) => (
          <img
            key={index}
            src={createPreview(image?.image)}
            alt={`Thumbnail ${index}`}
            onClick={() => setActiveIndex(index)}
            className={`w-20 h-20 object-cover rounded-md border-2 cursor-pointer ${
              index === activeIndex ? "border-gray-800" : "border-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Main image with navigation */}
      <div className="relative">
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-[-40px] transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-200"
        >
          &#8249;
        </button>
        <img
          src={createPreview(images?.[activeIndex].image)}
          alt={`Slide ${activeIndex}`}
          className="w-72 h-72 object-cover rounded-lg shadow-md"
        />
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-[-40px] transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-200"
        >
          &#8250;
        </button>
      </div>
    </div>
  )
};

export default ProductCarousel;
