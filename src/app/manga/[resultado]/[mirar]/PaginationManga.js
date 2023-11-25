import Link from "next/link"
export default async function MangaRPage({
    idM,
    capitulo,
    nextCap,
    backCap,
}) {

    return (

        <div className="flex flex-row gap-4 item-align-center justify-center mt-8 mb-4">
            {backCap !== undefined && (
                <Link prefetch={false} href={{
                    pathname: '/manga/' + idM + '/' + backCap,

                }}>
                    <button className="bg-cyan-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"> Anterior </button>
                </Link>
            )}
            <Link prefetch={false} href={{
                pathname: '/manga/' + idM + '/',

            }}>
                <button className="bg-cyan-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"> Capitulos </button>
            </Link>

            {nextCap !== undefined && (
                <Link prefetch={false} href={{
                    pathname: '/manga/' + idM + '/' + nextCap,

                }}>
                    <button className="bg-cyan-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"> Siguiente </button>
                </Link>
            )}
        </div>
    )

}