import { AniListTendencia } from "./anilist"
import Link from "next/link"
import Bback from "./bBack"
import Bnext from "./bNext"
export default function PaginationMain({
    paginaQ
}) {
    return (
        <div className="flex justify-center mt-4 text-white border-spacing-2 mb-4">
            <Link href={{
                pathname: '/tendencia',
                query: {
                    pagina: paginaQ - 1
                }
            }} >
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4" >Anterior</button>

            </Link>

            <Link href={{
                pathname: '/tendencia',
                query: {
                    pagina: paginaQ + 1
                }
            }} >
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4" >Siguiente</button>

            </Link>
        </div>

    )
}