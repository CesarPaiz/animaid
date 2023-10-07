import axios from "axios"

const urlApi = "https://multi-api-animaid.vercel.app"
export async function getAnimeID({ nombreAnime }) {
    var request = urlApi + "/anime/monoschinos/name/" + nombreAnime
    var result = await fetch(request)
    const id = await result.json();
    return (id);
}
export async function getVideoChapter({captitulo }) {
    var result = await fetch(urlApi + captitulo)
    const id = await result.json();
    return (id);

}
export async function animeInfo({ nombreAnime }) {
    var url = "https://api-animaid.vercel.app/anime/gogoanime/info/" + nombreAnime;
    var result = await fetch(url,)
    const id = await result.json();
    return(id)
}