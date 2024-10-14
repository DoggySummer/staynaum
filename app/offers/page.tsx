import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"

export default function Component() {
  const cards = [
    { color: "bg-red-500", title: "빨간 카드" },
    { color: "bg-blue-500", title: "파란 카드" },
    { color: "bg-green-500", title: "초록 카드" },
    { color: "bg-yellow-500", title: "노란 카드" },
    { color: "bg-purple-500", title: "보라 카드" },
    { color: "bg-pink-500", title: "분홍 카드" },
  ]

  return (
    <div className="container mx-auto px-4 my-12">
      <h1 className="text-2xl font-bold text-center mt-8 mb-32">특별한 제안</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <Card
            key={index}
            className="w-[90vw] sm:w-auto mx-auto sm:mx-0 overflow-hidden"
          >
            <Link href="/">
              <CardContent className="p-0">
                <div className={`h-32 ${card.color}`} />
              </CardContent>
              <CardFooter className="p-4">
                <h3 className="text-lg font-semibold">{card.title}</h3>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
