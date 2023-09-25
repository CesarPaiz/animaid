
export function getUrlByNumber({jsonObj, targetNumber}) {
    var numero = parseInt(targetNumber) - 1
    return(jsonObj[numero].url);

}