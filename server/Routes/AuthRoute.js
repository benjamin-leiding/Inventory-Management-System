const { Signup, Login } = require('../Controllers/AuthController')
const { userVerification } = require(('../Middlewares/AuthMiddleware'))
const router = require('express').Router()

/**
 * @swagger
 * /signup:
 *    post:
 *      description: Register a new user
 */
router.post('/signup', Signup);

/**
 * @swagger
 * /login:
 *    post:
 *      description: Log in existing user
 */
router.post('/login', Login);

/**
 * @swagger
 * /:
 *    post:
 *      description: Verify user
 */
router.post('/', userVerification);

module.exports = router