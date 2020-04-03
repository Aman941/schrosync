import React , {useState } from 'react';
import { Link } from 'react-router-dom';


export default function Join(){
    const [Name , setName] = useState('');
    const [Room , setRoom] = useState('');

    return(
    <div className = 'outerContainer'>
        <div className = 'InnerContainer'>
            <h1>Name</h1>
            <input className = 'NameInput' type = 'text' placeholder = 'Name' onChange = {(e) => setName(e.target.value)} />
            <h1>Room</h1>
            <input className = 'RoomInput' type = 'text' placeholder = 'Room' onChange = {(e) => setRoom(e.target.value)} />
            <Link onClick={(e) => (!Name || !Room) ? e.preventDefault() : null} to={`/chat?name=${Name}&room=${Room}`}>
                <button className={'button mt-20'} type="submit">Sign In</button>
            </Link>
        </div>
    </div>
    );
}




