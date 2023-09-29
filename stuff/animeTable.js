import Image from 'next/image'
import { AniListSearch } from './anilist.js'
import Link from 'next/link.js'



export default async function AnimeTable({ nombreAnime }) {
    const data = await AniListSearch(nombreAnime = { nombreAnime })
    return (
        <>
            <div className='mt-8  grid grid-cols-3 text-white gap-4 '>
                {

                    data?.data.Page.media.map(item => (

                        <div key={item} className="grid place-items-center">
                            <Link href={{
                                pathname: '/anime',
                                query: {
                                    id: item.id,
                                    resultado: 0
                                }
                            }}>
                                <img src={item.coverImage.medium} height={90} width={90} className="rounded mb-2 bg-slate-800" alt="logo" />

                            </Link><Link href={{
                                pathname: '/anime',
                                query: {
                                    id: item.id,
                                    resultado: 0
                                }
                            }}>
                                <span className="ml-4 ">
                                    <span className="">{item.title.english ?? item.title.romaji} </span>
                                </span>
                            </Link>

                        </div>


                    ))
                }
            </div>

        </>
    )
}
