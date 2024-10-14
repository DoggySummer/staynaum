import { BookingFormComponent } from "@/components/booking-form"
import { HotelMainCarouselComponent } from "@/components/hotel-carousel"
import { MapPlaceholderComponent } from "@/components/map-placeholder"
import { RoomInfoComponent } from "@/components/room-info"

export default function Home() {
  return (
    <main>
      <HotelMainCarouselComponent />
      <BookingFormComponent />
      <RoomInfoComponent />
      <MapPlaceholderComponent />
    </main>
  )
}
