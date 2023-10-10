import fs from 'fs';
import path from 'path';

const rutaArchivo = path.resolve('./stuff/animeTFix.json');
const datosRaw = fs.readFileSync(rutaArchivo ,'utf-8');
const datos = JSON.parse(datosRaw);


export function obtenerATF(nombre) {
    const resultado = datos.find(item => item.name === nombre);

    if (resultado) {
        return resultado.fix;
    } else {
        return undefined
    }

}