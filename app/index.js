const RoomController = require('./modules/roomController')

const controller = new RoomController()

const express = require('express')
const axios = require('axios')

axios.post('https://us-central1-hackathon-4matt.cloudfunctions.net/resetRooms')

const app = express()

controller.includeRoom(20, 10, 15, 50, 'ufjf:pdc:floor-1:101')
controller.includeRoom(19, 10, 15, 50, 'ufjf:pdc:floor-1:102')
controller.includeRoom(18, 10, 15,  8, 'ufjf:pdc:floor-1:103')
controller.includeRoom(17, 10, 15,  7, 'ufjf:pdc:floor-1:104')
controller.includeRoom(16, 10, 15,  6, 'ufjf:pdc:floor-1:105')

controller.includeRoom(15,  5, 10,  5, 'ufjf:pdc:floor-2:201')
controller.includeRoom(14,  5, 10,  4, 'ufjf:pdc:floor-2:202')
controller.includeRoom(13,  5, 10,  3, 'ufjf:pdc:floor-2:203')
controller.includeRoom(12,  5, 10,  2, 'ufjf:pdc:floor-2:204')
controller.includeRoom(11,  5, 10,  1, 'ufjf:pdc:floor-2:205')


controller.includeRoom(30, 20, 25,  1, 'ufjf:ice:floor-1:101')
controller.includeRoom(29, 20, 25,  2, 'ufjf:ice:floor-1:102')
controller.includeRoom(28, 20, 25,  3, 'ufjf:ice:floor-1:103')
controller.includeRoom(27, 20, 25,  4, 'ufjf:ice:floor-1:104')
controller.includeRoom(26, 20, 25,  5, 'ufjf:ice:floor-1:105')

controller.includeRoom(25, 15, 20,  6, 'ufjf:ice:floor-2:201')
controller.includeRoom(24, 15, 20,  7, 'ufjf:ice:floor-2:202')
controller.includeRoom(23, 15, 20,  8, 'ufjf:ice:floor-2:203')
controller.includeRoom(22, 15, 20,  9, 'ufjf:ice:floor-2:204')
controller.includeRoom(21, 15, 20, 10, 'ufjf:ice:floor-2:205')


function printRooms() {
  console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')
  controller.printAllRooms()
}

function fixFailures() {
  const idList = controller.listAllRoomsWithFailures();

  idList.forEach(id => {
    controller.fixFailureById(id);
    controller.turnOnById(id);
  })

  return {total: idList.length, failures: idList}
}

app.get('/fix', (req, res) => {
  const {total, failures} = fixFailures()

  res.json({total, failures})

})

setInterval(printRooms, 2000)

app.listen(3000)
