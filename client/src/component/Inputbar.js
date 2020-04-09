import React from 'react';

import './style/Inputbar.css';

const Inputbar = ({message , setMessage , sendMessage}) => {
    return(
      <div className='inputbar-container'>
        <form className="form">
        <input
          className="input"
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
      </form>
      </div>
    )
}

export default Inputbar;