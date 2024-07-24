const { CreateShelf, DeleteShelf, PrintShelf } = require('../Controllers/ShelfController')
const router = require('express').Router()
const { MinRole1, MinRole2} = require("../Middlewares/AuthMiddleware")


/**
 * @swagger
 * /shelf/create:
 *    post:
 *      summary: Create a new shelf
 *      description: Create a new shelf
 *      tags: [Shelf]
 *      security:
 *        - MinRole1: []
 */
router.post('/create', [MinRole1 ,CreateShelf])

/**
 * @swagger
 * /shelf/delete:
 *    post:
 *      summary: Delete a shelf
 *      description: Delete a shelf
 *      tags: [Shelf]
 *      security:
 *        - MinRole1: []
 */
router.post('/delete', [MinRole1, DeleteShelf])

router.post('/print', [MinRole1, PrintShelf])

module.exports = router