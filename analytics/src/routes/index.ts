import express from 'express'
import orderController from '../controllers'
const router = express.Router()

router.route('/order-created').post(orderController.handleOrderCreated)

export { router as webhookRouter }
