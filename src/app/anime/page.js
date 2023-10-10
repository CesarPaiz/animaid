import { AniLisInfoID } from "../../../stuff/anilist"
import { getAnimeID } from "../../../stuff/api";
import { animeInfo } from "../../../stuff/api";
import Link from "next/link";
import {encontrarURLMasSimilar} from "../../../stuff/similar";

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




    var result = await AniLisInfoID({ id: searchParams.id })
    var description = result.data.Media.description
    var tags = result.data.Media.tags.category
    var descriptionFix = description.replace(/(<([^>]+)>)/gi, "")
    var title = result.data.Media.title.romaji
    let titleFixPar1 = title.replace(/[^a-zA-Z0-9\s-]/g, '');
    var titleFix = titleFixPar1.replace(/\s+/g, '-');
    var apiIDname = await getAnimeID({ nombreAnime: titleFix })
    if (apiIDname.episodes === undefined) {
        var titlePart1 = obtenerPrimerTextoAlfanumerico(titleFix)
        var apiIDnameFix = await animeInfo({ nombreAnime: titlePart1 })
        var tituloAbuscar = apiIDnameFix.results[0].url // uso mementanio para buscar la url, luego se mejora :p
        var tituloAbuscarFix = tituloAbuscar.replace("/anime/monoschinos/name/", '');
        var apiIDnameFinal = await getAnimeID({ nombreAnime: tituloAbuscarFix })  
    }
    else{
        var apiIDnameFinal = apiIDname
    }

    return (
        <>
            <div className="text-white grid justify-center text-center place-items-center">
                <h1 className="text-2xl mt-5 text-white ">{result.data.Media.title.romaji ?? result.data.Media.title.english}</h1>
                <div className="flex flex-row justify-center max-w-4xl mb-6">
                    <img src={result.data.Media.coverImage.large} className=" mt-4 rounded mb-4 bg-slate-800 max-h-80" alt="logo" />
                    <span className="mt-4 ml-4 line-clamp-6">{descriptionFix}</span>

                </div>

                <div className="grid align-center justify-center max-w-2xl max-h-2xl mt-6 rounded">
                    {
                        apiIDnameFinal?.episodes.map(item => (
                            <>
                                <Link href={{
                                    pathname: '/anime/mirar',
                                    query: {

                                        id: searchParams.id,
                                        captitulo: item.number,

                                    }
                                }}
                                    key={item.name} className="mb-4 bg-slate-800 rounded-full px-4 grid justify-center text-center text-white" > {title}
                                    <span> Episodio {item.number} </span>
                                </Link >
                            </>

                        ))
                    }
                </div>
            </div >


        </>
    )
}