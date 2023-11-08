import Link from "next/link"
import AnimeTable from "../../../stuff/animeTable"
import React from "react";



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
    return (
        <>
            <AnimeTable className="" nombreAnime={nombre} />
        </>
    )
}