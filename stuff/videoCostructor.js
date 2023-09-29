'use client';
import React, { Component } from 'react';
import ReactPlayer from 'react-player/lazy';

class VideoPlayer extends Component {
  render() {
    const { subsES, subsEN, videoURL } = this.props;

    if (!subsES && subsEN) {
      return (
        <div>
          {videoURL && (
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
                      src: subsEN,
                      srcLang: 'en',
                      label: 'English',
                      default: true,
                    },
                  ],
                },
              }}
            />
          )}
        </div>
      );
    }
    else if (!subsEN  && subsES) {
      return (
        <div>
          {videoURL && (
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
                      default: true,
                    },
                  ],
                },
              }}
            />
          )}
        </div>
      );
    }
    else if (!subsEN  && !subsES) {
      return (
        <div>
          {videoURL && (
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
                  }
                }
              }
              }

            />
          )}
        </div>  
      )

    }
    else {
      return (
        <div>
          {videoURL && (
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
                      default: true,
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
}

export default VideoPlayer;
