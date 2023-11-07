import { AniLisInfoID } from "../../../../stuff/anilist"
import { getAnimeID } from "../../../../stuff/api";
import { animeInfo, getAnimeSearch } from "../../../../stuff/api";
import Link from "next/link";
import { obtenerATF } from "../../../../stuff/buscarATF"
import Image from "next/image";





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
    let titleFixPar1 = title.replace(/[^a-zA-Z0-9\s-×]/g, '');
    var titleFix = titleFixPar1.replace(/\s+/g, '-');
    var apiIDname = await getAnimeID({ nombreAnime: titleFix })

    if (apiIDname.episodes === undefined) {
        var titleHunter = titleFixPar1.replace('×', '+x+')
        var titleFixSearch = titleHunter.replace(/\s+/g, '+');
        var apiIDnameSeach = await getAnimeSearch({ nombreAnime: titleFixSearch })

        var apiIDnameBuscar = await getAnimeID({ nombreAnime: apiIDnameSeach[0] })

        if (apiIDnameBuscar.episodes === undefined) {
            var newTitle = obtenerATF(title)
            if (newTitle === undefined) {
                var newTitle = obtenerPrimerTextoAlfanumerico(titleFix)
                var apiIDnameFix = await animeInfo({ nombreAnime: newTitle })
                var tituloAbuscar = apiIDnameFix.results[0].url
                var tituloAbuscarFix = tituloAbuscar.replace("/anime/monoschinos/name/", '');
                var apiIDnameFinal = await getAnimeID({ nombreAnime: tituloAbuscarFix })
            }
            else {
                var apiIDnameFinal = await getAnimeID({ nombreAnime: newTitle })
            }
        }
        else {
            var apiIDnameFinal = apiIDnameBuscar
        }

    }
    else {
        var apiIDnameFinal = apiIDname
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
                        <span className="mt-4  line-clamp-8">{apiIDnameFinal.synopsis ?? descriptionFix}</span>
                    </div>
                </div>


                <div className="grid align-center justify-center max-w-2xl max-h-2xl mt-6 rounded">
                    {
                        apiIDnameFinal?.episodes.map(item => (
                            <>
                                <Link href={{
                                    pathname: '/anime/' + animeID + '/' + item.number,

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