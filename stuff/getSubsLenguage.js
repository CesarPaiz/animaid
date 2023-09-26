export function getSubsLenguageMain({jsonSubs}) {
    return jsonSubs.filter( item => item.lang === 'English'|| item.lang === 'English - English' || item.lang === 'Spanish' || item.lang === 'Spanish - Spanish(Latin_America)').map(item => item.url);
}