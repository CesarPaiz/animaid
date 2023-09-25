'use client';
import React, { Component } from 'react';
import ReactPlayer from 'react-player/lazy';

class VideoPlayer extends Component {
  render() {
    const { subtitleURL, videoURL } = this.props;
  
    return (
      <div>
        {videoURL && subtitleURL && (
          <ReactPlayer
            url={videoURL}
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
                    src: subtitleURL,
                    srcLang: 'es',
                    label: 'Spanish',
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
