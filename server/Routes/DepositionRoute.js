const { CreateDeposition } = require('../Controllers/DepositionController')
const router = require('express').Router()
const { MinRole1, MinRole2} = require("../Middlewares/AuthMiddleware")


/**
 * @swagger
 * /deposition/create:
 *    post:
 *      summary: Create a new deposition
 *      description: Create a new deposition
 *      tags: [Deposition]
 *      security:
 *        - MinRole1: []
 */
router.post('/create',[MinRole1, CreateDeposition])

module.exports = router