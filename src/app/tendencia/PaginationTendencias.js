'use client'
import Link from "next/link"
import { Suspense } from "react"
import Loading from "./loading"
import { useRouter } from "next/navigation"
export default function TendenciasPage({ pagina }) {

    var pag = parseInt(pagina)
    var pagSiguiente = pag + 1
    var pagAnterior = pag - 1

    return (
        <>
            <div className="flex justify-center align-center place-self-center mt-4 gap-4 mb-4 place-items-center">
                {pag > 1 && (
                    <Link prefetch={false} href={{
                        pathname: '/tendencia/' + pagAnterior,
                        

                    }}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full "> Anterior </button>

                    </Link>
                )}
                <Link prefetch={false} href={{
                    pathname: '/tendencia/' + pagSiguiente,
                    
                }}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full "> Siguiente </button>

                </Link>
            </div>
        </>
    )

}