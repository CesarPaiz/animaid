import { mangaInfo } from "../../../stuff/api";
import { mangaBuscar } from "../../../stuff/api";
import { AniLisInfoID } from "../../../stuff/anilist"
import { getAnimeID } from "../../../stuff/api";
import { animeInfo } from "../../../stuff/api";
import Link from "next/link";
import { obtenerATF } from "../../../stuff/buscarATF"
import Image from "next/image";

export default async function MangaPage({ searchParams }) {
    var result = await AniLisInfoID({ id: searchParams.id })
    var description = result.data.Media.description
    var tags = result.data.Media.tags.category
    var descriptionFix = description.replace(/(<([^>]+)>)/gi, "")
    var title = result.data.Media.title.romaji
    let titleFixPar1 = title.replace(/[^a-zA-Z0-9\s-×]/g, '');
    var titleFix = titleFixPar1.replace(/\s+/g, '+').toLowerCase();
    var buscar = await mangaBuscar({ nombreManga: titleFix });
    var resultado = await mangaInfo({ nombreManga: buscar })
    return (
        <>
            <head>

                <title>AniMaid - {title}</title>

            </head>
            <div className="text-white flex flex-col justify-center  place-items-center">
                <h1 className="text-2xl mt-5 text-white ">{result.data.Media.title.romaji ?? result.data.Media.title.english}</h1>
                <div className="flex md:flex-row flex-col align-center justify-center mt-6 mb-6 place-items-center">
                    <div className=" flex md:align-center justify-center text-center items-center  " style={{ width: '200px', height: '300px', position: 'relative' }} >
                        <Image
                            src={result.data.Media.coverImage.large}
                            fill
                            style={{ objectFit: 'cover' }}

                        />

                    </div>
                    <div className=" max-w-2xl">
                        <span className="mt-4 ml-4 line-clamp-6">{descriptionFix}</span>
                    </div>
                </div>
                <div className="text-white flex flex-col justify-center  place-items-center mt-8 place-items-center">
                    {resultado?.chapters.map(item => (
                        <Link href={{
                            pathname: '/manga/mirar',
                            query: {
                                id: searchParams.id,
                                captitulo: item.number,
                            }
                        }}
                            key={item.number} className="mb-4 bg-slate-800 rounded-full px-4 grid justify-center text-center text-white" > {title}
                            <span>{item.number}</span>
                        </Link>
                    ))}
                </div>

            </div >
        </>
    )

}