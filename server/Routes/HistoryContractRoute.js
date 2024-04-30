const { GetAllHistoryContracts } = require('../Controllers/HistoryContractController')
const { MinRole1, MinRole2} = require("../Middlewares/AuthMiddleware")
const router = require('express').Router()

/**
 * @swagger
 * /rentContract/all:
 *    get:
 *      summary: Get all rent contracts
 *      description: Retrieve all rent contracts
 *      tags: [Rent Contract]
 *      security:
 *        - MinRole1: []
 */
router.get("/all", [MinRole1, GetAllHistoryContracts])


module.exports = router