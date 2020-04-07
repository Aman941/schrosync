import React from 'react';

import Inputbar from './Inputbar';
import Messages from './Messages';

import './style/Chat.css';

// messages
// Inputbar

const Chat = ({messages , message , name , setMessage , sendMessage}) => {
    return(
        <div className = 'outerContainer'>
            <div className = 'container'>
        <Messages messages = {messages} name = {name} />
        <Inputbar message = {message} setMessage = {setMessage} sendMessage = {sendMessage} />
            </div>
        </div>
    );
};

export default Chat;