"use client";

import React, { useState } from "react";
import Image from "next/image";

const roomImages = ["/option.jpg", "/option.jpg"];

export function RoomInfoComponent() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % roomImages.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + roomImages.length) % roomImages.length
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-wrap -mx-4 justify-center">
        <div className="w-full md:w-1/4 px-4">
          <h2 className="text-2xl font-bold mb-6">객실 정보</h2>
          <h3 className="text-xl font-bold mb-4">₩270,000 / 1박</h3>
          <p className="mb-2">체크인 16:00 / 체크아웃 11:00</p>
          <p className="mb-2">기준인원 4명(최대 인원 5명)</p>
          <p className="mb-4">객실면적 66.22㎡</p>
          <p className="mb-4">퀸 침대 2</p>
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded">
            편의시설 모두 보기
          </button>
        </div>
        <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
          <div className="relative h-96">
            {roomImages.map((src, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                  index === currentImage ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={src}
                  alt={`Room image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                onClick={prevImage}
                className="bg-black bg-opacity-50 text-white p-2 rounded-r"
              >
                &lt;
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                onClick={nextImage}
                className="bg-black bg-opacity-50 text-white p-2 rounded-l"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
