import Link from "next/link"
import Image from "next/image"
import { AniListTendencia } from "../../stuff/anilist"
import PaginationMain from "../../stuff/pagination"
import { AniListPopular } from "../../stuff/anilist"
import { Suspense } from "react"




export default async function Main({
    searchParams,
}) {
    const data = await AniListPopular({ pagina: 1 })
    console.log(data.data.Page.media.type)
    return (
        <>
            <h1 className="text-2xl mt-5 text-white text-center">Los animes mas populares</h1>

            <div className="max-w-full md:ml-8 md:mr-8 ml-4 mr-4  mx-auto grid gap-6 grid-cols-2 md:grid-cols-6 mt-8 rounded overflow-hidden shadow-lg">
                {
                    data?.data.Page.media.map(item => (


                        <div key={item} className="max-w-sm mx-auto bg-gray-800 rounded overflow-hidden shadow-lg mb-8">
                            <Link href={{
                                pathname: '/' + item.type.toLowerCase(),
                                query: {
                                    id: item.id,
                                }
                            }}>
                                <div style={{ width: '175px', height: '300px', position: 'relative' }}>
                                <Suspense fallback={<span className='flex justify-center align-center text-2xl mt-8 text-white'>Loading...</span>}>
                                        <Image
                                            src={item.coverImage.large}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </Suspense>
                                    <div className="absolute inset-0">
                                        <div className=" w-full  relative  text-white bg-black bg-opacity-80  flex items-end justify-center ">
                                            <h2 className=" text-base font-bold  truncate">{item.title.romaji ?? item.title.english}</h2>

                                        </div>
                                        <div className=" w-full absolute  text-white bg-black bg-opacity-80 flex bottom-0 justify-center ">
                                            <span className="text-white">Estado : {item.status}</span>
                                        </div>
                                    </div>

                                </div>



                            </Link>

                        </div>
                    ))
                }

            </div>
        </>

    )
}
