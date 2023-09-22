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
                                <td className="w-20">
                                    <Link key={item.id} href={{
                                        pathname: '/view',
                                        query: {
                                            query: item.id
                                        }
                                    }}>
                                        <img src={item.coverImage.medium} height={90} width={90} className="rounded mb-4  bg-slate-800" alt="logo" />
                                    </Link>
                                </td>
                                <td className=' max-w-4xl'>
                                    <Link key={item.id} href={{
                                        pathname: '/view',
                                        query: {
                                            query: item.id
                                        }
                                    }}>
                                        <span className="align-center flex ">
                                            <span className='w-full h-full ml-4'>{item.title.romaji} </span>
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