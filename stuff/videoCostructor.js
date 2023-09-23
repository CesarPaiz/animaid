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
      selectedQuality: 0, // Inicialmente seleccionamos la calidad más baja
    };
  }

  componentDidMount() {
    const videoOptions = {
      height:480,
      width:640,
      controls: true,
      autoplay: false, // Desactiva la reproducción automática
      sources: this.sources,
    };

    // Crea el reproductor de video
    this.player = videojs(this.videoNode, videoOptions);

    // Inicializa el reproductor
    this.player.play();
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose(); // Limpia el reproductor de video cuando se desmonta el componente
    }
  }

  handleQualityChange = (newQuality) => {
    // Cambia la fuente del video según la calidad seleccionada
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
