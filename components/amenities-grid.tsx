"use client"
import { Car, Utensils, Tv, Wifi } from "lucide-react"
import { ReactElement } from "react"

const AmenityItem = ({ icon, text }: { icon: ReactElement; text: string }) => (
  <div className="flex items-center p-4 bg-gray-50 rounded-lg justify-center">
    {icon}
    <span className="text-sm font-medium text-gray-700 ml-5">{text}</span>
  </div>
)

const amenities = [
  { icon: <Wifi />, text: "무선 인터넷" },
  { icon: <Car />, text: "주차장" },
  { icon: <Utensils />, text: "개별 BBQ 데크" },
  { icon: <Tv />, text: "스마트 TV" },
  { icon: <Wifi />, text: "무선 인터넷" },
  { icon: <Car />, text: "주차장" },
  { icon: <Utensils />, text: "개별 BBQ 데크" },
  { icon: <Tv />, text: "스마트 TV" },
  // { icon: Coffee, text: "커피 메이커" },
  // { icon: Wind, text: "선풍기" },
  // { icon: AirVent, text: "공기청정기" },
  // { icon: Droplets, text: "가습기" },
  // { icon: Snowflake, text: "에어컨" },
  // { icon: Waves, text: "비데" },
  // { icon: Sun, text: "욕실 난방" },
  // { icon: Shirt, text: "옷장" },
]

export function AmenitiesGridComponent() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          편의 시설
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {amenities.map((amenity, index) => (
            <AmenityItem key={index} icon={amenity.icon} text={amenity.text} />
          ))}
        </div>
      </div>
    </section>
  )
}
