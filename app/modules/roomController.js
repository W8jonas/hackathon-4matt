const Room = require('./room');

class Controller {
  constructor(){
    this.rooms = []
  }  

  includeRoom(maximum_temperature, minimum_temperature, temperature, fail_rate){
    const room = new Room(this.rooms.length, maximum_temperature, minimum_temperature, temperature, fail_rate)

    room.turnOn();

    this.rooms.push(room)
  }

  removeRoom(index) {
    this.rooms.splice(index, 1)
  }

  printAllRooms () {
    this.rooms.forEach(room => console.log(room.toString()))
  }

  getAllRoomsStates () {
    const data = {}

    for(let i = 0; i < this.rooms.length; i++){
      data[i+1] = this.rooms[i].checkStatus()
    }

    return data;
  }

  getRoomState(index){
    if(this.counter <= this.rooms.length) return null;
    return this.rooms[index-1].checkStatus()
  }

}

module.exports = Controller