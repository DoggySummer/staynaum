"use client"

import { useState, useEffect } from "react"
import {
  CalendarDays,
  Users,
  Utensils,
  Droplets,
  AlertTriangle,
  Plus,
  Minus,
} from "lucide-react"
import { ko } from "date-fns/locale"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Calendar } from "@/components/ui/calendar"
import { useReservationStore } from "@/lib/store"
import { formatDateToString, getDaysArrayFromDateRange } from "@/lib/utils"

export default function Page() {
  const {
    checkInDate,
    checkOutDate,
    stayDate,
    adultCount,
    childCount,
    infantCount,
    setStayDate,
    setAdultCount,
    setChildCount,
    setInfantCount,
    setBBQDate,
  } = useReservationStore()

  const [bbqOption, setBbqOption] = useState(false)
  const [spaCount, setSpaCount] = useState(0)
  const [appliedCoupon, setAppliedCoupon] = useState("")
  const [couponInput, setCouponInput] = useState("")
  const [couponError, setCouponError] = useState("")
  const [agreements, setAgreements] = useState({
    privacy: false,
    minor: false,
    refund: false,
  })
  const basePrice = 400000
  const bbqPrice = 30000
  const spaPrice = 50000
  const coupons = {
    출석: 10000,
    신규가입: 20000,
  }

  const stayDateArray = getDaysArrayFromDateRange(checkInDate, checkOutDate)
  const guestTypes = [
    { key: "adult", label: "성인", value: adultCount, setValue: setAdultCount },
    {
      key: "child",
      label: "어린이",
      value: childCount,
      setValue: setChildCount,
    },
    {
      key: "infant",
      label: "영아",
      value: infantCount,
      setValue: setInfantCount,
    },
  ]
  //총 금액
  const [totalPrice, setTotalPrice] = useState(basePrice * calculateNights())
  function calculateNights() {
    return stayDateArray.length - 1
  }

  //우측 계산 영역
  useEffect(() => {
    let price = basePrice * calculateNights()
    if (bbqOption) price += bbqPrice
    price += spaCount * spaPrice
    if (appliedCoupon) price -= coupons[appliedCoupon as keyof typeof coupons]
    setTotalPrice(price)
  }, [bbqOption, spaCount, appliedCoupon, coupons, calculateNights])

  const handleAgreementChange = (key: "privacy" | "minor" | "refund") => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleAllAgreements = (checked: boolean) => {
    setAgreements({
      privacy: checked,
      minor: checked,
      refund: checked,
    })
  }

  const allAgreed = Object.values(agreements).every(Boolean)
  const handleAccordionItemClick = (e: React.MouseEvent) => {
    // 체크박스 클릭 시 아코디언 토글 방지
    if ((e.target as HTMLElement).closest(".checkbox-wrapper")) {
      e.preventDefault()
    }
  }
  const applyCoupon = () => {
    if (couponInput in coupons) {
      setAppliedCoupon(couponInput)
      setCouponError("")
      setCouponInput("")
    } else {
      setCouponError("등록된 쿠폰이 아닙니다.")
    }
  }

  const totalGuests = adultCount + childCount + infantCount

  return (
    <div className="container mx-auto p-4 my-12">
      <h1 className="text-3xl font-bold mb-6">숙박 예약</h1>
      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>예약 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CalendarDays className="text-gray-500" />
                  <span>
                    {formatDateToString(checkInDate)} ~{" "}
                    {formatDateToString(checkOutDate)} &#40;
                    {calculateNights()}박&#41;
                  </span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-white hover:bg-black hover:text-white transition-colors"
                    >
                      수정하기
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>날짜 변경</DialogTitle>
                    </DialogHeader>
                    <Calendar
                      mode="range"
                      selected={stayDate}
                      onSelect={setStayDate}
                      numberOfMonths={2}
                      locale={ko}
                    />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="text-gray-500" />
                  <span>
                    성인 {adultCount.toString()}명, 어린이{" "}
                    {childCount.toString()}명, 영아 {infantCount.toString()}명
                  </span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-white hover:bg-black hover:text-white transition-colors"
                    >
                      수정하기
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>인원 수정</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      {guestTypes.map(({ key, label, value, setValue }) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <Label>{label}</Label>
                          <Select
                            value={value.toString()}
                            onValueChange={(count) => setValue(Number(count))}
                          >
                            <SelectTrigger className="w-[100px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {["0", "1", "2", "3", "4", "5"].map((_, i) => (
                                <SelectItem key={i} value={i.toString()}>
                                  {i}명
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              {totalGuests >= 6 && (
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">
                    * 6인 이상은 숙박하실 수 없습니다.
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>옵션 선택</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Utensils className="text-gray-500" />
                    <span>BBQ</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant={bbqOption ? "default" : "outline"}
                      onClick={() => setBbqOption(true)}
                    >
                      선택한다
                    </Button>
                    <Button
                      variant={!bbqOption ? "default" : "outline"}
                      onClick={() => {
                        setBbqOption(false)
                        setBBQDate(0) // BBQ 날짜 초기화
                      }}
                    >
                      선택하지 않는다
                    </Button>
                  </div>
                </div>
                {bbqOption && (
                  <Select onValueChange={(value) => setBBQDate(Number(value))}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="날짜 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {stayDateArray.slice(0, -1).map((date) => (
                        <SelectItem key={date} value={date.toString()}>
                          {date}일
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <p className="text-sm text-gray-500">
                  구성 : 그릴, 일회용 석쇠, 토치, 일회용 장갑, 숯을 준비해
                  드립니다.
                  <br />
                  * 우천 시 바베큐 이용이 불가하실 경우 환불해 드립니다.
                  <br />* 마을 안에 위치하여 밤 10시 이후의 바베큐는 제한됩니다.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Droplets className="text-gray-500" />
                    <span>노천탕</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSpaCount(Math.max(0, spaCount - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span>{spaCount}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSpaCount(spaCount + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  이용을 원하실 경우 원하시는 횟수만큼 체크 부탁드리며 1박당
                  최대 추가 가능한 횟수 2회입니다.
                  <br />
                  회당 50,000원의 요금이 책정됩니다.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>할인혜택</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="쿠폰 코드를 입력하세요"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <Button onClick={applyCoupon}>적용</Button>
              </div>
              {appliedCoupon && (
                <p className="text-sm text-green-600">
                  &quot;{appliedCoupon}&quot; 쿠폰이 적용되었습니다. (
                  {coupons[
                    appliedCoupon as keyof typeof coupons
                  ].toLocaleString()}
                  원 할인)
                </p>
              )}
              {couponError && (
                <p className="text-sm text-red-600">{couponError}</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>동의사항</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                {[
                  { key: "privacy", label: "개인정보 제 3자 제공 동의 (필수)" },
                  {
                    key: "minor",
                    label: "미성년자(청소년) 투숙 기준 동의 (필수)",
                  },
                  {
                    key: "refund",
                    label: "스테이 나음 - 환불규정에 대한 동의 (필수)",
                  },
                ].map(({ key, label }) => (
                  <AccordionItem
                    key={key}
                    value={key}
                    onClick={(e) => handleAccordionItemClick(e)}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="checkbox-wrapper">
                        <Checkbox
                          id={key}
                          checked={agreements[key as keyof typeof agreements]}
                          onCheckedChange={() =>
                            handleAgreementChange(
                              key as "privacy" | "minor" | "refund"
                            )
                          }
                        />
                      </div>
                      <AccordionTrigger className="flex-grow">
                        <span>{label}</span>
                      </AccordionTrigger>
                    </div>
                    <AccordionContent>
                      {/* 각 항목에 대한 상세 내용 */}
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="flex items-center space-x-2 pt-4">
                <Checkbox
                  id="all-agreements"
                  checked={allAgreed}
                  onCheckedChange={(checked) =>
                    handleAllAgreements(checked as boolean)
                  }
                />
                <Label
                  htmlFor="all-agreements"
                  className="font-semibold text-base cursor-pointer"
                >
                  사용자 약관 전체 동의
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:sticky lg:top-4 lg:self-start mb-20 lg:mb-0">
          <Card>
            <CardHeader>
              <CardTitle>가격 세부내역</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>기본 금액</span>
                <span>
                  ₩{basePrice.toLocaleString()} * {calculateNights()}박
                </span>
              </div>
              <div className="flex justify-between font-bold">
                <span></span>
                <span>₩{(basePrice * calculateNights()).toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>옵션</span>
                <span>
                  {bbqOption && `BBQ: ₩${bbqPrice.toLocaleString()}`}
                  {bbqOption && spaCount > 0 && <br />}
                  {spaCount > 0 &&
                    `노천탕: ₩${(
                      spaPrice * spaCount
                    ).toLocaleString()} (${spaCount}회)`}
                  {!bbqOption && spaCount === 0 && "-"}
                </span>
              </div>
              {appliedCoupon && (
                <>
                  <Separator />
                  <div className="flex justify-between text-green-600">
                    <span>할인 금액</span>
                    <span>
                      - ₩
                      {coupons[
                        appliedCoupon as keyof typeof coupons
                      ].toLocaleString()}
                    </span>
                  </div>
                </>
              )}
              <Separator />
              <div className="flex justify-between text-xl font-bold">
                <span>총 금액</span>
                <span>₩{totalPrice.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-6 lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <Button className="w-full bg-red-800 hover:bg-red-700">예약하기</Button>
      </div>
      <div className="mt-6 hidden lg:block">
        <Button className="w-36 h-12 bg-red-800 hover:bg-red-700">
          예약하기
        </Button>
      </div>
    </div>
  )
}
