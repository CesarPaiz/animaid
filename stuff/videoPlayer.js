'use client'

import React from 'react';
import MultiQualityVideoPlayer from './videoCostructor';
import 'plyr/dist/plyr.css';

export default function VideoPlayerMain({ videoSource }) {
    var baja = videoSource["360p"] ?? ""
    var media = videoSource["720p"] ?? ""
    var alta = videoSource["1080p"] ?? ""
    
    const videoSources = [
        {
            src: baja,
            type: 'application/x-mpegURL',
        },
        {
            src: media,
            type: 'application/x-mpegURL',
        },
        {
            src: alta,
            type: 'application/x-mpegURL',
        }
    ];



    return (
        <div className="flex align-center justify-center max-w-2xl max-h-2xl mt-4 rounded">
            <MultiQualityVideoPlayer sources={videoSources} />
        </div>
    );
};

