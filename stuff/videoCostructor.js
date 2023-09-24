import React, { Component } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

class MultiQualityVideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.videoNode = React.createRef();
    this.player = null;
    this.sources = this.props.sources;
    this.state = {
      selectedQuality: 2, 
    };
  }

  componentDidMount() {
    const videoOptions = {
      height:480,
      width:640,
      controls: true,
      autoplay: false, 
      sources: this.sources,
    };

    this.player = videojs(this.videoNode, videoOptions);

    this.player.play();
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose(); 
    }
  }

  handleQualityChange = (newQuality) => {
    this.player.src(this.sources[newQuality]);
    this.setState({ selectedQuality: newQuality });
  };

  render() {
    return (
      <div>
        <div className=''>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => this.handleQualityChange(0)}>Calidad Baja</button>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => this.handleQualityChange(1)}>Calidad Media</button>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => this.handleQualityChange(2)}>Calidad Alta</button>
        </div>
        <video
          ref={(node) => (this.videoNode = node)}
          className="video-js vjs-default-skin"
        ></video>

      </div>
    );
  }
}

export default MultiQualityVideoPlayer;
