'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const setCookie = (key, value) => {
    Cookies.set(key, value, { expires: 365 * 999 });
}
const removeCookie = (key) => {
    Cookies.remove(key);
};

export default function HeadHTML() {

    const router = useRouter()
    const pathnameHtml = usePathname()
    const searchParams = useSearchParams();
    var codigo = searchParams.get('code');
    if (codigo !== null) {
        removeCookie("anilistAuth");
        setCookie("anilistAuth", codigo);
        router.push("/");
    }

    const pathname = usePathname()
    var pathnameFix = pathname.replace(/\//g, " ")
    var partes = pathnameFix.split(" ");
    var pathnameEnd = partes.pop();
    var pathnameFixPar2 = pathnameEnd.charAt(0).toUpperCase() + pathnameEnd.slice(1);
    var pathnameFinal = " - " + pathnameFixPar2
    return (
        <head>
            {pathnameFinal !== " - " &&
                <title>{`AniMaid  ${pathnameFinal}`}</title>
            }
        </head>
    )
}
