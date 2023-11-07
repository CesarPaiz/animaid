import React, { Suspense } from "react";
import { AniLisInfoID } from "../../../../../stuff/anilist"
import { getAnimeID, getAnimeSearch } from "../../../../../stuff/api";
import { getVideoChapter } from "../../../../../stuff/api"
import { animeInfo } from "../../../../../stuff/api";
import { obtenerATF } from "../../../../../stuff/buscarATF";
import IframeVideo from "../../../../../stuff/iframe";


export async function generateMetadata({
    params: { animeID },
    params: { aniCap }
}) {
    var result = await AniLisInfoID({ id: animeID })
    var title = result.data.Media.title.romaji
    var description = result.data.Media.description
    var descriptionFix = description.replace(/(<([^>]+)>)/gi, "")

    return {
        title: title + ' - Cap ' + aniCap + ' - AniMaid',
        description: descriptionFix,
        openGraph: {
            images: result.data.Media.bannerImage
        },
    }
    
}


export default async function Page({
    params: { animeID },
    params: { aniCap }
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
    var cap = parseInt(aniCap)
    var result = await AniLisInfoID({ id: animeID })
    var title = result.data.Media.title.romaji
    let titleFixPar1 = title.replace(/[^a-zA-Z0-9\s-×]/g, '');
    var titleFix = titleFixPar1.replace(/\s+/g, '-');
    var apiIDname = await getAnimeID({ nombreAnime: titleFix })


    if (apiIDname.episodes === undefined) {
        var titleHunter = titleFixPar1.replace('×', '+x+')
        var titleFixSearch = titleHunter.replace(/\s+/g, '+');
        var apiIDnameSeach = await getAnimeSearch({ nombreAnime: titleFixSearch })
        if (apiIDnameSeach[0] === undefined) {
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
            var apiIDnameFinal = await getAnimeID({ nombreAnime: apiIDnameSeach[0] })
            var resultado = getUrlByNumber(apiIDnameFinal.episodes, cap)
            var captitulo = resultado
            var final = await getVideoChapter({ captitulo: captitulo })
            var video = final[0].url
        }
    }
    else {
        var apiIDnameFinal = await getAnimeID({ nombreAnime: titleFix })
        var resultado = getUrlByNumber(apiIDnameFinal.episodes, cap)
        var captitulo = resultado
        var final = await getVideoChapter({ captitulo: captitulo })
        var video = final[0].url
    }
    return (
        <>
            <Suspense fallback={<span>Loading...</span>}>
                <div className="  justify-items-center text-center items-center">
                    <IframeVideo jsonVideos={final} id={animeID} episodios={apiIDnameFinal.episodes} captitulo={aniCap} />
                </div>
            </Suspense>

        </>
    )
}