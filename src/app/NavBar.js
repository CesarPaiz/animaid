'use client'

import Link from "next/link"
import { AniListSearch } from "../../stuff/anilist"
import { useState } from "react"
import Image from "next/image"


export default function NavBar() {
    const [nombreAnilist, setNombre] = useState("")
    return (
        <nav id="main_nav" className="flex gap-4 w-full justify-center mt-1 ">
            <Link className="font-size-2 text-white text-3xl align-left ml-4 mt-1 font-bold pl-4" href="/" >AniMaid</Link>
            <input value={nombreAnilist} onChange={e => setNombre(e.target.value)} className="rounded-full text-dark-500 justify-center grow mr-0 ml-40 text-center outline-none" placeholder="¿Que anime debo buscar?" />

            <Link
                href={{
                    pathname: '/buscar',
                    query: {
                        query: nombreAnilist
                    },
                }}
            >
                <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Buscar</button>
            </Link>


            <button className="outline outline-offset-1 outline-1 outline-blue-500 bg-none hover:bg-none  rounded-full ml-40 mx-6">
                <Image width={50} height={50} className=" w-10 h-10 bg-slate-800  rounded-full p-0" src="/img/animeico.png" alt="logo" />
            </button>
        </nav>
    )
}