import { DateRange } from "react-day-picker"
import { create } from "zustand"

interface ReservationState {
  checkInDate: Date
  checkOutDate: Date
  stayDate: DateRange | undefined
  adultCount: number
  childCount: number
  infantCount: number
  bbqDate: number
  hotTubCount: number
  setCheckInDate: (date: Date) => void
  setCheckOutDate: (date: Date) => void
  setStayDate: (dateRange: DateRange | undefined) => void
  setAdultCount: (count: number) => void
  setChildCount: (count: number) => void
  setInfantCount: (count: number) => void
  setBBQDate: (count: number) => void
  setHotTubCount: (count: number) => void
}

export const useReservationStore = create<ReservationState>((set) => ({
  checkInDate: new Date(),
  checkOutDate: new Date(),
  stayDate: undefined,
  adultCount: 0,
  childCount: 0,
  infantCount: 0,
  bbqDate: 0,
  hotTubCount: 0,
  setCheckInDate: (date) =>
    set((state) => ({
      checkInDate: date,
      stayDate: { from: date, to: state.checkOutDate },
    })),
  setCheckOutDate: (date) =>
    set((state) => ({
      checkOutDate: date,
      stayDate: { from: state.checkInDate, to: date },
    })),
  setStayDate: (dateRange: DateRange | undefined) =>
    set((state) => ({
      stayDate: dateRange,
      checkInDate: dateRange?.from || state.checkInDate,
      checkOutDate: dateRange?.to || state.checkOutDate,
    })),
  setAdultCount: (count) => set({ adultCount: count }),
  setChildCount: (count) => set({ childCount: count }),
  setInfantCount: (count) => set({ infantCount: count }),
  setBBQDate: (count) => set({ bbqDate: count }),
  setHotTubCount: (count) => set({ hotTubCount: count }),
}))
