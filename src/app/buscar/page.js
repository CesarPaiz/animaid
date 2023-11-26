import Link from "next/link"
import AnimeTable from "../../../stuff/animeTable"
import React from "react";
import {AniListSearch} from "../../../stuff/anilist"


export async function generateMetadata({ searchParams }) {
    var nombre = searchParams.query;
    return {
        title: 'Buscar - ' + nombre + ' - AniMaid',
    }
}
export default async function BuscarMain({
    searchParams,
}) {
    var nombre = searchParams.query;
    var resultado = await AniListSearch({ nombreAnime: nombre })
    return (
        <>
            <AnimeTable datos={resultado} />
        </>
    )
}