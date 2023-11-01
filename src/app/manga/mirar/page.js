import { mangaInfo } from "../../../../stuff/api";
import { mangaBuscar } from "../../../../stuff/api";
import { mangaCaptulo } from "../../../../stuff/api";
import { AniLisInfoID } from "../../../../stuff/anilist"
import { obtenerATF } from "../../../../stuff/buscarATF"
import MangaRPage from "./PaginationManga"
import { Suspense } from "react";
import { searchManga } from 'mangakakalot-scrapper'
import {mangaScrapSearch , mangaScrapInfo , getCapImages} from "../../../../stuff/mangaScrap";



export default async function MirarMangaPage({ searchParams }) {

    function getUrlByNumber(jsonManga, targetNumber) {
        for (let i = 0; i < jsonManga.length; i++) {
            if (jsonManga[i].chapterNumber === targetNumber) {
                return i
            }
        }
    }

    var result = await AniLisInfoID({ id: searchParams.id })
    var cap = searchParams.captitulo
    var description = result.data.Media.description
    var tags = result.data.Media.tags.category
    var descriptionFix = description.replace(/(<([^>]+)>)/gi, "")
    var title = result.data.Media.title.english
    let titleFixPar1 = title.replace(/[^a-zA-Z0-9\s-×]/g, '');
    var titleFix = titleFixPar1.replace(/\s+/g, '_').toLowerCase();

    var busqueda = await mangaScrapSearch({ nombreManga: titleFix })
    
    var capitulos = await mangaScrapInfo({ url: busqueda })

    const capitulo_a_ver = getUrlByNumber(capitulos, cap)

    const imagenes = await getCapImages({ url: capitulos[capitulo_a_ver].href })

    

    return (
        <>

            <div className="mt-8 text-white flex flex-col justify-center  place-items-center">
                <h1 className="text-2xl mt-5 text-white ">{result.data.Media.title.romaji ?? result.data.Media.title.english}</h1>
                <span className="mt-4 ml-4 line-clamp-6">capitol {cap}</span>

                <Suspense fallback={<span className='flex justify-center ml-4 mr-4 align-center text-2xl mt-8 text-white'>Loading...</span>}>
                    {imagenes.map(item => (
                        <img key={item} className="md:max-w-xl w-full " src={item}></img>
                    ))}
                </Suspense>
            </div>
        </>
    )
}