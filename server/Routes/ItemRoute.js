const { CreateItem, GetItems, UpdateItem, DeleteItem, UpdateItemImg } = require('../Controllers/ItemController')
const router = require('express').Router()
const { MinRole1, MinRole2} = require("../Middlewares/AuthMiddleware")

/**
 * @swagger
 * /item/create:
 *    post:
 *      summary: Create a new item
 *      description: Create a new item
 *      tags: [Item]
 *      security:
 *        - MinRole1: []
 */
router.post('/create', [MinRole1, CreateItem])

/**
 * @swagger
 * /item/all:
 *    get:
 *      summary: Get all items
 *      description: Retrieve all items
 *      tags: [Item]
 */
router.get('/all', GetItems)

/**
 * @swagger
 * /item/update:
 *    post:
 *      summary: Update an item
 *      description: Update an item
 *      tags: [Item]
 *      security:
 *        - MinRole1: []
 */
router.post('/update', [MinRole1, UpdateItem])

/**
 * @swagger
 * /item/update_img:
 *    post:
 *      summary: Update item image
 *      description: Update item image
 *      tags: [Item]
 *      security:
 *        - MinRole1: []
 */
router.post('/update_img', [MinRole1, UpdateItemImg])

/**
 * @swagger
 * /item/delete:
 *    post:
 *      summary: Delete an item
 *      description: Delete an item
 *      tags: [Item]
 *      security:
 *        - MinRole1: []
 */
router.post('/delete', [MinRole1, DeleteItem])

module.exports = router