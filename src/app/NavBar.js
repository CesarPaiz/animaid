'use client'

import Link from "next/link"
import { AniListSearch } from "../../stuff/anilist"
import { useState } from "react"
import Image from "next/image"


export default function NavBar() {
    const [nombreAnilist, setNombre] = useState("")
    return (
        <nav id="main_nav" className="flex gap-4 w-full flex-row mt-3 max-h-10 justify-center">
            <div className="font-size-2 text-white text-3xl flex-row flex place-items-left  md:ml-4 mt-1 font-bold pl-4">
                <Link className="" href="/" >
                    <span className="text-white hidden lg:block">AniMaid</span>
                    <span className="text-white md:hidden ">AM</span>
                </Link>
            </div>
            <div className="flex flex-row justify-center grow ">
                <input onFocus={e => e.target.placeholder =""}onBlur={e => e.target.placeholder = "¿Que anime debo buscar?"} value={nombreAnilist} onChange={e => setNombre(e.target.value)} className=" flex rounded-full text-dark-500  place-items-center justify-center grow place-items-center  mr-2 text-center outline-none max-w-lg" placeholder="¿Que anime debo buscar?" />

                <Link
                    href={{
                        pathname: '/buscar',
                        query: {
                            query: nombreAnilist
                        },
                    }}
                >
                    <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-1 md:px-4 rounded-full">Buscar</button>
                </Link>
            </div>

            <div>
                <button className="flex w-10 h-10 place-items-center outline outline-offset-1 outline-1 outline-blue-500 bg-none hover:bg-none  rounded-full  mx-2 md:mx-8">
                    <Image width={50} height={50} className=" w-10 h-10 bg-slate-800  rounded-full p-0" src="/img/animeico.png" alt="logo" />
                </button>
            </div>
        </nav>
    )
}