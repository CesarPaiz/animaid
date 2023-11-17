import { mangaInfo } from "../../../../stuff/api";
import { mangaBuscar } from "../../../../stuff/api";
import { AniLisInfoID } from "../../../../stuff/anilist"
import Link from "next/link";
import Image from "next/image";
import { mangaScrapSearch, mangaScrapInfo } from "../../../../stuff/mangaScrap";

export default async function MangaPage({
    params: { resultado },
}) {

    var result = await AniLisInfoID({ id: resultado })
    var description = result.data.Media.description
    var descriptionFix = description.replace(/(<([^>]+)>)/gi, "")

    var title = result.data.Media.title.romaji
    var titleFixPar2 = title.replace(/\s+/g, '+').toLowerCase().replace(/[.,]/g, '');
    const nameDirect = 'https://leermanga.net/manga/' + title.replace(/[^a-zA-Z\s]/g, '').replace(/\s/g, '-');

    try {
        var busqueda = await mangaScrapSearch({ nombreManga: titleFixPar2 })

        var capitulos = await mangaScrapInfo({ url: busqueda })
    }
    catch {
        var capitulos = []
        var noEncontrado = true
    }



    return (
        <>

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
                    {capitulos.map(item => (
                        <Link href={{
                            pathname: '/manga/' + resultado + '/' + item.reultado,

                        }}
                            key={item.reultado} className="mb-4 bg-slate-800 rounded-full px-4 grid justify-center text-center text-white" > {title}
                            <span>{item.reultado}</span>
                        </Link>
                    ))}
                    {noEncontrado && (
                        <span className="mt-4 ml-4 line-clamp-6">No se encontraron capitulos</span>
                    )}
                </div>

            </div >
        </>
    )

}