import "./globals.css"
import Footer from "./_components/Footer"
import type { Metadata } from "next"
import NavBar from "./_components/NavBar"

export const metadata: Metadata = {
  title: " MAPSEA_NAVIGATION",
  description: "Mapsea Navigation Service",
}

// if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') console.log = () => {};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
