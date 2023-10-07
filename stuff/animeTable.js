import Image from 'next/image'
import { AniListSearch } from './anilist.js'
import Link from 'next/link.js'



export default async function AnimeTable({ nombreAnime }) {
    const data = await AniListSearch(nombreAnime = { nombreAnime })
    return (
        <>
            <div className="max-w-full ml-8 mr-8 mx-auto grid grid-cols-2 md:grid-cols-6 gap-6 mt-8 rounded overflow-hidden shadow-lg">
                {
                    data?.data.Page.media.map(item => (


                        <div key={item} className="max-w-sm mx-auto bg-gray-800 rounded overflow-hidden shadow-lg">
                            <Link href={{
                                pathname: '/anime',
                                query: {
                                    id: item.id,
                                }
                            }}>
                                <div className="relative">
                                    <img className="w-auto h-64 object-cover   " src={item.coverImage.large} alt="Descripción de la imagen" />
                                    <div className=" w-full absolute inset-0 text-white bg-black bg-opacity-40 hover:bg-opacity-0 flex items-end justify-center ">
                                        <h2 className=" text-base font-bold  truncate">{item.title.english ?? item.title.romaji}</h2>
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
