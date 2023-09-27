import Link from "next/link"
export default function PaginationMirar({ anime, captitulo, maxCaptitulo , resultado}) {
    var resultadoFix = parseInt(resultado)
    if (parseInt(captitulo) === 1) {
        return (
            <Link href={{
                pathname: '/anime/mirar',
                query: {
                    anime: anime,
                    captitulo: parseInt(captitulo) + 1,
                    resultado: resultadoFix
                }
            }}
            >
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Siguiente</button>
            </Link>
        )
    }
    else if (parseInt(captitulo) === maxCaptitulo) {
        return (
            <Link href={{
                pathname: '/anime/mirar',
                query: {
                    anime: anime,
                    captitulo: parseInt(captitulo) - 1,
                    resultado: resultadoFix
                }
            }}
            >
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Anterior</button>
            </Link>
        )
    }
    else {
        return (
            <>
                <Link href={{
                    pathname: '/anime/mirar',
                    query: {
                        anime: anime,
                        captitulo: parseInt(captitulo) - 1,
                        resultado: resultadoFix

                    }
                }}
                >
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Anterior</button>
                </Link>                <Link href={{
                    pathname: '/anime/mirar',
                    query: {
                        anime: anime,
                        captitulo: parseInt(captitulo) + 1,
                        resultado: resultadoFix
                    }
                }}
                >
                    <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Siguiente</button>
                </Link>
            </>
        )
    }

}