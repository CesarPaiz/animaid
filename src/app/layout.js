
export const metadata = {
  title: 'AniMaid',
  description: 'Animemaid its here',
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
      <body className="bg-slate-950">
        <div>
          <NavBar />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
        <div>
          <EndBar />
        </div>
      </body>
    </html >
  )
}





