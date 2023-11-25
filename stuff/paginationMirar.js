import Link from "next/link"
export default function PaginationMirar({ anime, captitulo, cantidad ,fuente }) {
    var cantidadCaps = parseInt(cantidad.length)
    var numeroCapFinal = parseInt(String(cantidad[cantidadCaps - 1].number).match(/\d+/)[0])

    var numeroCapIncial = parseInt(String(cantidad[0].number).match(/\d+/)[0])
    if(numeroCapFinal < numeroCapIncial){
        var capsInicialFinal = numeroCapIncial
        var capsicialIncial = numeroCapFinal
    }
    else{
        var capsInicialFinal = numeroCapFinal
        var capsicialIncial = numeroCapIncial
    }

    var cap = parseInt(captitulo)
    
    return (
        <>
            {cap > capsicialIncial && (
                <Link prefetch={false} href={{
                    pathname: '/anime/' + anime + '/' + parseInt(cap - 1),
                    query: {
                        fuente: fuente
                    }
                }}
                >
                    <button className="bg-blue-700 hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-full">Anterior</button>
                </Link>
            )}
            <Link prefetch={false} href={{
                pathname: '/anime/' + anime + '/'
            }}
            >
                <button class="bg-blue-700 hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-full"> Capitulos </button>
            </Link>



            {cap < capsInicialFinal && (
                <Link href={{
                    pathname: '/anime/' + anime + '/' + parseInt(cap + 1),
                    query: {
                        fuente: fuente
                    }
                }}
                >
                    <button className="bg-blue-700 hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-full">Siguiente</button>
                </Link>
            )
            }


        </>
    )
}