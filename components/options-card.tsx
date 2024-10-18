'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Utensils, Droplets, Minus, Plus } from "lucide-react"

export function OptionsCard() {
  const [bbqDate, setBbqDate] = useState<number | null>(null)
  const [spaCount, setSpaCount] = useState(0)
  const stayDateArray = [12, 13, 14, 15]

  return (
    <Card className="w-full max-w-md mx-auto">
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
            <Select onValueChange={(value) => setBbqDate(Number(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="날짜 선택" />
              </SelectTrigger>
              <SelectContent>
                {stayDateArray.map((date) => (
                  <SelectItem key={date} value={date.toString()}>
                    {date}일
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-gray-500">
            구성 : 그릴, 일회용 석쇠, 토치, 일회용 장갑, 숯을 준비해 드립니다.
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
            이용을 원하실 경우 원하시는 횟수만큼 체크 부탁드리며 1박당 최대 추가 가능한 횟수 2회입니다.
            <br />
            회당 50,000원의 요금이 책정됩니다.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}