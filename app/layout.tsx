import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { NavbarComponent } from "@/components/navbar"
import { FooterComponent } from "@/components/footer"
import { Providers } from "./providers/providers"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "StayNaum",
  description: "Have good rest in StayNaum",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <script
          type="text/javascript"
          defer
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVERID_MAP}`}
        ></script> */}
        <Providers>
          <NavbarComponent />
          {children}
          <FooterComponent />
        </Providers>
      </body>
    </html>
  )
}
