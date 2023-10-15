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

    var result = await AniLisInfoID({ id: searchParams.id })
    var description = result.data.Media.description
    var tags = result.data.Media.tags.category
    var descriptionFix = description.replace(/(<([^>]+)>)/gi, "")
    var title = result.data.Media.title.romaji
    let titleFixPar1 = title.replace(/[^a-zA-Z0-9\s]/g, '');
    var titleFix = titleFixPar1.replace(/\s+/g, '-');
    var apiIDname = await getAnimeID({ nombreAnime: titleFix })
    

    var videoGet = await getVideoChapter({ captitulo: apiIDname.episodes[0].url })

    var video = videoGet[0].url

    console.log(title)

    return (
        <>
            <div className="text-white grid justify-center text-center ">
                <div className="flex align-center justify-center max-w-2xl max-h-2xl mt-4 rounded">
                    <iframe width="560" height="315" src={video} sandbox="allow-same-origin allow-scripts" allowfullscreen=""></iframe>
                </div>

                <div className="flex align-center justify-center mt-4 rounded">
                    <PaginationMirar anime={searchParams.id} captitulo={searchParams.captitulo} resultado={searchParams.resultado} />
                </div>

            </div >
        </>
    )
}