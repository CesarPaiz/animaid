import cheerio from 'cheerio';
import { fetch } from 'undici'
import path from 'path';
import fs from 'fs';

const urlApi = "https://multi-api-animaid.vercel.app"
async function titleFilter({ titleAnime }) {
    const filtros = [
        {
            original: '×',
            replace: ' x ',
        }
    ]
    for (const filtro of filtros) {
        titleAnime = titleAnime.replace(filtro.original, filtro.replace)
    }
    return titleAnime
}

async function jkGetChapter({ url }) {
    const response = await fetch(url).then(response => response.text()).then(json => {
        var load = cheerio.load(json);
        const currentDirectory = process.cwd();

        // Genera un string que deseas guardar en el archivo
        const contentToWrite = json

        // Define la ruta completa del archivo
        const filePath = path.join(currentDirectory, 'archivo.txt');

        // Escribe el contenido en el archivo
        fs.writeFileSync(filePath, contentToWrite);
        return load
    })



}

export async function jkanimeSearch({ nombreAnime }) {
    var title_ = nombreAnime.replace(/ /g, '_')

    var url = 'https://jkanime.net/buscar/' + title_ + '/1/?filtro=nombre&tipo=none&estado=none&orden=desc'
    var doc = await fetch(url).then(response => response.text()).then(json => {
        var load = cheerio.load(json);
        return load
    })
    const ulElement = doc('.anime__item');
    const links = ulElement.find('a');

    var resultados = []

    links.each((index, element) => {
        const $element = doc(element);
        const href = $element.attr('href');
        resultados.push(href)
    })

    await jkGetChapter({ url: resultados[0] })
}


export async function MonosChinosanimeInfo({ titleAnime }) {
    try {
        var titulo_filtrado = await titleFilter({ titleAnime: titleAnime })
        var buscarMonosCHinos = urlApi + "/anime/monoschinos/filter?title=" + titulo_filtrado

        var resultBusqueda = await fetch(buscarMonosCHinos, { cache: 'no-store' })
        const rutaBusqueda = await resultBusqueda.json()

        var request = urlApi + rutaBusqueda.results[0].url
        var result = await fetch(request, { cache: 'no-store' })
        const id = await result.json();
        return (id);
    }
    catch {
        return (null)
    }

}


export async function animeFLVanimeInfo({ nombreAnime }) {
    try {
        var titulo_filtrado = await titleFilter({ titleAnime: nombreAnime })

        var requestBusqueda = urlApi + "/anime/flv/filter?title=" + titulo_filtrado

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
            var resultados = await MonosChinosanimeInfo({ titleAnime: nombreAnime })
            if (resultados === null) {

            }
            else {
                resultadosFinal.push({
                    'nombre': fuente,
                    resultados
                })
            }


        }
        else if (fuente == 'animeFlv') {
            var resultados = await animeFLVanimeInfo({ nombreAnime })
            if (resultados === null) {

            }
            else {
                resultadosFinal.push({
                    'nombre': fuente,
                    resultados
                })
            }
        }
        else if (fuente == 'jkanime') {
            var resultados = await jkanimeSearch({ nombreAnime })

        }
    }
    for await (const fuente of fuentes) {
        await buscaDorPorFuente(fuente.name)
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