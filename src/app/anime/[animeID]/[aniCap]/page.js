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
    params: { aniCap },
    searchParams,
}) {
    var fuente = searchParams.fuente
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
        if (!matchingObject) {
            const final = json.find(obj => obj.number === 'Episodio ' + targetNumber);
            return final ? final.url : null;

        }
        
        return matchingObject ? matchingObject.url : null;
    }

    function getFuenteAnime(fuentes , targetFuente) {

        for(let i = 0; i < fuentes.length; i++) {
            if(fuentes[i].nombre == targetFuente) {
                return i
            }
        }
    }
  
    var cap = parseInt(aniCap)
    var result = await AniLisInfoID({ id: animeID })
    var title = result.data.Media.title.romaji

    var mutiAnimeAPI = await getAnimeSearch({ nombreAnime: title })
    var fuente_a_ver = getFuenteAnime(mutiAnimeAPI, fuente) ?? 0
    var apiIDnameFinal = mutiAnimeAPI[fuente_a_ver].resultados

    var capAVer = getUrlByNumber(apiIDnameFinal.episodes, cap)

    var final = await getVideoChapter({ captitulo: capAVer })

    return (
        <>
            <Suspense fallback={<span>Loading...</span>}>
                <div className="  justify-items-center text-center items-center ">
                    <IframeVideo jsonVideos={final} id={animeID} episodios={apiIDnameFinal.episodes} captitulo={aniCap} />
                </div>
            </Suspense>

        </>
    )
}