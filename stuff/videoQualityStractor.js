import qualityLevels from "videojs-contrib-quality-levels";

function getUrlsByQualities(qualities) {
    const urls = {};
    for (const quality of qualities) {
        if (quality.quality === '360p' || quality.quality === '720p' || quality.quality === '1080p') {
            urls[quality.quality] = quality.url;
        }
    }
    return urls;
}

export default function videoQualityStractor(jsonQualities) {
    
    const urls = getUrlsByQualities(jsonQualities);

    if (Object.keys(urls)) {
        var qualityVideoLevels = urls;
        return qualityVideoLevels

    } else {
        console.log('No se encontraron todas las calidades.');
    }
}