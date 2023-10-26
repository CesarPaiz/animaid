import Link from "next/link"
export default async function TendenciasPage({ pagina }) {

    var pag = parseInt(pagina)

    return (
        <>
            <div className="flex justify-center align-center place-self-center mt-4 gap-4 mb-4 place-items-center">
                {pag > 1 && (
                    <Link href={{
                        pathname: '/tendencia',
                        query: {
                            pag: pag - 1,
                        }

                    }}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full "> Anterior </button>

                    </Link>
                )}
                <Link href={{
                    pathname: '/tendencia',
                    query: {
                        pag: pag + 1,
                    }
                }}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full "> Siguiente </button>

                </Link>
            </div>
        </>
    )

}