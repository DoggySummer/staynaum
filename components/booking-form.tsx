"use client"

import React, { useState } from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export function BookingFormComponent() {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState("2")

  return (
    <div className="bg-white shadow-md p-6 max-w-4xl mx-auto -mt-16 relative z-10">
      <form className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            체크인
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkIn && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkIn ? (
                  format(checkIn, "yyyy년 M월 d일", { locale: ko })
                ) : (
                  <span>날짜 선택</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                initialFocus
                locale={ko}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            체크아웃
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkOut && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOut ? (
                  format(checkOut, "yyyy년 M월 d일", { locale: ko })
                ) : (
                  <span>날짜 선택</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                initialFocus
                locale={ko}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
          <label
            htmlFor="guests"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            인원
          </label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="인원 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1명</SelectItem>
              <SelectItem value="2">2명</SelectItem>
              <SelectItem value="3">3명</SelectItem>
              <SelectItem value="4">4명</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-1/4 px-2 flex items-end">
          <button
            type="submit"
            className="w-full bg-red-800 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition-colors"
          >
            검색
          </button>
        </div>
      </form>
    </div>
  )
}
