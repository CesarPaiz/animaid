'use client'

import { useState } from "react"

export default function IframeVideo({ jsonVideos }) {
    const [video, setVideo] = useState("")
    return (
        <>
            <div className="justify-center text-center">
                {jsonVideos?.map((item) => (

                    <button key={item.url} onClick={() => setVideo(item.url)} className=" mt-8  mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">{item.name}</button>

                ))}
            </div>
            <div className="flex align-center justify-center max-w-2xl max-h-2xl mt-4 rounded">
                <iframe width="560" height="315" frameborder="0" src={video} scrolling="no" allowfullscreen=""></iframe>
            </div>
        </>
    )
}