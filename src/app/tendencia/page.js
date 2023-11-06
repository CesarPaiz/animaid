import Link from "next/link"
import { AniListTendencia } from "../../../stuff/anilist"
import Image from "next/image"
import { Suspense } from "react"
import TendenciasPage from "./PaginationTendencias"
import Loading from "./loading"
import ImageAsync from "next/image"
export default async function Main({
    searchParams,
}) {

    const pagina = parseInt(searchParams.pag) ?? 1
    const data = await AniListTendencia({ pagina: pagina })
    return (
        <>
            <span className="flex justify-center align-center text-2xl mt-8 text-white text-center">Tendencias Pagina {pagina}</span>
            <div key={pagina} className="max-w-full md:ml-8 md:mr-8 ml-4 mr-4 mx-auto grid grid-cols-2 md:grid-cols-6 gap-6 mt-8 rounded overflow-hidden shadow-lg">
                {
                    data?.data.Page.media.map(item => (
                        <div key={item} className="max-w-sm mx-auto  bg-gray-800 rounded overflow-hidden shadow-lg">
                            <Link href={{
                                pathname: '/' + item.type.toLowerCase(),
                                query: {
                                    id: item.id,
                                }
                            }}>
                                <div style={{ width: '175px', height: '300px', position: 'relative' }}>
                                    <Suspense key={item.coverImage.large} fallback={<Loading />}>
                                        <Image
                                            src={item.coverImage.large}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            placeholder='blur'
                                            priority
                                            blurDataURL={item.coverImage.large}
                                        />
                                    </Suspense>
                                    <div className="absolute inset-0">
                                        <div className=" w-full  relative  text-white bg-black bg-opacity-80  flex items-end justify-center ">
                                            <h2 className=" text-base font-bold  truncate">{item.title.romaji ?? item.title.english}</h2>

                                        </div>
                                        <div className=" w-full absolute  text-white bg-black bg-opacity-80 flex bottom-0 justify-center ">
                                            <span className="text-white">{item.type}</span>
                                        </div>
                                    </div>
                                </div>

                            </Link>

                        </div>
                    ))
                }
            </div>

            <TendenciasPage pagina={pagina} />

        </>

    )
}