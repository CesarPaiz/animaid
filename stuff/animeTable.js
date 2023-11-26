'use client'
import Image from 'next/image'
import Link from 'next/link.js'
import { Suspense } from 'react'
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import BotonesPopUp from './BotonesPopUp'

export default function AnimeTable({ datos, fuente }) {
    const data = datos
    const descripciónFix = (descripción) => {
        const fix = String(descripción).replace(/(<([^>]+)>)/ig, '')
        if (fix === 'null' || fix === undefined) {
            return 'No hay descripción'
        }
        else {
            return fix
        }
    }

    return (
        <>

            <div className="max-w-full md:ml-8 md:mr-8 ml-4 mr-4 mx-auto grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 gap-6 mt-8 rounded overflow-hidden shadow-lg">
                {
                    data?.data.Page.media.map(item => (
                        <Popover key={item} placement="right">
                            <PopoverTrigger>

                                <div className="max-w-sm mx-auto bg-gray-800 rounded overflow-hidden shadow-lg mb-8">

                                    <div style={{ width: '175px', height: '300px', position: 'relative' }}>
                                        <Suspense fallback={<span className='flex justify-center align-center text-2xl mt-8 text-white'>Loading...</span>}>
                                            <Image
                                                unoptimized
                                                src={item.coverImage.large}
                                                fill
                                                alt={'AniMaid' + item.title.romaji ?? item.title.english}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </Suspense>

                                        <div className="absolute inset-0">
                                            <div className=" w-full  relative  text-white bg-black bg-opacity-80  flex items-end justify-center ">
                                                <h2 className=" text-base font-bold  truncate">{item.title.romaji ?? item.title.english}</h2>

                                            </div>
                                            <div className=" w-full absolute  text-white bg-black bg-opacity-80 flex bottom-0 justify-center ">
                                                <span className="text-white">{item.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent placement="right" shadow className="transparent rounded  text-white bg-[#001731] ">
                                <div className="max-w-md p-6  rounded-md shadow-md">
                                    <h1 className="text-2xl font-bold mb-4">{item.title.romaji ?? item.title.english}</h1>
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {descripciónFix(item.description)}
                                    </p>
                                    <div className="flex space-x-2 mb-4 place-content-center place-items-center line-clamp-1">
                                        {(item.tags.slice(0, 3)).map((tag) => (
                                            <span className="bg-gray-700 text-center p-1 text-sm rounded">{tag.name}</span>

                                        ))}
                                    </div>
                                    <div className="flex justify-between ">
                                        <span className="text-white text-3xl font-bold">
                                            AniMaid
                                        </span>
                                        <BotonesPopUp tipo={item.type} id={item.id} />
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    ))
                }

            </div>
        </>
    )
}
