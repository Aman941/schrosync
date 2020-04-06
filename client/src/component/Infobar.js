import React from 'react';

const Infobar = ({name , room}) => {
    return(
        <div className = 'InfobarOuter'>
            <h2>Hi {name}!! welcome to {room} room</h2>
        </div>
    )
}

export default Infobar;