'use client'

import React, { useEffect, useState } from "react";
import { AniLisInfoID } from "../../../../stuff/anilist"
import { getAnimeID } from "../../../../stuff/api";
import { getVideoChapter } from "../../../../stuff/api"
import { animeInfo } from "../../../../stuff/api";
import PaginationMirar from "../../../../stuff/paginationMirar";
import { obtenerATF } from "../../../../stuff/buscarATF";

export default async function Page({
    searchParams,
}) {
    var titulo = searchParams.titulo
    var id = parseInt(searchParams.cap)
    var apiIDname = await getAnimeID({ nombreAnime: titulo })
    var videoGET = await getVideoChapter({ captitulo: apiIDname.episodes[id].url })
    var video = videoGET[0].url
    return (
        <>
            <div className="text-white grid justify-center text-center ">
                <div className="flex align-center justify-center max-w-2xl max-h-2xl mt-4 rounded">
                    <iframe width="560" height="315" src={video} sandbox="allow-same-origin allow-scripts" allowFullScreen=""></iframe>
                </div>

                <div className="flex align-center justify-center mt-4 rounded">
                    <PaginationMirar anime={titulo} captitulo={id} />
                </div>

            </div >
        </>
    )
}