'use client'

import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';

export default function VideoPlayerMain({ chapter }) {
    return (
        <CldVideoPlayer
            className='align-center justify-center'
            src={chapter}
        />
    )
}