'use client'

import Link from "next/link"
import { useState } from "react"
import { AniListTendencia } from "../../../stuff/anilist"


export default async function Main() {
    var [pagina, setPagina] = useState(0)

    const data = await AniListTendencia({ pagina: pagina })
    return (
        <>
            <div className="max-w-full ml-8 mr-8 mx-auto grid grid-cols-2 md:grid-cols-6 gap-6 mt-8 rounded overflow-hidden shadow-lg">
                {
                    data?.data.Page.media.map(item => (


                        <div key={item} className="max-w-sm mx-auto bg-gray-800 rounded overflow-hidden shadow-lg">
                            <Link href={{
                                pathname: '/anime',
                                query: {
                                    id: item.id,
                                }
                            }}>
                                <div className="relative">
                                    <img className="w-auto h-64 object-cover   " src={item.coverImage.large} alt="Descripción de la imagen" />
                                    <div className=" w-full absolute inset-0 text-white bg-black bg-opacity-40 hover:bg-opacity-0 flex items-end justify-center ">
                                        <h2 className=" text-base font-bold  truncate">{item.title.romaji ?? item.title.english}</h2>
                                    </div>
                                </div>

                            </Link>

                        </div>
                    ))
                }

            </div>
            <div className="flex justify-center mt-4 mb-4" >
                <button onClick={() => setPagina(pagina - 1)} className="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-1 md:px-4 rounded-full">Anterior</button>
                <button onClick={() => setPagina(pagina + 1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-1 md:px-4 rounded-full">Siguiente</button>
            </div>

        </>

    )
}
