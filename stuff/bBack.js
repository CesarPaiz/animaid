import Link from "next/link"
export default function Bback({
    actual,
}) {
    var actualFix = parseInt(actual)
    if (actualFix < 2) {
        <Link href={{
            pathname: '/tendencia',
            query: {
                pagina: actualFix
            }
        }}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Anterior</button>
        </Link>
    }
    else {
        return (
            <Link href={{
                pathname: '/tendencia',
                query: {
                    pagina: actualFix - 1
                }
            }}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Anterior</button>
            </Link>
        )
    }
}