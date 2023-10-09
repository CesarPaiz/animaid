

function levenshteinDistance(a, b) {
    const matriz = Array.from(Array(a.length + 1), () => Array(b.length + 1).fill(0));
  
    for (let i = 0; i <= a.length; i++) {
      for (let j = 0; j <= b.length; j++) {
        if (i === 0) {
          matriz[i][j] = j;
        } else if (j === 0) {
          matriz[i][j] = i;
        } else {
          const costo = a[i - 1] !== b[j - 1] ? 1 : 0;
          matriz[i][j] = Math.min(
            matriz[i - 1][j] + 1,
            matriz[i][j - 1] + 1,
            matriz[i - 1][j - 1] + costo
          );
        }
      }
    }
  
    return matriz[a.length][b.length];
  }
  
  export function encontrarURLMasSimilar(json, texto) {
    let urlMasSimilar = null;
    let menorDistancia = Infinity;
  
    if (json && json.results && Array.isArray(json.results)) {
      json.results.forEach((element) => {
        const distancia = levenshteinDistance(element.url, texto);
  
        if (distancia < menorDistancia) {
          menorDistancia = distancia;
          urlMasSimilar = element.url;
        }
      });
    } else {
      console.error("El objeto json no tiene la propiedad 'results' definida o no es un array.");
    }
  
    return urlMasSimilar;
  }
  