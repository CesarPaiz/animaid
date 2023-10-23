
export default async function CallBack({
searchSection,
}) {    
        
console.log(searchParams)
    return (
        <div className='flex flex-col place-items-center h-screen w-screen justify-center'>
            <span className='flex mb-4 place-items-center text-2xl mt-8 text-white text-center'>Te as logeado con exito</span>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded '>
                Volver
            </button>
        </div>

    )
}
