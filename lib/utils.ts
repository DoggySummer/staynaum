import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, eachDayOfInterval } from "date-fns"

// Tailwind 클래스
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date 객체를 "YYYY.MM.DD" 형식의 문자열로 변환하는 함수
export function formatDateToString(date: Date): string {
  return format(date, "yyyy.MM.dd")
}

// Date 객체에서 일(day)만 숫자로 추출하는 함수
export function getDayFromDate(date: Date): number {
  return date.getDate()
}

// 날짜 범위에서 일(day)들의 배열을 생성하는 함수
export function getDaysArrayFromDateRange(
  startDate: Date,
  endDate: Date
): number[] {
  const dates = eachDayOfInterval({ start: startDate, end: endDate })
  return dates.map((date) => getDayFromDate(date))
}
