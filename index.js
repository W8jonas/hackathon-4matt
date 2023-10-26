const RoomController = require('./app/modules/roomController');

const controller = new RoomController();

// controller.includeRoom(30, 20, 25,  1, 'ufjf:ice:first--floor:101')
// controller.includeRoom(29, 20, 25,  2, 'ufjf:ice:first--floor:102')
// controller.includeRoom(28, 20, 25,  3, 'ufjf:ice:first--floor:103')
// controller.includeRoom(27, 20, 25,  4, 'ufjf:ice:first--floor:104')
// controller.includeRoom(26, 20, 25,  5, 'ufjf:ice:first--floor:105')

// controller.includeRoom(25, 15, 20,  6, 'ufjf:ice:second-floor:201')
// controller.includeRoom(24, 15, 20,  7, 'ufjf:ice:second-floor:202')
// controller.includeRoom(23, 15, 20,  8, 'ufjf:ice:second-floor:203')
// controller.includeRoom(22, 15, 20,  9, 'ufjf:ice:second-floor:204')
// controller.includeRoom(21, 15, 20, 10, 'ufjf:ice:second-floor:205')

// controller.includeRoom(20, 10, 15, 10, 'ufjf:pdc:first--floor:101')
// controller.includeRoom(19, 10, 15,  9, 'ufjf:pdc:first--floor:102')
// controller.includeRoom(18, 10, 15,  8, 'ufjf:pdc:first--floor:103')
// controller.includeRoom(17, 10, 15,  7, 'ufjf:pdc:first--floor:104')
// controller.includeRoom(16, 10, 15,  6, 'ufjf:pdc:first--floor:105')

// controller.includeRoom(15,  5, 10,  5, 'ufjf:pdc:second-floor:201')
// controller.includeRoom(14,  5, 10,  4, 'ufjf:pdc:second-floor:202')
// controller.includeRoom(13,  5, 10,  3, 'ufjf:pdc:second-floor:203')
// controller.includeRoom(12,  5, 10,  2, 'ufjf:pdc:second-floor:204')
// controller.includeRoom(11,  5, 10,  1, 'ufjf:pdc:second-floor:205')

controller.includeRoom(20, 10, 15, 10, 'ufjf:pdc:first--floor:101')
controller.includeRoom(19, 10, 15,  9, 'ufjf:pdc:first--floor:102')
controller.includeRoom(18, 10, 15,  8, 'ufjf:pdc:first--floor:103')
controller.includeRoom(17, 10, 15,  7, 'ufjf:pdc:first--floor:104')
controller.includeRoom(16, 10, 15,  6, 'ufjf:pdc:first--floor:105')
controller.includeRoom(25, 15, 20,  6, 'ufjf:ice:second-floor:201')
controller.includeRoom(24, 15, 20,  7, 'ufjf:ice:second-floor:202')
controller.includeRoom(23, 15, 20,  8, 'ufjf:ice:second-floor:203')
controller.includeRoom(22, 15, 20,  9, 'ufjf:ice:second-floor:204')
controller.includeRoom(21, 15, 20, 10, 'ufjf:ice:second-floor:205')
controller.includeRoom(30, 20, 25,  1, 'ufjf:ice:first--floor:101')
controller.includeRoom(29, 20, 25,  2, 'ufjf:ice:first--floor:102')
controller.includeRoom(28, 20, 25,  3, 'ufjf:ice:first--floor:103')
controller.includeRoom(27, 20, 25,  4, 'ufjf:ice:first--floor:104')
controller.includeRoom(26, 20, 25,  5, 'ufjf:ice:first--floor:105')
controller.includeRoom(15,  5, 10,  5, 'ufjf:pdc:second-floor:201')
controller.includeRoom(14,  5, 10,  4, 'ufjf:pdc:second-floor:202')
controller.includeRoom(13,  5, 10,  3, 'ufjf:pdc:second-floor:203')
controller.includeRoom(12,  5, 10,  2, 'ufjf:pdc:second-floor:204')
controller.includeRoom(11,  5, 10,  1, 'ufjf:pdc:second-floor:205')


function printRooms() {
  console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')
  controller.printAllRooms();
}

setInterval(printRooms, 2000);