import Link from "next/link"
import AnimeTable from "../../stuff/animeTable"
import { AniListTendencia } from "../../stuff/anilist"
import PaginationMain from "../../stuff/pagination"

export default async function Main({
    searchParams,
}) {
    var paginaN = searchParams.pagina ?? 1
    const data = await AniListTendencia({ pagina: paginaN })
    return (
        <>
            <table className="flex justify-center mt-4 text-white border-spacing-2 place-items-center ">
                <tbody>
                    {
                        data?.data.Page.media.map(item => (

                            <tr key={item}>
                                <td className="w-20 mr-4">
                                    <Link href={{
                                        pathname: '/anime',
                                        query: {
                                            id: item.id,
                                            resultado: 0
                                        }
                                    }}>
                                        <img src={item.coverImage.medium} height={90} width={90} className="rounded mb-4 bg-slate-800" alt="logo" />
                                    </Link>
                                </td>
                                <td key={item} className="place-items-center ml-4 max-w-2xl ">
                                    <Link href={{
                                        pathname: '/anime',
                                        query: {
                                            id: item.id,
                                            resultado: 0
                                        }
                                    }}>
                                        <span className="ml-4 align-left grid">
                                            <span className="">{item.title.english ?? item.title.romaji} </span>
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
