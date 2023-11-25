"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'

export default function NavegadorCLiente() {

    const [nombreAnilist, setNombre] = useState("")
    return (

        <nav className=" w-full flex flex-row gap-4 mt-3 max-h-10 justify-center">
            <div className="font-size-2 text-white text-3xl flex-row flex place-items-left ml-0 md:ml-4 mt-1 font-bold pl-4">
                <Link className="" href="/" >
                    <span className="text-white hidden  xl:block 2xl:block lg:block md:block sm:hidden">AniMaid</span>
                    <span className="text-white xl:hidden 2xl:hidden lg:hidden md:hidden sm:block ">AM</span>
                </Link>
            </div>
            <div className="flex flex-row justify-center grow ">
                <input className=" flex rounded-full text-dark-500  place-items-center justify-center grow place-items-center  mr-2 text-center outline-none max-w-lg" onFocus={e => e.target.placeholder = ""} onBlur={e => e.target.placeholder = "¿Que anime debo buscar?"} value={nombreAnilist}
                onChange={e => setNombre(e.target.value)} placeholder="¿Que anime debo buscar?" />

                <Link
                    href={{
                        pathname: '/buscar',
                        query: {
                            query: nombreAnilist
                        },
                    }}
                >
                    <button className=" bg-blue-700 hover:bg-opacity-80 text-white font-bold py-2 px-1 md:px-4 rounded-full">Buscar</button>
                </Link>
            </div>

        </nav>



    )

}