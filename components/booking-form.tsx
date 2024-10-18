"use client"

import React, { useState } from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Calendar as CalendarIcon, Info } from "lucide-react"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useReservationStore } from "@/lib/store"

export function BookingFormComponent() {
  const {
    checkInDate,
    checkOutDate,
    adultCount,
    childCount,
    infantCount,
    hotTubCount,
    setCheckInDate,
    setCheckOutDate,
    setAdultCount,
    setChildCount,
    setInfantCount,
    setHotTubCount,
  } = useReservationStore()

  const guestOptions = ["0", "1", "2", "3", "4", "5"]

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
                  !checkInDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkInDate ? (
                  format(checkInDate, "yyyy년 M월 d일", { locale: ko })
                ) : (
                  <span>날짜 선택</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkInDate ?? new Date()}
                onSelect={(date: Date | undefined) =>
                  date && setCheckInDate(date)
                }
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
                  !checkOutDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOutDate ? (
                  format(checkOutDate, "yyyy년 M월 d일", { locale: ko })
                ) : (
                  <span>날짜 선택</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkOutDate ?? new Date()}
                onSelect={(date: Date | undefined) =>
                  date && setCheckOutDate(date)
                }
                initialFocus
                locale={ko}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="w-full md:w-2/4 px-2 mb-4 md:mb-0">
          {/* <label className="block text-sm font-medium text-gray-700 mb-1">
            인원
          </label> */}
          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/3 px-2 mb-2 sm:mb-0">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                성인
              </label>
              <Select
                value={adultCount.toString()}
                onValueChange={(value) => setAdultCount(parseInt(value, 10))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="성인" />
                </SelectTrigger>
                <SelectContent>
                  {guestOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}명
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-1/3 px-2 mb-2 sm:mb-0">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                어린이
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="inline-block h-4 w-4 ml-1 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>어린이 : 24개월 ~ 12세</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </label>
              <Select
                value={childCount.toString()}
                onValueChange={(value) => setChildCount(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="어린이" />
                </SelectTrigger>
                <SelectContent>
                  {guestOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}명
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-1/3 px-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                유아
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="inline-block h-4 w-4 ml-1 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>유아 : 24개월 미만</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </label>
              <Select
                value={infantCount.toString()}
                onValueChange={(value) => setInfantCount(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="유아" />
                </SelectTrigger>
                <SelectContent>
                  {guestOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}명
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="w-full px-2 mt-4">
          <Link href="reserve">
            <button
              type="submit"
              className="w-full bg-red-800 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition-colors"
            >
              검색
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}
