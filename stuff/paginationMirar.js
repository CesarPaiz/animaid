import Link from "next/link"
export default function PaginationMirar({ anime, captitulo, cantidad }) {
    console.log(anime, captitulo, cantidad)
    var cantidadCaps = parseInt(cantidad.length)
    var numeroCapFinal = parseInt(cantidad[cantidadCaps - 1].number)

    var numeroCapIncial = parseInt(cantidad[0].number)
    var cap = parseInt(captitulo)

    return (
        <>
            {cap > numeroCapIncial && (
                <Link href={{
                    pathname: '/anime/mirar',
                    query: {
                        id: anime,
                        captitulo: parseInt(captitulo) - 1,
                    }
                }}
                >
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Anterior</button>
                </Link>
            )}



            {cap < numeroCapFinal && (
                <Link href={{
                    pathname: '/anime/mirar',
                    query: {
                        id: anime,
                        captitulo: parseInt(captitulo) + 1,
                    }
                }}
                >
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Siguiente</button>
                </Link>
            )}


        </>
    )
}