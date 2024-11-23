"use client"

import React, { useState } from "react"
import Slider from "react-slick"
import Image from "next/image"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const images = ["/main.webp", "/main2.webp"]

export function HotelMainCarouselComponent() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const settings = {
    dots: false,
    infinite: true,
    useTransform: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (oldIndex: number, newIndex: number) =>
      setCurrentSlide(newIndex),
  }

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <Slider {...settings} className="h-full">
        {images.map((src, index) => (
          <div key={index} className="relative w-full h-[600px]">
            <Image
              src={src}
              alt={`Hotel image ${index + 1}`}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </Slider>
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded text-white text-sm">
        {currentSlide + 1} / {images.length}
      </div>
    </div>
  )
}
