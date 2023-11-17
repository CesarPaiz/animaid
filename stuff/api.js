const urlApi = "https://multi-api-animaid.vercel.app"







export async function MonosChinosanimeInfo({ titleAnime }) {
    var titleFixPar1 = titleAnime.replace(/[^a-zA-Z0-9\s-×]/g, '');
    var titleFix = titleFixPar1.replace(/\s+/g, '-');
    var request = urlApi + "/anime/monoschinos/name/" + titleFix
    var result = await fetch(request, { cache: 'no-store' })
    const id = await result.json();
    return (id);
}


export async function animeFLVanimeInfo({ nombreAnime }) {
    try {
        var temporadaFix = nombreAnime.replace('Season 2', '2nd Season').replace('Part 2', '2nd Season')
        var requestBusqueda = urlApi + "/anime/flv/filter?title=" + temporadaFix
        //console.log(requestBusqueda)

        var resultBusqueda = await fetch(requestBusqueda, { cache: 'no-store' })
        const nombreJson = await resultBusqueda.json();
        var nombreBusqueda = nombreJson.results[0].url
        var request = urlApi + nombreBusqueda
        var result = await fetch(request, { cache: 'no-store' })
        const id = await result.json();
        return (id);
    }
    catch {
        return (null)
    }

}

export async function getAnimeSearch({ nombreAnime }) {


    const fuentes = [
        {
            name: 'monoschinos2',
            url: 'https://monoschinos2.com/buscar?q='
        },
        {
            name: 'animeFlv',
            url: 'https://multi-api-animaid.vercel.app/anime/flv/filter?title='
        }
    ]


    var resultadosFinal = []


    async function buscaDorPorFuente(fuente) {


        if (fuente == 'monoschinos2') {
            var resultados = await MonosChinosanimeInfo( {titleAnime:nombreAnime})
            return ({
                'nombre': fuente,
                resultados
            })
        }
        else if (fuente == 'animeFlv') {
            var resultados = await animeFLVanimeInfo({ nombreAnime })
            return ({
                'nombre': fuente
                , resultados
            })
        }
    }
    for await (const fuente of fuentes) {
        resultadosFinal.push(await buscaDorPorFuente(fuente.name))
    }
    //console.log(resultadosFinal)
    return (resultadosFinal)
}

export async function getVideoChapter({ captitulo }) {
    var result = await fetch(urlApi + captitulo, { cache: 'no-store' })
    const id = await result.json();
    return (id);

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