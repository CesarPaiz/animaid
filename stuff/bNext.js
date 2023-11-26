import Link from "next/link"
export default function Bnext({
    actual,
}) {
    var actualFix = parseInt(actual)
    return (

        <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4">
            <Link href={{
                pathname: '/tendencia',
                query: {
                    pagina: actualFix + 1
                }
            }}>
                Siguiente
            </Link>
        </div>

    )

}