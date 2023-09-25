'use client'
import Link from "next/link"
import AnimeTable from "../../../stuff/animeTable"
import { AniListTendencia } from "../../../stuff/anilist"
import PaginationMain from "../../../stuff/pagination"
import Image from "next/image"

const imageLoader = ({ src }) => {
    return src
  }
export default async function Main({
    searchParams,
}) {
    var paginaN = searchParams.pagina ?? 1
    const data = await AniListTendencia({ pagina : paginaN })
    return (
        <>
            <table className="flex justify-center mt-4 text-white border-spacing-2">
                <tbody>
                    {
                        data?.data.Page.media.map(item => (

                            <tr key={item}>
                                <td className="w-20">
                                    <Link href={{
                                        pathname: '/anime',
                                        query: {
                                            query: item.id
                                        }
                                    }}>
                                        <Image loader={imageLoader} src={item.coverImage.medium} height={90} width={90} className="rounded mb-4 bg-slate-800" alt="logo" />
                                    </Link>
                                </td>
                                <td key={item}>
                                    <Link href={{
                                        pathname: '/anime',
                                        query: {
                                            query: item.id
                                        }
                                    }}>
                                        <span className="ml-4 ">
                                            <span>{item.title.romaji} </span>
                                        </span>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table >

            <PaginationMain paginaQ={paginaN} />

        </>

    )
}
