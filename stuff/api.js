
const urlApi = "https://multi-api-animaid.vercel.app"
export async function getAnimeID({ nombreAnime }) {
    var request = urlApi + "/anime/monoschinos/name/" + nombreAnime
    var result = await fetch(request,{
        cache: "no-cache",
    })
    const id = await result.json();
    return (id);
}
export async function getVideoChapter({captitulo }) {
    var result = await fetch(urlApi + captitulo,{
        cache: "no-cache",
    })
    const id = await result.json();
    return (id);

}

export async function animeInfo({ nombreAnime }) {
    var url = urlApi + "/anime/monoschinos/filter?title=" + nombreAnime;
    var result = await fetch(url,{
        cache: "no-cache",
    })
    const id = await result.json();
    return(id)
}
export async function mangaInfo({ nombreManga }) {
    var url = urlApi + nombreManga +"?lang=es-419";
    var result = await fetch(url,{
        cache: "no-cache",
    })
    const id = await result.json();
    return(id)
}
export async function mangaBuscar({ nombreManga }) {
    var url = urlApi + "/manga/comick/filter?search=" + nombreManga;
    var result = await fetch(url,{
        cache: "no-cache",
    })
    const id = await result.json();
    return(id.results[0].url)
}
export async function mangaCaptulo({ nombreManga }) {
    var url = urlApi + nombreManga;
    var result = await fetch(url,{
        cache: "no-cache",
    })
    const id = await result.json();
    return(id)
}