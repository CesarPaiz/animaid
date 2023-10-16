'use client'

import { useState } from "react"
import PaginationMirar from "../stuff/paginationMirar"

export default function IframeVideo({ jsonVideos, id, captitulo }) {
    const [video, setVideo] = useState("")
    return (
        <>
            <div className="justify-center text-center">
                {jsonVideos?.map((item) => (

                    <button key={item.url} onClick={() => setVideo(item.url)} className=" mt-8  mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">{item.name}</button>

                ))}
            </div>
            <div className=" flex  mt-6 align-center justify-center  ">
                <iframe className="justify-center text-center" width="760" height="415" frameborder="0" src={video} scrolling="no" allowfullscreen=""></iframe>
            </div>
            <div onClick={() => setVideo("")} className="flex align-center justify-center mt-4 rounded">
                <PaginationMirar anime={id} captitulo={captitulo} />
            </div>
        </>
    )
}