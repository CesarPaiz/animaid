import Link from "next/link";

export default function MirarButtons(){
    return(
        <Link href={{
            pathname: '/view/mirar',
            query: {
                
            }
        }}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Mirar</button>
        </Link>
    )
}