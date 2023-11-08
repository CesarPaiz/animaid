import Image from "next/image"
export default function Loading() {
    return (
        <div className="flex  justify-center align-center place-self-center mt-8 mb-8 place-items-center">
            <Image src="/img/loading.gif" alt="loading" width={200} height={200} />
        </div>
    )
}