
export const metadata = {
  title: 'AniMaid',
  description: 'Animemaid its here',
  manifest: '/manifest.json',
}

import "./globals.css"
import NavBar from "./NavBar"
import { Suspense } from "react"
import HeadHTML from "./HeadHTML"
import EndBar from "./EndBar"

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <HeadHTML />
      <body className="bg-slate-950 relative min-h-screen">
        <div className="mb-12">
          <div >
            <NavBar />
          </div>
          <div className="">
            {children}
          </div>
        </div>

        <div className="md:pb-8 pb-28">
          <EndBar />
        </div>

      </body>
    </html>
  )
}






