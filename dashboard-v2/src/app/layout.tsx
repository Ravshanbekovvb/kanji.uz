import { Geist_Mono, Oxanium } from "next/font/google"

import { cn } from "@/src/shared/lib/utils"
import { Providers } from "../shared/providers/providers"
import "./globals.css"

const oxanium = Oxanium({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        oxanium.variable
      )}
    >
      <body>
        <Providers>

        {children}
        </Providers>
      </body>
    </html>
  )
}
