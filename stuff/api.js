import axios from "axios"

export async function getAnimeID({ nombreAnime }) {
    var url = "https://api-animaid.vercel.app/anime/gogoanime/" + nombreAnime + "?page=1"

    var result = await fetch(url)
    const id = await result.json();
    return (id.results[0].id);
}
export async function getVideoChapter({ nombreAnime, captitulo }) {
    var url = "https://api-animaid.vercel.app/anime/gogoanime/watch/" + nombreAnime +"-episode-"+captitulo;
    var result = await fetch(url, { params: { server: "gogoanime" } })
    const id = await result.json();

    return (id.sources);

}
export async function animeInfo({ nombreAnime }) {
    var url = "https://api-animaid.vercel.app/anime/gogoanime/info/" + nombreAnime;

    var result = await fetch(url,)
    const id = await result.json();
    return(id)
}