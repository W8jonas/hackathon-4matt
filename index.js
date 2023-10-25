const Room = require('./app/modules/room');

const rooms = [];

rooms.push(new Room(1, 30, 20))
rooms.push(new Room(2, 25, 20, 15))
rooms.push(new Room(3, 30, 25, 35))
rooms.push(new Room(4, 15, 10))

function updateState(){
  console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')
  rooms.forEach(room => {
    console.log(room.toString());
  });
}

setInterval(updateState, 2000);