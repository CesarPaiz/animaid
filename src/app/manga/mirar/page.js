import { mangaInfo } from "../../../../stuff/api";
import { mangaBuscar } from "../../../../stuff/api";
import { mangaCaptulo } from "../../../../stuff/api";
import { AniLisInfoID } from "../../../../stuff/anilist"
import { obtenerATF } from "../../../../stuff/buscarATF"
import MangaRPage from "./PaginationManga"
import { Suspense } from "react";

export default async function MirarMangaPage({ searchParams }) {

    function getUrlByNumber(jsonManga, targetNumber) {
        const matchingObject = jsonManga.find(obj => obj.number === targetNumber);
        return matchingObject ? matchingObject.url : null;
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

    var capitulo_a_ver = getUrlByNumber(resultado.chapters, cap)

    var final = await mangaCaptulo({ nombreManga: capitulo_a_ver })
    return (
        <>
            <div className="mt-8 text-white flex flex-col justify-center  place-items-center">
                <h1 className="text-2xl mt-5 text-white ">{result.data.Media.title.romaji ?? result.data.Media.title.english}</h1>
               <span className="mt-4 ml-4 line-clamp-6">capitol {cap}</span>
                <MangaRPage idM={searchParams.id} capitulo={cap} />

                <Suspense fallback={<span className='flex justify-center ml-4 mr-4 align-center text-2xl mt-8 text-white'>Loading...</span>}>
                    {final?.images.map(item => (
                        <img key={item} className="md:max-w-xl w-full " src={item.image}></img>
                    ))}
                </Suspense>
                <MangaRPage idM={searchParams.id} capitulo={cap} />
            </div>
        </>
    )
}