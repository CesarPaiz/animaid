import Link from "next/link"
export default function Bback({
    actual,
}) {
    var actualFix = parseInt(actual)
    if (actualFix === 0) {
        
    }
    else {
        return (
            <Link href={{
                pathname: '/tendencia',
                query: {
                    pagina: actualFix - 1
                }
            }}>
                <div className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4 ">Anterior</div>
            </Link>
        )
    }
}