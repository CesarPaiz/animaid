'use client'

import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';

export default function VideoPlayerMain() {
    return (
        <CldVideoPlayer
            className='align-center justify-center'
            src="https://www002.vipanicdn.net/streamhls/0789fd4f049c3ca2a49b860ea5d1f456/ep.1.1677591537.1080.m3u8"
        />
    )
}