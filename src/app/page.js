import Link from "next/link"
import Image from "next/image"
import { AniListTendencia } from "../../stuff/anilist"
import PaginationMain from "../../stuff/pagination"
import { AniListPopular } from "../../stuff/anilist"
import Cookies from 'js-cookie';





export default async function Main({
    searchParams,
}) {
    const data = await AniListPopular({ pagina: 1 })

    return (
        <>
            <h1 className="text-2xl mt-5 text-white text-center">Los animes mas populares</h1>

            <div className="max-w-full ml-8 mr-8 mx-auto grid gap-6 grid-cols-2 md:grid-cols-6 mt-8 rounded overflow-hidden shadow-lg">
                {
                    data?.data.Page.media.map(item => (


                        <div key={item} className="max-w-sm mx-auto bg-gray-800 rounded overflow-hidden shadow-lg mb-8">
                            <Link href={{
                                pathname: '/anime',
                                query: {
                                    id: item.id,
                                }
                            }}>
                                <div style={{ width: '185px', height: '300px', position: 'relative' }}>
                                    <Image
                                        src={item.coverImage.large}
                                        layout="fill"
                                        style={{ objectFit: 'cover' }} 
                                    />
                                    <div className=" w-full absolute inset-0 text-white bg-black bg-opacity-40 hover:bg-opacity-0 flex items-end justify-center ">
                                        <h2 className=" text-base font-bold  truncate">{item.title.romaji ?? item.title.english}</h2>
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
