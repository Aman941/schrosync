import React from 'react';
import YouTube from 'react-youtube';

const videoIdA = '-DX3vJiqxm4';

export default class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoId: videoIdA,
      tempId: '',
      player: null,
    };

    this.onReady = this.onReady.bind(this);
    this.onPlayVideo = this.onPlayVideo.bind(this);
    this.onPauseVideo = this.onPauseVideo.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onReady(event) {
    this.setState({
      player: event.target,
    });
    event.target.pauseVideo();
  }

  onChange(event) {
    this.setState({tempId:event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    console.log("submit hua");
    // parsing url
    var video_id = this.state.tempId;
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = video_id.match(regExp);
    if (match&&match[7].length === 11){
        video_id = match[7];
    }
    this.setState({videoId:video_id});
  }

  onStateChange(event)
  {
    console.log(event.target.getCurrentTime());
  }

  onPlayVideo() {
    this.state.player.playVideo();
  }

  onPauseVideo() {
    this.state.player.pauseVideo();
  }


  render() {
    return (
      <div align='center'>
        <form>
          <input type = 'text' placeholder = 'Enter Url' onChange = {this.onChange}/>
          <button type = 'submit' onClick = {this.onSubmit}>Submit</button>
        </form>
        <YouTube 
        videoId={this.state.videoId} 
        onReady={this.onReady}
        onStateChange={this.onStateChange}
         />
        <button type="button" onClick={this.onPlayVideo}>
          Play
        </button>
        <button type="button" onClick={this.onPauseVideo}>
          Pause
        </button>
      </div>
    );
  }
}