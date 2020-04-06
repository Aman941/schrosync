import React from 'react';

import Inputbar from './Inputbar';
import Messages from './Messages'

// messages
// Inputbar

const Chat = ({messages , message , name , setMessage , sendMessage}) => {
    return(
        <div className = 'chatContainer'>
        <Messages messages = {messages} name = {name} />
        <Inputbar message = {message} setMessage = {setMessage} sendMessage = {sendMessage} />
        </div>
    );
};

export default Chat;