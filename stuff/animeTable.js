import Image from 'next/image'
import { AniListSearch } from './anilist.js'
import Link from 'next/link.js'
import { Suspense } from 'react'
import { Span } from 'next/dist/trace/trace.js'



export default async function AnimeTable({ nombreAnime }) {
    const data = await AniListSearch(nombreAnime = { nombreAnime })
    return (
        <>

            <div className="max-w-full md:ml-8 md:mr-8 ml-4 mr-4 mx-auto grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 gap-6 mt-8 rounded overflow-hidden shadow-lg">
                {
                    data?.data.Page.media.map(item => (


                        <div key={item} className="max-w-sm mx-auto bg-gray-800 rounded overflow-hidden shadow-lg mb-8">
                            <Link href={{
                                pathname: '/' + item.type.toLowerCase() + '/' + item.id
                            }}>

                                <div style={{ width: '175px', height: '300px', position: 'relative' }}>
                                    <Suspense fallback={<span className='flex justify-center align-center text-2xl mt-8 text-white'>Loading...</span>}>
                                        <Image
                                            unoptimized
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
                                            <span className="text-white">{item.type}</span>
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
