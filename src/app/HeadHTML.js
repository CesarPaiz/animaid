'use client'


import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function HeadHTML() {
    const pathname = usePathname()
    var pathnameFix = pathname.replace(/\//g, " ")
    var partes = pathnameFix.split(" ");
    var pathnameEnd = partes.pop();
    var pathnameFixPar2 = pathnameEnd.charAt(0).toUpperCase() + pathnameEnd.slice(1);
    var pathnameFinal = " - " + pathnameFixPar2
    return (
        <head>
            <link rel="icon" href="/img/icono.png" />

            {pathnameFinal !== " - " &&
                <title>{`AniMaid  ${pathnameFinal}`}</title>
            }
        </head>
    )

}
