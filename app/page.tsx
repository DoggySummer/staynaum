import { BookingFormComponent } from "@/components/booking-form";
import { HotelMainCarouselComponent } from "@/components/hotel-carousel";
import { MapPlaceholderComponent } from "@/components/map-placeholder";
import { NavbarComponent } from "@/components/navbar";
import { RoomInfoComponent } from "@/components/room-info";

export default function Home() {
  return (
    <main>
      <NavbarComponent />
      <HotelMainCarouselComponent />
      <BookingFormComponent />
      <RoomInfoComponent />
      <MapPlaceholderComponent />
    </main>
  );
}
