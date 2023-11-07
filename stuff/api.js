const urlApi = "https://multi-api-animaid.vercel.app"
export async function getAnimeID({ nombreAnime }) {
    var request = urlApi + "/anime/monoschinos/name/" + nombreAnime
    var result = await fetch(request, { cache: 'no-store' })
    const id = await result.json();
    return (id);
}

export async function getAnimeSearch({ nombreAnime }) {
    const cheerio = require('cheerio');
    const resultadosLinks = []

    var busqueda = fetch('https://monoschinos2.com/buscar?q=' + nombreAnime)
        .then(response => response.text())
        .then(data => {
            const $ = cheerio.load(data);
            const heromainDiv = $('.row'); // Busca el div con la clase "heromain"
            const links = heromainDiv.find('a'); // Encuentra todos los elementos 'a' dentro del div "heromain"
            
            links.each((index, element) => {
                const $element = $(element);
                var href = $element.attr('href');
                var hrefFix = href.replace('https://monoschinos2.com/anime/', '');
                resultadosLinks.push(hrefFix);
                
            });
            return (resultadosLinks)
        })
        
        return (busqueda)


}

export async function getVideoChapter({ captitulo }) {
    var result = await fetch(urlApi + captitulo, { cache: 'no-store' })
    const id = await result.json();
    return (id);

}

export async function animeInfo({ nombreAnime }) {
    var url = urlApi + "/anime/monoschinos/filter?title=" + nombreAnime;
    var result = await fetch(url, { cache: 'no-store' })
    const id = await result.json();
    return (id)
}
export async function mangaInfo({ nombreManga }) {
    var url = urlApi + nombreManga + "?lang=es-419";
    var result = await fetch(url, { cache: 'no-store' })
    const id = await result.json();
    if (id.chapters[0] === undefined) {
        var url = urlApi + nombreManga + "?lang=en";
        var result = await fetch(url, { cache: 'no-store' })
        const id = await result.json();
        return (id)
    }
    return (id)
}
export async function mangaBuscar({ nombreManga }) {
    var url = urlApi + "/manga/comick/filter?search=" + nombreManga;
    var result = await fetch(url, { cache: 'no-store' })
    const id = await result.json();
    return (id.results[0].url)
}
export async function mangaCaptulo({ nombreManga }) {
    var url = urlApi + nombreManga;
    var result = await fetch(url, { cache: 'no-store' })
    const id = await result.json();
    return (id)
}