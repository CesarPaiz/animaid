'use client';
import React, { Component } from 'react';
import ReactPlayer from 'react-player/lazy';

class VideoPlayer extends Component {
  render() {
    const { subsES, subsEN, videoURL } = this.props;

    return (
      <div>
        {videoURL && subsEN && (
          <ReactPlayer
            url={videoURL}
            key={videoURL}
            controls={true}
            width="100%"
            height="auto"
            config={{
              file: {
                attributes: {
                  crossOrigin: 'true',
                },
                tracks: [
                  {
                    kind: 'subtitles',
                    src: subsES,
                    srcLang: 'es',
                    label: 'Spanish',
                  },
                  {
                    kind: 'subtitles',
                    src: subsEN,
                    srcLang: 'en',
                    label: 'English',
                  },
                ],
              },
            }}
          />
        )}
      </div>
    );
  }
}

export default VideoPlayer;
