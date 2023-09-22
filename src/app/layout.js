export const metadata = {
  title: 'AniMaid',
  description: 'Animemaid its here', 
}
import "./globals.css"
import NavBar from "./NavBar"


export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <title>{metadata.title}</title>
      </head>
      <body className="bg-slate-950">
        <div className="">
          <NavBar />
        </div>
        {children}
      </body>
    </html >
  )
}
