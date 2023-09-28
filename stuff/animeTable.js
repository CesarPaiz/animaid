import Image from 'next/image'
import { AniListSearch } from './anilist.js'
import Link from 'next/link.js'



export default async function AnimeTable({ nombreAnime }) {
    const data = await AniListSearch(nombreAnime = { nombreAnime })
    return (
        <>
            <table className="text-white border-spacing-2 mt-4 flex justify-center">
                <tbody>
                {
                        data?.data.Page.media.map(item => (

                            <tr >
                                <td key={item} className="w-20">
                                    <Link  href={{
                                        pathname: '/anime',
                                        query: {
                                            id: item.id,
                                            resultado: 0
                                        }
                                    }}>
                                        <img src={item.coverImage.medium} height={90} width={90} className="rounded mb-4  bg-slate-800" alt="logo" />
                                    </Link>
                                </td>
                                <td key={item} className=' max-w-4xl'>
                                    <Link href={{
                                        pathname: '/anime',
                                        query: {
                                            id: item.id,
                                            resultado: 0
                                        }
                                    }}>
                                        <span className="ml-4 align-left grid ">
                                            <span className=''>{item.title.english ?? item.title.romaji} </span>
                                        </span>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>

        </>
    )
}