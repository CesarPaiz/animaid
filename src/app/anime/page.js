import { AniLisInfoID } from "../../../stuff/anilist"
import { getAnimeID } from "../../../stuff/api";
import { animeInfo } from "../../../stuff/api";
import Link from "next/link";
import NexResultButtons from "../../../stuff/nexResult";

export default async function Page({
    searchParams,
}) {
    var result = await AniLisInfoID({ id: searchParams.id })
    var description = result.data.Media.description
    var tags = result.data.Media.tags.category
    var descriptionFix = description.replace(/(<([^>]+)>)/gi, "")
    var numeroResultado = parseInt(searchParams.resultado)
    try {
        var apiIDname = await getAnimeID({ nombreAnime: result.data.Media.title.romaji })
        var animeByResultado = apiIDname[parseInt(numeroResultado)]
        var aniInfo = await animeInfo({ nombreAnime: animeByResultado.id })
    } catch (error) {
        var apiIDname2 = await getAnimeID({ nombreAnime: result.data.Media.title.english })
        console.log(apiIDname2)
        var animeByResultado = apiIDname2[parseInt(numeroResultado)]
        var aniInfo = await animeInfo({ nombreAnime: animeByResultado.id })
    }


    return (
        <>
            <div className="text-white grid justify-center text-center place-items-center">
                <h1 className="text-2xl mt-5 text-white ">{result.data.Media.title.english ?? result.data.Media.title.romaji}</h1>
                <div className="flex flex-row justify-center max-w-4xl mb-6">
                    <img src={result.data.Media.coverImage.large} className=" mt-4 rounded mb-4 bg-slate-800 max-h-80" alt="logo" />
                    <span className="mt-4 ml-4 line-clamp-6">{descriptionFix}</span>

                </div>

                <NexResultButtons item={searchParams.id} resultado={searchParams.resultado} />
                <div className="grid align-center justify-center max-w-2xl max-h-2xl mt-6 rounded">
                    {
                        aniInfo?.episodes.map(item => (
                            <>
                                <Link href={{
                                    pathname: '/anime/mirar',
                                    query: {

                                        id: searchParams.id,
                                        captitulo: item.number,
                                        resultado: searchParams.resultado

                                    }
                                }}
                                    key={item.title} className="mb-4 bg-slate-800 rounded-full px-4 grid justify-center text-center text-white" > {aniInfo.title} Captitulo {item.number}
                                    <span> {item.title} </span>
                                </Link >
                            </>

                        ))
                    }
                </div>
            </div >


        </>
    )
}