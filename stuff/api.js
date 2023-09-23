import axios from "axios"

export async function getAnimeID({ nombreAnime }) {
    var url ="https://api-animaid.vercel.app/anime/gogoanime/"+ nombreAnime + "?page=1"

    var result = await fetch(url)
    const id = await result.json();

    return(id.results[0].id);
}
export async function getVideoChapter({ nombreAnime }) {
    var url ="https://api-animaid.vercel.app/anime/gogoanime/watch/"+ nombreAnime +"-episode-1"

    var result = await fetch(url, { params: { server: "gogocdn" } })
    const id = await result.json();

    return(id.sources[3].url);
}
