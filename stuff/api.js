import axios from "axios"

export async function getAnimeID({ nombreAnime }) {
    var url = "https://api-animaid.vercel.app/anime/zoro/" + nombreAnime + "?page=1"

    var result = await fetch(url)
    const id = await result.json();
    return (id.results);
}
export async function getVideoChapter({captitulo }) {
    var url = "https://api-animaid.vercel.app/anime/zoro/watch?episodeId=" + captitulo +"$episode$89506$both&server=vidstreaming" ;
    var result = await fetch(url, { params: { server: "vidstreaming" } })
    const id = await result.json();
    return (id);

}
export async function animeInfo({ nombreAnime }) {
    var url = "https://api-animaid.vercel.app/anime/zoro/info?id=" + nombreAnime;

    var result = await fetch(url,)
    const id = await result.json();
    return(id)
}