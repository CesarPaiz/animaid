'use client'

import { useState } from "react"
import Link from "next/link"
import { Tooltip } from "@nextui-org/react";
export default function CapViewer({ fuentes, anime, titulo }) {
    var multiFuente = fuentes
    const [fuente, setFuente] = useState(multiFuente[0])
    return (
        <div>
            <div className="flex justify-center align-center place-self-center mb-6">
                {multiFuente.map((fuente) => (
                    <Tooltip key={fuente.resultados} className="bg-gray-900 rounded-full outline-none text-white px-2" color="warning" content={'Cambiar fuente a ' + fuente.nombre} delay={100}>
                        <button onClick={() => setFuente(fuente)} className=" outline-none gap-2 mt-2 mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">{fuente.nombre}</button>
                    </Tooltip>
                ))}
            </div>
            <div>
                {
                    fuente?.resultados.episodes.map(item => (
                        <>
                            <Tooltip key={item.name} placement="right" className="bg-gray-900 rounded-full outline-none text-white px-6" color="warning" content={
                                <div className="">
                                    <div className="text-small font-bold">{item.name}</div>
                                    <div className="text-tiny">Fuente original 

                                    {fuente.nombre == 'monoschinos2' &&
                                        <a href="https://monoschinos2.com"> {fuente.nombre}</a>
                                    } 
                                    {fuente.nombre == 'animeFlv' &&
                                        <a href="https://www3.animeflv.net/"> {fuente.nombre}</a>
                                    } 
                                    
                                    
                                    </div>
                                </div>
                            } delay={100}>

                                <Link href={{
                                    pathname: '/anime/' + anime + '/' + String(item.number).match(/\d+/)[0],
                                    query: {
                                        fuente: fuente.nombre
                                    }

                                }}
                                    key={item.name} className="mb-4 bg-slate-800 rounded-full px-4 grid justify-center text-center text-white" > {titulo}
                                    <span> Episodio {String(item.number).match(/\d+/)[0]} </span>
                                </Link >
                            </Tooltip>
                        </>
                    ))
                }
            </div >

        </div>


    )
}