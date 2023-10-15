'use client'

import React, { useEffect, useState } from "react";
import { AniLisInfoID } from "../../../../stuff/anilist"
import { getAnimeID } from "../../../../stuff/api";
import { getVideoChapter } from "../../../../stuff/api"
import { animeInfo } from "../../../../stuff/api";
import PaginationMirar from "../../../../stuff/paginationMirar";
import { obtenerATF } from "../../../../stuff/buscarATF";
import VideoIframe from "./VideoIframe";

export default async function Page({
    searchParams,
}) {


    function obtenerPrimerTextoAlfanumerico(texto) {
        const coincidencia = texto.match(/[a-zA-Z0-9]+/);
        if (coincidencia) {
            return coincidencia[0];
        } else {
            return "No se encontró texto alfanumérico";
        }
    }

    function getUrlByNumber(json, targetNumber) {
        const matchingObject = json.find(obj => obj.number === targetNumber);
        return matchingObject ? matchingObject.url : null;
    }

    var cap = parseInt(searchParams.captitulo)
    var result = await AniLisInfoID({ id: searchParams.id })
    var title = result.data.Media.title.romaji
    let titleFixPar1 = title.replace(/[^a-zA-Z0-9\s-×]/g, '');
    var titleFix = titleFixPar1.replace(/\s+/g, '-');
    var apiIDname = await getAnimeID({ nombreAnime: titleFix })
    if (apiIDname.episodes === undefined) {
        var newTitlejson = obtenerATF(title)
        if (newTitlejson === undefined) {
            var newTitle = obtenerPrimerTextoAlfanumerico(titleFix)
            var apiIDnameFix = await animeInfo({ nombreAnime: newTitle })
            var tituloAbuscar = apiIDnameFix.results[0].url
            var tituloAbuscarFix = tituloAbuscar.replace("/anime/monoschinos/name/", '');
            var apiIDnameFinal = await getAnimeID({ nombreAnime: tituloAbuscarFix })

        }
        else {
            var apiIDnameFinaljson = await getAnimeID({ nombreAnime: newTitlejson })
            var apiIDnameFinal = apiIDnameFinaljson
        }
        var resultado = getUrlByNumber(apiIDnameFinal.episodes, cap)
        var captitulo = resultado
        var final = await getVideoChapter({ captitulo: captitulo })
        var video = final[0].url

    }
    else {
        var apiIDnameFinal = await getAnimeID({ nombreAnime: titleFix })
        var resultado = getUrlByNumber(apiIDnameFinal.episodes, cap)
        var captitulo = resultado
        var final = await getVideoChapter({ captitulo: captitulo })
    }

    return (
        <>
            <div className="flex align-center justify-center mt-8 rounded">
                <div key={final[0].url} className="text-white grid justify-center text-center ">
                    <div className="flex align-center justify-center w-full h-full max-w-2xl max-h-2xl mt-4 rounded">
                        <iframe className="w-full h-full" src={final[0].url} allowFullScreen></iframe>

                    </div>

                </div >
            </div>
        </>
    )
}