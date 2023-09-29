import React from "react";
import { AniLisInfoID } from "../../../../stuff/anilist"
import VideoRPlayer from "../../../../stuff/videoPlayer";
import { getAnimeID } from "../../../../stuff/api";
import { getVideoChapter } from "../../../../stuff/api"
import { animeInfo } from "../../../../stuff/api";
import { getUrlByNumber } from "../../../../stuff/getAnimeCap";
import PaginationMirar from "../../../../stuff/paginationMirar";
import { getSubsLenguageES , getSubsLenguageEN } from "../../../../stuff/getSubsLenguage";

export default async function Page({
    searchParams,
}) {
    var result = await AniLisInfoID({ id: searchParams.id })
    var cap = parseInt(searchParams.captitulo)
    try {
        var infoAnime = await getAnimeID({ nombreAnime: result.data.Media.title.romaji })
        var aniInfo = await animeInfo({ nombreAnime: infoAnime[parseInt(searchParams.resultado)].id })
    }
    catch (error) {
        var infoAnime2 = await getAnimeID({ nombreAnime: result.data.Media.title.english })
        var aniInfo = await animeInfo({ nombreAnime: infoAnime2[parseInt(searchParams.resultado)].id })
    }
    var aniUrl = getUrlByNumber({ jsonObj: aniInfo.episodes, targetNumber: cap })
    var aniURLFix = aniUrl.replace("https://aniwatch.to/watch/", "");
    var final = await getVideoChapter({ captitulo: aniURLFix })
    var getSubsES =  getSubsLenguageES({jsonSubs: final.subtitles})
    var getSubsEN =  getSubsLenguageEN({jsonSubs: final.subtitles})
    var subsEN = getSubsEN[0] ?? ""
    var subsES = getSubsES[0] ?? ""
    var video = final.sources[0].url
    var totalEpisodes = parseInt(aniInfo.totalEpisodes);
    return (
        <>
            <div className="text-white grid justify-center text-center ">
                <div className="flex align-center justify-center max-w-2xl max-h-2xl mt-4 rounded">
                    <VideoRPlayer subsEnglish={subsEN} subsEspanish={subsES} videoURLmain={video} />
                </div>
                <div className="flex align-center justify-center mt-4 rounded">
                    <PaginationMirar anime={searchParams.id} captitulo={searchParams.captitulo} maxCaptitulo={totalEpisodes} resultado={searchParams.resultado} />
                </div>

            </div>


        </>
    )
}