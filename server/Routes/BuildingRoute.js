const { CreateBuilding, GetBuildings, DeleteBuilding } = require('../Controllers/BuildingController')
const router = require('express').Router()
const { MinRole1, MinRole2} = require("../Middlewares/AuthMiddleware")

/**
 * @swagger
 * /building/create:
 *    post:
 *      summary: Create a new building
 *      description: Create a new building
 *      tags: [Building]
 *      security:
 *        - MinRole1: []
 */

router.post('/create', [MinRole1, CreateBuilding]);

/**
 * @swagger
 * /building/all:
 *    get:
 *      summary: Get all buildings
 *      description: Retrieve all buildings
 *      tags: [Building]
 *      security:
 *        - MinRole1: []
 */

router.get('/all', [MinRole1, GetBuildings]);

/**
 * @swagger
 * /building/delete:
 *    post:
 *      summary: Delete a building
 *      description: Delete a building
 *      tags: [Building]
 *      security:
 *        - MinRole1: []
 *      requestBody:
 *        required: true
 *
 *      responses:
 *        200:
 *          description: Building deleted successfully
 *        401:
 *          description: Unauthorized
 */
router.post('/delete', [MinRole1, DeleteBuilding]);

module.exports = router