import Image from "next/image"

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      My Post: {params.id}
      <Image src="/promotion.jpg" width={900} height={900} alt={params.id} />
    </div>
  )
}
