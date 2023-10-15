'use client'
import PaginationMirar from "../../../../stuff/paginationMirar"
import { useState } from "react"
export default function VideoIframe({ jsonVideos, parametros }) {

    const [fuente, setFuente] = useState("")



    return (
        <>
            <div className="flex flex-row justify-center mt-6 ">
                {jsonVideos.map(item => (

                    <button key={item.url} onClick={() => setFuente(item.url)} className=" justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4">{item.name}</button>

                ))}
            </div>
            <div className="text-white grid justify-center text-center ">
                <div key={fuente} className="flex align-center justify-center w-full h-full max-w-2xl max-h-2xl mt-4 rounded">
                    {fuente !== "" &&
                        <iframe className="w-full h-full" src={fuente} allowFullScreen></iframe>

                    }
                    {fuente === "" &&
                        <span className="text-2xl w-full h-full">Selecciona un video</span>

                    }
                </div>

                <div className="flex align-center justify-center mt-4 rounded">
                    <PaginationMirar anime={parametros.id} captitulo={parametros.captitulo} resultado={parametros.resultado} />
                </div>

            </div >


        </>
    )
}

