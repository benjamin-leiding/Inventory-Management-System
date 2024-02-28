const { CreateRoom , DeleteRoom} = require('../Controllers/RoomController')
const router = require('express').Router()
const { MinRole1, MinRole2} = require("../Middlewares/AuthMiddleware")

/**
 * @swagger
 * /room/create:
 *    post:
 *      summary: Create a new room
 *      description: Create a new room
 *      tags: [Room]
 *      security:
 *        - MinRole1: []
 */
router.post('/create', [MinRole1, CreateRoom])

/**
 * @swagger
 * /room/delete:
 *    post:
 *      summary: Delete a room
 *      description: Delete a room
 *      tags: [Room]
 *      security:
 *        - MinRole1: []
 */
router.post('/delete', [MinRole1, DeleteRoom])

module.exports = router