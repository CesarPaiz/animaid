'use client'

import NavegadorCLiente from "../../stuff/NavBarClient";
import Image from "next/image"
import SectionsButtons from "./SectionsButtons";
import HeadHTML from "./HeadHTML";
import { useEffect } from "react";
import { Tooltip } from "@nextui-org/react";
import { useSearchParams } from 'next/navigation'


export default function NavBar() {

    return (

        <>
            <div className="w-full flex flex-row max-h-10 ">
                <div className=" w-full">
                    <NavegadorCLiente />
                </div>
                <div className="mt-3 ml-3">
                    <Tooltip placement="left" content="Proximamente" className='bg-gray-800 rounded-full outline-none text-white px-2'>
                        <div className="flex w-10 h-10 place-items-center outline outline-offset-1 outline-1 outline-blue-500 bg-none hover:bg-none  rounded-full  mr-3 md:mx-8">
                            <Image width={50} height={50} className=" w-10 h-10 bg-slate-800  rounded-full p-0" src="/img/animeico.png" alt="logo" />
                        </div>
                    </Tooltip>
                </div>

            </div>
            <SectionsButtons />

        </>
    )
}