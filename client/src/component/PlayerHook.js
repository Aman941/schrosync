import React, { useState, useEffect } from "react";
import YouTube from 'react-youtube';
import io from 'socket.io-client';
import queryString from 'query-string';

import Infobar from './Infobar';
import Onlineinfo from './Onlineinfo';
import Chat from './Chat';


const videoIdA = '-DX3vJiqxm4';
let socket;

const PlayerHook = (props) =>{
    //console.log(props);
    const[videoId , setVideoId] = useState(videoIdA);
    const[tempId , setTempId]  = useState('');
    const[player , setPlayer] = useState(null);
    const[name , setName] = useState('');
    const[room , setRoom] = useState('');
    const[user , setUser] = useState('');
    const[timer , setTimer] = useState(0);
    const[isset , setIsset] = useState(false);
    const[roomUsers , setRoomUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

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
            //console.log(`player in socket ${player}`);
            setVideoId(video_id.video_id);
        })
    });

    useEffect(() => {
      socket.on('roomData', ({room , users}) => {
        setRoomUsers(users);
      })
    })
    

    const onReady = (event) => {
        setPlayer(event.target);
        event.target.pauseVideo();
    }

    useEffect(() => {
      socket.on('videoSync', ({time}) => {
        console.log(` time recieved by socket.on is ${time}`);
        setTimer(time);
        setIsset(true);
      });
    },[]);

    if(isset)
    {
      console.log(`executed time is ${timer}`);
      player.seekTo(timer);
      player.playVideo();
      setIsset(false);
      //setTimer(0);
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

    const onSyncVideo = () => {
      const time = player.getCurrentTime();
      player.playVideo();
      console.log(`time emmited is ${time}`);
      socket.emit('syncVideo' , {time: time});
    }

    // Chat functions
    // send message
    // reieve message
    // InfoBar

    useEffect(() => {
      socket.on('message', message => {
        setMessages(messages => [ ...messages, message ]);
      });
    },[]);

    const sendMessage = (event) => {
      event.preventDefault();
  
      if(message) {
        socket.emit('sendMessage', message, () => setMessage(''));
      }
    }



    return (
      <div className = 'overAllContainer'>
        <Infobar name = {name} room = {room} />
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
          <button type="button" onClick={onSyncVideo}>
            Sync
          </button>
        </div>
        <Onlineinfo users = {roomUsers} />
        <Chat messages = {messages} message = {message} name = {name} setMessage = {setMessage} sendMessage = {sendMessage} />
      </div>
      );

}

export default PlayerHook;
