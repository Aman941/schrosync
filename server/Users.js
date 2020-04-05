const users = [];

const addUser = ({id , name , room}) => {
    //console.log('Method Executed');
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user)=> user.name === name && user.room === room );

    if(!name || !room){
        return {error:'Enter the user name'};
        }        
    if(existingUser){
        return {error:'User Name is already taken'};
    }

    const user = {id , name , room};

    users.push(user);
    return {user};
    }

const removeUser = (id) => {
    const Index = users.findIndex((user) => user.id === id);

    if(Index !== -1)
    {
        return users.splice(Index,1)[0];
    }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {addUser , removeUser , getUser , getUsersInRoom};