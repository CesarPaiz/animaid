
export function obtenerATF(nombre) {
    var datos = require('./animeTFix.json');
    const resultado = datos.find(item => item.name === nombre);

    if (resultado) {
        return resultado.fix;
    } else {
        return undefined
    }

}