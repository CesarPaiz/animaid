import PaginationMirar from "../../../../stuff/paginationMirar"
export default function VideoIframe({ jsonVideos, parametros }) {

var fuente = jsonVideos[0].url
    return (
        <>
            <div className="flex flex-row justify-center mt-6 ">
                {jsonVideos.map(item => (

                    <button key={item.url}  className=" justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4">{item.name}</button>

                ))}
            </div>
            <div key={fuente} className="text-white grid justify-center text-center ">
                <div  className="flex align-center justify-center w-full h-full max-w-2xl max-h-2xl mt-4 rounded">
                        <iframe className="w-full h-full" src={fuente} allowFullScreen></iframe>
               
                </div>

            </div >

        </>
    )
}

