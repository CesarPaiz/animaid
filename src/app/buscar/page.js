import Link from "next/link"
import AnimeTable from "../../../stuff/animeTable"
import React from "react";
export default async function BuscarMain({
    searchParams,
}) {
    var nombre = searchParams.query;
    return (
        <>
            <AnimeTable nombreAnime={nombre} />
        </>
    )
}