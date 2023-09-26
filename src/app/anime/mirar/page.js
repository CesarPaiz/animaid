
import React from "react";
import { AniLisInfoID } from "../../../../stuff/anilist"
import VideoRPlayer from "../../../../stuff/videoPlayer";
import { getAnimeID } from "../../../../stuff/api";
import { getVideoChapter } from "../../../../stuff/api"
import { animeInfo } from "../../../../stuff/api";
import { getUrlByNumber } from "../../../../stuff/getAnimeCap";
import PaginationMirar from "../../../../stuff/paginationMirar";
import { getSubsLenguageMain } from "../../../../stuff/getSubsLenguage";

export default async function Page({
    searchParams,
}) {
    var result = await AniLisInfoID({ id: searchParams.anime })
    var cap = parseInt(searchParams.captitulo)
    var infoAnime = await getAnimeID({ nombreAnime: result.data.Media.title.romaji })
    var aniInfo = await animeInfo({ nombreAnime: infoAnime })
    var aniUrl = getUrlByNumber({ jsonObj: aniInfo.episodes, targetNumber: cap })
    var aniURLFix = aniUrl.replace("https://aniwatch.to/watch/", "");
    var final = await getVideoChapter({ captitulo: aniURLFix })
    var getSubs =  getSubsLenguageMain({jsonSubs: final.subtitles})
    var subsEN = getSubs[0] ?? ""
    var subsES = getSubs[2] ?? getSubs[3] ?? getSubs [1] ?? ""
    var video = await final.sources[0].url
    var totalEpisodes = parseInt(aniInfo.totalEpisodes);
    return (

        <>
            <div className="text-white grid justify-center text-center ">
                <div className="flex align-center justify-center max-w-2xl max-h-2xl mt-4 rounded">
                    <VideoRPlayer videoURLmain={video} subsEnglish={subsEN} subsEspanish={subsES} />
                </div>
                <div className="flex align-center justify-center mt-4 rounded">
                    <PaginationMirar anime={searchParams.anime} captitulo={searchParams.captitulo} maxCaptitulo={totalEpisodes} />
                </div>


            </div>


        </>
    )
}