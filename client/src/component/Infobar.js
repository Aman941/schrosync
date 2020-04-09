import React from 'react';

import './style/Infobar.css'

const Infobar = ({name , room}) => {
    return(
        <div className = 'InfobarOuter'>
            <h2>Hi {name}!! welcome to {room} room</h2>
        </div>
    )
}

export default Infobar;