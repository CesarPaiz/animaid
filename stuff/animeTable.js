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


                        <div key={item} className="max-w-sm mx-auto bg-gray-800 rounded overflow-hidden shadow-lg mb-8">
                            <Link href={{
                                pathname: '/anime',
                                query: {
                                    id: item.id,
                                }
                            }}>
                                <div style={{ width: '175px', height: '300px', position: 'relative' }}>
                                    <Image
                                        src={item.coverImage.large}
                                        layout="fill"
                                        style={{ objectFit: 'cover' }}
                                    />
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
