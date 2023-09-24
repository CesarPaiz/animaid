import React from "react";
import { AniLisInfoID } from "../../../../stuff/anilist"
import VideoPlayerMain from "../../../../stuff/videoPlayer";
import { getAnimeID } from "../../../../stuff/api";
import { getVideoChapter } from "../../../../stuff/api"
import videoQualityStractor from "../../../../stuff/videoQualityStractor";
import { animeInfo } from "../../../../stuff/api";
import Link from "next/link";

export default async function Page({
    searchParams,
}) {
    var nombre = searchParams.anime
    var captitulo = searchParams.captitulo
    var animeByChapter = await getVideoChapter({ nombreAnime: nombre, captitulo: captitulo })
    var calidades = videoQualityStractor(animeByChapter)



        return (

            <>
                <div className="text-white grid justify-center text-center ">
                    <div className="flex align-center justify-center max-w-2xl max-h-2xl mt-4 rounded">
                        <VideoPlayerMain videoSource={calidades} />
                    </div>
                    <Link href={{
                        pathname: '/view/mirar',
                        query: {
                            anime: nombre,
                            captitulo: parseInt(captitulo) + 1
                        }
                    }}
                    >
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Siguiente</button>
                    </Link>

                </div>

            </>
        )
    }