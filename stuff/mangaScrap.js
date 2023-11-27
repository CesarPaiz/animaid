const mainUrl = 'https://multi-api-animaid.vercel.app/'

export async function mangaScrapSearch({ nombreManga }) {
    const nameFix = nombreManga.replace(/ /g, '-')
    var url = mainUrl + "manga/comick/filter?search=" + nameFix + '?lang=es-419'
    const search = await fetch(url, { cache: 'no-store' })
    const result = await search.json();
    return(result.results[0].url)
}





export async function mangaScrapInfo({ url }) {
    const search = await fetch(mainUrl +  url + '?lang=es-419', { cache: 'no-store' })
    const result = await search.json();
    console.log(result)
    return(result.chapters)
}
export async function getCapImages({ url }) {
    const search = await fetch(mainUrl + url, { cache: 'no-store' })
    const result = await search.json();
    return(result.images)
}