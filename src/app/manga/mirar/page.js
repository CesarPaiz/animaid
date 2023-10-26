import { mangaInfo } from "../../../../stuff/api";
import { mangaBuscar } from "../../../../stuff/api";
import { mangaCaptulo } from "../../../../stuff/api";
import { AniLisInfoID } from "../../../../stuff/anilist"
import { obtenerATF } from "../../../../stuff/buscarATF"
import MangaRPage from "./PaginationManga"
import { Suspense } from "react";

export default async function MirarMangaPage({ searchParams }) {

    function getUrlByNumber(jsonManga, targetNumber) {
        for (let i = 0; i < jsonManga.length; i++) {
            if (jsonManga[i].number === targetNumber) {
                return i
            }
        }
    }



    var result = await AniLisInfoID({ id: searchParams.id })
    var cap = searchParams.captitulo
    var description = result.data.Media.description
    var tags = result.data.Media.tags.category
    var descriptionFix = description.replace(/(<([^>]+)>)/gi, "")
    var title = result.data.Media.title.romaji
    let titleFixPar1 = title.replace(/[^a-zA-Z0-9\s-×]/g, '');
    var titleFix = titleFixPar1.replace(/\s+/g, '-');
    var buscar = await mangaBuscar({ nombreManga: titleFix });
    var resultado = await mangaInfo({ nombreManga: buscar })


    var capituloBuscar = getUrlByNumber(resultado.chapters, cap)

    var capitulo_a_ver = resultado.chapters[capituloBuscar].url

    try {
        var nexCap = resultado.chapters[capituloBuscar - 1].number
    }
    catch {
        var nexCap = null
    }
    try {
        var backCap = resultado.chapters[capituloBuscar + 1].number
    }
    catch {
        var backCap = null
    }



    var final = await mangaCaptulo({ nombreManga: capitulo_a_ver })
    return (
        <>
            <head>

                <title>AniMaid - {title}</title>

            </head>
            <div className="mt-8 text-white flex flex-col justify-center  place-items-center">
                <h1 className="text-2xl mt-5 text-white ">{result.data.Media.title.romaji ?? result.data.Media.title.english}</h1>
                <span className="mt-4 ml-4 line-clamp-6">capitol {cap}</span>
                <MangaRPage idM={searchParams.id} capitulo={cap} nextCap={nexCap} backCap={backCap} />

                <Suspense fallback={<span className='flex justify-center ml-4 mr-4 align-center text-2xl mt-8 text-white'>Loading...</span>}>
                    {final?.images.map(item => (
                        <img key={item} className="md:max-w-xl w-full " src={item.image}></img>
                    ))}
                </Suspense>
                <MangaRPage idM={searchParams.id} capitulo={cap} nextCap={nexCap} />
            </div>
        </>
    )
}