import Link from "next/link"
import AnimeTable from "../../stuff/animeTable"
import { AniListTendencia } from "../../stuff/anilist"
import PaginationMain from "../../stuff/pagination"

export default async function Main({
    searchParams,
}) {
    var paginaN = searchParams.pagina ?? 1
    const data = await AniListTendencia({ pagina: paginaN })

    return (
        <>
            <div className="max-w-full ml-8 mr-8 mx-auto grid grid-cols-2 gap-6 md:grid-cols-6 mt-8 rounded overflow-hidden shadow-lg">
                {
                    data?.data.Page.media.map(item => (


                        <div key={item} className="max-w-sm mx-auto bg-gray-800 rounded overflow-hidden shadow-lg">
                            <Link href={{
                                pathname: '/anime',
                                query: {
                                    id: item.id,
                                    resultado: 0
                                }
                            }}>
                                <div className="relative">
                                    <img className="w-auto h-64 object-cover   " src={item.coverImage.large} alt="Descripción de la imagen" />
                                    <div className=" w-full absolute inset-0 text-white bg-black bg-opacity-50 hover:bg-opacity-0 flex items-end justify-center ">
                                        <h2 className=" text-base font-bold  truncate">{item.title.english ?? item.title.romaji}</h2>
                                    </div>
                                </div>



                            </Link>

                        </div>
                    ))
                }

            </div>
            <PaginationMain paginaQ={paginaN} />

        </>

    )
}
