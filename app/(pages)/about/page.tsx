import { AmenitiesGridComponent } from "@/components/amenities-grid"
import Image from "next/image"
import React from "react"

const Page = () => {
  return (
    <div>
      <div className="relative w-full h-[400px]">
        <Image
          src="/about.jpg"
          alt="Stay Naum Exterior"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 className="text-3xl font-bold text-center my-8">스테이 나음</h1>
      <div className="max-w-3xl mx-auto px-4 ">
        <p className="mb-8">
          골반과 돌담이 어우러진 제주 화롯마을에 너른 마당을 품은 &apos;스테이
          나음&apos;이 있습니다. 1980년대에 지어진 건물의 가치를 잇자 않고자
          고전적인 외부는 유지하고, 내부는 제주의 풍경과 빛, 소리를 담을 수 있는
          도화지의 역할을 하도록 구성했습 니다. 공간의 창은 제주의 자연을
          비추보며 새로운 마음을 마주하게 합니다. 마루는 돌안 모든 외부의
          자극에서 물러나 마 음을 대면하고 치유에 이르길 바라는 호스트의 바람이
          묻어나 있습니다.
        </p>
        <p className="mb-10">
          스테이 나음은 외부와 내부로 나누어져 있으며 모든 공간에서 자연의
          풍요로움을 느낄 수 있습니다. 외부에는 마당과 자쿠 지가 있어 BBQ를
          즐기거나 자쿠지에서 치유의 시간을 가져보세요. 내부는 주방과 거실, 두
          개의 침실과 사워실로 이루어 져 가족 단위로 머무르기 좋다. 거실은
          반다이 단차를 두어 공간에 다양성을 더했고 마주 보는 개방형 주방은 홈
          카페를 연 상시키며 여행객이 다양한 경험을 할 수 있도록 하였습니다.
        </p>
      </div>
      <AmenitiesGridComponent />
    </div>
  )
}

export default Page
