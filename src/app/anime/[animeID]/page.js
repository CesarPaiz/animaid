import { AniLisInfoID } from "../../../../stuff/anilist"
import { getAnimeID } from "../../../../stuff/api";
import { animeInfo, getAnimeSearch } from "../../../../stuff/api";
import Link from "next/link";
import { obtenerATF } from "../../../../stuff/buscarATF"
import Image from "next/image";
import CapViewer from "./Cap_viewer";




export async function generateMetadata({ params: { animeID } }) {
    var result = await AniLisInfoID({ id: animeID })
    var title = result.data.Media.title.romaji
    var description = result.data.Media.description
    var descriptionFix = description.replace(/(<([^>]+)>)/gi, "")

    return {
        title: title + ' - AniMaid',
        description: descriptionFix,
        openGraph: {
            images: result.data.Media.bannerImage
        },
    }
}



export default async function Page({
    params: { animeID },
}) {

    function obtenerPrimerTextoAlfanumerico(texto) {
        const coincidencia = texto.match(/[a-zA-Z0-9]+/);
        if (coincidencia) {
            return coincidencia[0];
        } else {
            return "No se encontró texto alfanumérico";
        }
    }
    var result = await AniLisInfoID({ id: animeID })
    var description = result.data.Media.description
    var tags = result.data.Media.tags.category
    var descriptionFix = description.replace(/(<([^>]+)>)/gi, "")
    var title = result.data.Media.title.romaji

    var mutiAnimeAPI = await getAnimeSearch({ nombreAnime: title })




    function convertirSegundos(segundos) {
        var dias = Math.floor(segundos / (24 * 3600)) ?? 0;
        var horas = Math.floor((segundos % (24 * 3600)) / 3600) ?? 0;
        var minutos = Math.floor((segundos % 3600) / 60) ?? 0;
        var segundosRestantes = segundos % 60 ?? 0;
        return {
            dias: dias,
            horas: horas,
            minutos: minutos,
            segundos: segundosRestantes
        };
    }
    try {
        var tiempo = convertirSegundos(result.data.Media.nextAiringEpisode.timeUntilAiring)
    } catch (error) {
        var tiempo = 'Finalizado'
    }



    return (

        <>

            <div className="text-white flex flex-col justify-center  place-items-center">
                <h1 className="text-2xl mt-5 text-white ">{result.data.Media.title.romaji ?? result.data.Media.title.english}</h1>
                <div className="flex md:flex-row flex-col align-center justify-center mt-6 mb-6 place-items-center">
                    <div className=" flex md:align-center justify-center text-center items-center  " style={{ width: '200px', height: '300px', position: 'relative' }} >
                        <Image
                            src={result.data.Media.coverImage.large}
                            fill
                            style={{ objectFit: 'cover' }}
                        />

                    </div>
                    <div className="md:ml-4 max-w-2xl">
                        <span className="mt-4  line-clamp-8">{descriptionFix}</span>
                    </div>
                </div>
                {tiempo !== 'Finalizado' &&
                    <span> Siguiente capitulo dentro de {tiempo.dias + ' Dias'}  {tiempo.horas + ' Horas'}  {tiempo.minutos + ' Minutos'} </span>
                }
                {tiempo === 'Finalizado' &&
                    <span> Finalizado </span>
                }


                <div className="grid align-center justify-center max-w-2xl max-h-2xl mt-6 rounded">
                    <CapViewer fuentes={mutiAnimeAPI} anime={animeID} titulo={title} />
                </div>
            </div >
        </>
    )
}