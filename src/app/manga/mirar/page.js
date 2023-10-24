import { mangaInfo } from "../../../../stuff/api";
import { mangaBuscar } from "../../../../stuff/api";
import { mangaCaptulo } from "../../../../stuff/api";
import { AniLisInfoID } from "../../../../stuff/anilist"
import Link from "next/link";
import { obtenerATF } from "../../../../stuff/buscarATF"

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
                {final?.images.map(item => (
                    <img key={item} className="max-w-xl ml-4 mr-4" src={item.image}></img>
                ))}
            </div>
        </>
    )
}