const RoomController = require('./app/modules/roomController');

const controller = new RoomController();

controller.includeRoom(30, 20, 25, 1, 'Sala 401',  'ufjf:ice:first-floor:401')
controller.includeRoom(25, 20, 25, 10, 'Sala 402', 'ufjf:ice:first-floor:402')
controller.includeRoom(20, 15, 25, 10, 'Sala 403', 'ufjf:ice:second-floor:403')
controller.includeRoom(15, 10, 25, 10, 'Sala 405', 'ufjf:ice:first-floor:405')
controller.includeRoom(20, 15, 25, 90, 'Sala 406', 'ufjf:ice:first-floor:406')

function printRooms() {
  console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')
  controller.printAllRooms();
}

setInterval(printRooms, 2000);