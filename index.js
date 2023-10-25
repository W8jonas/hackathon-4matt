const RoomController = require('./app/modules/roomController');

const controller = new RoomController();

controller.includeRoom(30, 20, 25, 1)
controller.includeRoom(25, 20, 25, 10)
controller.includeRoom(20, 15, 25, 10)
controller.includeRoom(15, 10, 25, 10)
controller.includeRoom(20, 15, 25, 90)

function printRooms() {
  console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')
  controller.printAllRooms();
}

setInterval(printRooms, 2000);