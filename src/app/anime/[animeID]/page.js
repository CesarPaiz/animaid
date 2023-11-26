import { AniLisInfoID } from "../../../../stuff/anilist"
import { getAnimeID } from "../../../../stuff/api";
import { animeInfo, getAnimeSearch } from "../../../../stuff/api";
import Link from "next/link";
import { obtenerATF } from "../../../../stuff/buscarATF"
import Image from "next/image";
import CapViewer from "./Cap_viewer";
import { Suspense } from "react";




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

    return (

        <>

            <div className="text-white flex flex-col justify-center  place-items-center">
                <h1 className="text-2xl mt-5 text-white ">{result.data.Media.title.romaji ?? result.data.Media.title.english}</h1>
                <div className="flex md:flex-row flex-col align-center justify-center mt-6 mb-6 place-items-center">
                    <div className=" flex md:align-center justify-center text-center items-center  " style={{ width: '200px', height: '300px', position: 'relative' }} >
                        <Image
                            unoptimized
                            src={result.data.Media.coverImage.large}
                            fill
                            style={{ objectFit: 'cover' }}
                        />

                    </div>
                    <div className="md:ml-4 max-w-2xl">
                        <span className="mt-4  line-clamp-8">{descriptionFix}</span>
                    </div>
                </div>
        

                <Suspense fallback={<span className='flex justify-center align-center text-2xl mt-8 text-white'>Loading...</span>}>
                    <div className="grid align-center justify-center max-w-2xl max-h-2xl mt-6 rounded">
                        <CapViewer fuentes={mutiAnimeAPI} anime={animeID} titulo={title} />
                    </div>
                </Suspense>
            </div >
        </>
    )
}