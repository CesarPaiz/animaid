import Link from "next/link"
import { AniListTendencia } from "../../../../stuff/anilist"
import Image from "next/image"
import { Suspense } from "react"
import TendenciasPage from "../PaginationTendencias"
import Loading from "../loading"
import ImageAsync from "next/image"
import AnimeTable from "../../../../stuff/animeTable"


export async function generateMetadata({ params: { pageNum } }) {

    return {
        title: 'Tendencias Pagina ' + pageNum + ' - AniMaid',

    }
}

export default async function Main({
    params: { pageNum },
}) {
    const pagina = parseInt(pageNum) ?? 1
    const data = await AniListTendencia({ pagina: pagina })
    return (
        <>
            <span className="flex justify-center align-center text-2xl mt-8 text-white text-center">Tendencias Pagina {pagina}</span>

            <AnimeTable datos={data} fuente={'tendencia'} />

            <TendenciasPage pagina={pagina} />

        </>

    )
}