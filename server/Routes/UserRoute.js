
const { GetUsers, PromoteUser } = require('../Controllers/UserController')
const router = require('express').Router()
const { MinRole1, MinRole2} = require("../Middlewares/AuthMiddleware")


/**
 * @swagger
 * /user/all:
 *    get:
 *      summary: Get all users
 *      description: Retrieve all users
 *      tags: [User]
 *      security:
 *        - MinRole2: []
 */
router.get('/all', [MinRole2, GetUsers])

/**
 * @swagger
 * /user/promote:
 *    post:
 *      summary: Promote a user
 *      description: Promote a user
 *      tags: [User]
 *      security:
 *        - MinRole2: []
 */
router.post('/promote', [MinRole2, PromoteUser])

module.exports = router