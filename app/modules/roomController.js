const Room = require('./room');

class Controller {
  constructor(){
    this.rooms = []
  }  

  includeRoom(maximum_temperature, minimum_temperature, temperature, fail_rate, name){
    const room = new Room(maximum_temperature, minimum_temperature, temperature, fail_rate, name)

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

  findById(id) {
    const room = this.rooms.find(room => room.id === room.get('id'));
    return room;
  }

}

module.exports = Controller