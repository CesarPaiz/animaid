var cheerio = require('cheerio');

export async function mangaScrapSearch({ nombreManga }) {

    var url = "https://manganato.com/search/story/" + nombreManga


    var doc = await fetch(url).then(response => response.text()).then(json => {
        const html = cheerio.load(json)
        return html

    })


    var resultados = []
    doc('.search-story-item').each((index, element) => {
        const firstAnchor = doc(element).find('a').first();
        const href = firstAnchor.attr('href');
        resultados.push(href)
    });

    return (resultados[0])

}
export async function mangaScrapInfo({ url }) {
    var doc = await fetch(url).then(response => response.text()).then(json => {
        var load = cheerio.load(json);
        return load
    })
    const ulElement = doc('li');
    const links = ulElement.find('a');

    const linkData = [];

    links.each((index, element) => {
        const $element = doc(element);
        const href = $element.attr('href');
        const url = href;
        const regex = /chapter-(\d+(\.\d+)?)/; // Expresión regular para buscar "chapter" seguido de números y un punto opcional
        
        const match = url.match(regex);
        const chapterNumber = match[1];
        
        // Crea un objeto JSON con el texto y el href y agrégalo al array
        linkData.push({ chapterNumber, href });
      });
    return (linkData)
}
export async function getCapImages({ url }) {
    var doc = await fetch(url).then(response => response.text()).then(json => {
        var load = cheerio.load(json);
        return load
    })
    const imgHtml = doc('img');
    const imgSrc = imgHtml.attr('src');

    const imgArray = []

    imgHtml.each((index, element) => {
        const $element = doc(element);
        const src = $element.attr('src');
        imgArray.push(src)
    })


    return (imgArray)

}