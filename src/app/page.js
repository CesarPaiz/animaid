import Link from "next/link"
import Image from "next/image"
import { AniListTendencia } from "../../stuff/anilist"
import PaginationMain from "../../stuff/pagination"
import { AniListPopular } from "../../stuff/anilist"
import { Suspense } from "react"
import Head from 'next/head'
import AnimeTable from './../../stuff/animeTable'
export default async function Main({
    searchParams,
}) {

    const data = await AniListPopular({ pagina: 1 })



    return (
        <>
        
            <h1 className="text-2xl mt-5 text-white text-center">Los animes mas populares</h1>
            <AnimeTable datos={data} fuente={'main'} />
        </>

    )
}
