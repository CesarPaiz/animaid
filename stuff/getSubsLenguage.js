export function getSubsLenguageES({jsonSubs}) {
    return jsonSubs.filter( item => item.lang === 'Spanish' || item.lang === 'Spanish - Spanish(Latin_America)').map(item => item.url);
}
export function getSubsLenguageEn({jsonSubs}) {
    return jsonSubs.filter( item => item.lang === 'English' || item.lang === 'English - English(US)').map(item => item.url);
}