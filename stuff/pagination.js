import { AniListTendencia } from "./anilist"
import Link from "next/link"
import Bback from "./bBack"
import Bnext from "./bNext"
export default async function PaginationMain({
    paginaQ
}) {
    return (
        <div className="flex justify-center mt-4 text-white border-spacing-2 mb-4">
            <Bback className="ml-4" actual={paginaQ} />
            <Bnext actual={paginaQ} />
        </div>
    )
}