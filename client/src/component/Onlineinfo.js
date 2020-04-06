import React from 'react';

const Onlineinfo = (users) => {
    console.log(users);
    console.log(typeof(users));
    return(
        <div className = 'OnlineinfoBox'>
            <h3>Online</h3>
           {users.users.map((user,i) => <div key = {i}> {user.name} </div>)}
        </div>
    )
};

export default Onlineinfo;