'use client'

import { useState } from "react"
import PaginationMirar from "../stuff/paginationMirar"
export default function IframeVideo({ jsonVideos, id, captitulo,episodios }) {
    if(
        jsonVideos.servers !== undefined
    ){
        var videos = jsonVideos.servers
    }
    else{
        var videos = jsonVideos
    }
    var animeID = parseInt(id)
    var animeCaps = parseInt(captitulo)
    const [video, setVideo] = useState("")
   

    return (
        <div >
            <div className="justify-center text-center mt-8">
                {videos?.map((item) => (

                    <button key={item.url} onClick={() => setVideo(item.url)} className=" gap-2 mt-2 mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">{item.name}</button>
                    
                ))}
            </div>
            <div className=" flex  mt-6 align-center justify-center  ">
                <iframe className="justify-center text-center mx-2 max-h-60 md:max-h-full " width="760" height="440" frameBorder="0" src={video} scrolling="no" allowFullScreen='True'></iframe>
            </div>
            <div onClick={() => setVideo("")} className="text-white mt-4 mb-4 justify-center text-center flex flex-row gap-4 ">
                <PaginationMirar anime={animeID} captitulo={animeCaps} cantidad={episodios} />
            </div >

        </div>
    )
}