import orderService from '../services/orders.service'

class OrderController {
  async handleOrderCreated(req, res, next) {
    orderService.saveOrders(req.body)
    return res.status(200).send()
  }
}

const orderController = new OrderController()
export default orderController
