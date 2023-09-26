import React from "react";
import { AniLisInfoID } from "../../../stuff/anilist"
import VideoPlayerMain from "../../../stuff/videoPlayer";
import { getAnimeID } from "../../../stuff/api";
import { getVideoChapter } from "../../../stuff/api"
import { animeInfo } from "../../../stuff/api";
import Link from "next/link";

export default async function Page({
    searchParams,
}) {
    var result = await AniLisInfoID({ id: searchParams.query })
    var description = result.data.Media.description
    var tags = result.data.Media.tags.category
    var descriptionFix = description.replace(/(<([^>]+)>)/gi, "")
    var apiIDname = await getAnimeID({ nombreAnime: result.data.Media.title.romaji })
    var aniInfo = await animeInfo({ nombreAnime: apiIDname })


    return (
        <>
            <div className="text-white grid justify-center text-center ">
                <h1 className="text-2xl mt-5 text-white ">{result.data.Media.title.english}</h1>
                <div className="flex flex-row justify-center max-w-4xl ">
                    <img src={result.data.Media.coverImage.large} className=" mt-4 rounded mb-4 bg-slate-800 max-h-80" alt="logo" />
                    <span className="mt-4 ml-4 line-clamp-6 hover:line-clamp-none">{descriptionFix}</span>
                </div>

                <div className="grid align-center justify-center max-w-2xl max-h-2xl mt-4 rounded">
                    {
                        aniInfo?.episodes.map(item => (

                            <Link href={{
                                pathname: '/anime/mirar',
                                query: {
                                    
                                    anime: searchParams.query,
                                    captitulo: item.number
                                }
                            }} key={item} className="grid justify-center text-center text-white">{aniInfo.title} Captitulo {item.number}</Link>

                        ))
                    }
                </div>
            </div>

        </>
    )
}