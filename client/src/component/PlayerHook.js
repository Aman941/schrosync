import React, { useState, useEffect } from "react";
import YouTube from 'react-youtube';
import io from 'socket.io-client';
import queryString from 'query-string';


const videoIdA = '-DX3vJiqxm4';
let socket;

const PlayerHook = (props) =>{
    console.log(props);
    const[videoId , setVideoId] = useState(videoIdA);
    const[tempId , setTempId]  = useState('');
    const[player , setPlayer] = useState(null);
    const[name , setName] = useState('');
    const[room , setRoom] = useState('');
    const[user , setUser] = useState('');

    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(props.location.search);
    
        socket = io(ENDPOINT);
    
        setRoom(room);
        setName(name)
    
        socket.emit('join', { name, room }, (error) => {
          if(error) {
            alert(error);
          }
        });
      }, [ENDPOINT, props.location.search]);

    useEffect(() => {
        socket.on('changedLink',({video_id}) => {
            setVideoId(video_id.video_id);
        })
    },[]);
    

    const onReady = (event) => {
        setPlayer(event.target);
        event.target.pauseVideo();
    }

    const onChange = (event) => {
        setTempId(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log("submit hua");
        // parsing url
        var video_id = tempId;
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = video_id.match(regExp);
        if (match&&match[7].length === 11){
            video_id = match[7];
        }
        sendToAll(video_id);
        setVideoId(video_id);
      }
    
    const sendToAll = (video_id) =>{
        console.log('it is executed');
        socket.emit('linkChange' , {video_id});
    }

    const onStateChange = (event) =>
      {
        console.log(event.target.getCurrentTime());
      }
    const onPlayVideo = () => {
        player.playVideo();
      }
    
    const onPauseVideo = () => {
        player.pauseVideo();
      }

    return (
        <div align='center'>
          <form>
            <input type = 'text' placeholder = 'Enter Url' onChange = {onChange}/>
            <button type = 'submit' onClick = {onSubmit}>Submit</button>
          </form>
          <YouTube 
          videoId={videoId} 
          onReady={onReady}
          onStateChange={onStateChange}
           />
          <button type="button" onClick={onPlayVideo}>
            Play
          </button>
          <button type="button" onClick={onPauseVideo}>
            Pause
          </button>
        </div>
      );

}

export default PlayerHook;
