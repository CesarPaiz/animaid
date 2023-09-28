import Link from "next/link";

export default function NexResultButtons({ item , resultado}) {
    var resultadoFix = parseInt(resultado) + 1
    return(
        <Link href={{
            pathname: '/anime',
            query: {
                id: item,
                resultado: resultadoFix
            }
        }}>
            <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Mal resultado?</span>
        </Link>
    )
}