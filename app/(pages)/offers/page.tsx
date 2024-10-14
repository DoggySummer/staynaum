import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function Component() {
  const cards = [
    { src: "/eventCard.jpg", title: "2024 신규 할인 혜택", index: "1" },
    { src: "/eventCard.jpg", title: "2024 신규 할인 혜택", index: "2" },
    { src: "/eventCard.jpg", title: "2024 신규 할인 혜택", index: "3" },
    { src: "/eventCard.jpg", title: "2024 신규 할인 혜택", index: "4" },
    { src: "/eventCard.jpg", title: "2024 신규 할인 혜택", index: "5" },
  ]

  return (
    <div className="container mx-auto px-4 my-12">
      <h1 className="text-2xl font-bold text-center mt-8 mb-32">특별한 제안</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Card
            key={card.index}
            className="w-[90vw] sm:w-auto mx-auto sm:mx-0 overflow-hidden"
          >
            <Link href={"offers/" + card.index}>
              <CardContent className="p-0 h-40 relative ">
                <Image
                  src={card.src}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
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
