import Link from "next/link"
export default function Bnext({
    actual,
}) {
    var actualFix = parseInt(actual)
    return (
        <Link href={{
            pathname: '/tendencia',
            query: {
                pagina: actualFix + 1
            }
        }}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Siguiente</button>
        </Link>
    )

}