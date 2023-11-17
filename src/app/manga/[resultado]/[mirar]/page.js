
import { AniLisInfoID } from "../../../../../stuff/anilist"
import { Suspense } from "react";
import { mangaScrapSearch, mangaScrapInfo, getCapImages } from "../../../../../stuff/mangaScrap";
import MangaRPage from "./PaginationManga";


export default async function MirarMangaPage({
    params: { resultado },
    params: { mirar },
}) {

    function getUrlByNumber(jsonManga, targetNumber) {
        for (let i = 0; i < jsonManga.length; i++) {
            if (jsonManga[i].reultado === targetNumber) {
                return [
                    i,
                    jsonManga[i].href
                ]
            }
        }
    }

    var result = await AniLisInfoID({ id: resultado })
    var description = result.data.Media.description
    var tags = result.data.Media.tags.category
    var descriptionFix = description.replace(/(<([^>]+)>)/gi, "")

    var title = result.data.Media.title.romaji
    var titleFixPar2 = title.replace(/\s+/g, '+').toLowerCase().replace(/[.,]/g, '');

    var busqueda = await mangaScrapSearch({ nombreManga: titleFixPar2 })
    var capitulos = await mangaScrapInfo({ url: busqueda })

    const capitulo_a_ver = getUrlByNumber(capitulos, mirar)
    try {
        var capSiguiente = capitulos[capitulo_a_ver[0] - 1].reultado
    }
    catch {
        var capSiguiente = undefined
    }
    try {
        var capAnterior = capitulos[capitulo_a_ver[0] + 1].reultado
    }
    catch {
        var capAnterior = undefined
    }


    const imagenes = await getCapImages({ url: capitulos[capitulo_a_ver[0]].href })



    return (
        <>

            <div className="mt-8 text-white flex flex-col justify-center  place-items-center">
                <h1 className="text-2xl mt-5 text-white ">{result.data.Media.title.romaji ?? result.data.Media.title.english}</h1>
                <span className="mt-4 ml-4 line-clamp-6">capitol {mirar}</span>
                <MangaRPage idM={resultado} capitulo={mirar} nextCap={capSiguiente} backCap={capAnterior} />

                <Suspense fallback={<span className='flex justify-center ml-4 mr-4 align-center text-2xl mt-8 text-white'>Loading...</span>}>
                    {imagenes.map(item => (
                        <img key={item} className="md:max-w-xl w-full " src={item}></img>
                    ))}
                </Suspense>
                <MangaRPage idM={resultado} capitulo={mirar} nextCap={capSiguiente} backCap={capAnterior} />
            </div>
        </>
    )
}