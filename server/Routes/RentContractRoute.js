const { CreateRentContract, GetAllRentContracts, GetOwnRentContracts, EndRentContract} = require('../Controllers/RentContractController')
const { MinRole1, MinRole2} = require("../Middlewares/AuthMiddleware")
const router = require('express').Router()

/**
 * @swagger
 * /rentContract/create:
 *    post:
 *      summary: Create a new rent contract
 *      description: Create a new rent contract
 *      tags: [Rent Contract]
 *      security:
 *        - MinRole1: []
 */
router.post('/create', [MinRole1, CreateRentContract])

/**
 * @swagger
 * /rentContract/end:
 *    post:
 *      summary: End a rent contract
 *      description: End a rent contract
 *      tags: [Rent Contract]
 *      security:
 *        - MinRole1: []
 */
router.post('/end', [MinRole1, EndRentContract])

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
router.get("/all", [MinRole1, GetAllRentContracts])

/**
 * @swagger
 * /rentContract/own:
 *    get:
 *      summary: Get own rent contracts
 *      description: Retrieve own rent contracts
 *      tags: [Rent Contract]
 */
router.get("/own", GetOwnRentContracts)

module.exports = router