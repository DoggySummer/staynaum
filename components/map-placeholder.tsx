"use client"

import React, { useEffect } from "react"

export function MapPlaceholderComponent() {
  useEffect(() => {
    const mapOptions = {
      center: new naver.maps.LatLng(33.50564, 126.635154),
      zoom: 18,
    }

    new naver.maps.Map("map", mapOptions)
  }, [])
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold mb-6">네이버 지도</h2>
      <div id="map" className="w-full h-[400px]" />
    </div>
  )
}
