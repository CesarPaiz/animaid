import cheerio from 'cheerio';


export async function mangaScrapSearch({ nombreManga }) {
    var url = 'https://mangapanda.in/search?q=' + nombreManga
    var doc = await fetch(url).then(response => response.text()).then(json => {
        var load = cheerio.load(json);
        return load
    })
    const ulElement = doc('.media-body');
    const links = ulElement.find('a');

    var resultados = []

    links.each((index, element) => {
        const $element = doc(element);
        const href = $element.attr('href');
        resultados.push(href)
    })

    return (resultados[0])
}





export async function mangaScrapInfo({ url }) {
    var doc = await fetch(url).then(response => response.text()).then(json => {
        var load = cheerio.load(json);
        return load
    })
    const ulElement = doc('.chapter-list');
    const links = ulElement.find('a');

    const linkData = [];

    links.each((index, element) => {
        const $element = doc(element);
        const href = $element.attr('href');
        var digitos = href.match(/\d+(\.\d+)?$/);
        var reultado = digitos[0]
        linkData.push({ reultado, href });
    });

    return (linkData)

}
export async function getCapImages({ url }) {

    var doc = await fetch(url).then(response => response.text()).then(json => {
        var load = cheerio.load(json);
        return load
    })
    const arrayDataElement = doc('#arraydata');

    const dataArray = arrayDataElement.text().split(',').map(item => item.trim());

    return dataArray
}