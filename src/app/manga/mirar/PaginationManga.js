import Link from "next/link"
export default async function MangaRPage({
    idM,
    capitulo,
}) {
    var capito = parseInt(capitulo)
    var idManga = parseInt(idM)
    return (
        <div className="flex flex-row gap-4 item-align-center justify-center mt-8 mb-4">
            <Link href={{
                pathname: '/manga/mirar',
                query: {
                    id: idManga,
                    captitulo: capito - 1,
                }
            }}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"> Anterior </button>
            </Link>
            <Link href={{
                pathname: '/manga/mirar',
                query: {
                    id: idManga,
                    captitulo: capito + 1,
                }
            }}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"> Siguiente </button>
            </Link>
        </div>
    )

}