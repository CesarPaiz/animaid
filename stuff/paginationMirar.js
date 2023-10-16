import Link from "next/link"
export default function PaginationMirar({ anime, captitulo }) {
        return (
            <Link href={{
                pathname: '/anime/mirar',
                query: {
                    anime: anime,
                    captitulo: parseInt(captitulo) + 1,
                }
            }}
            >
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Siguiente</button>
            </Link>
        )
}