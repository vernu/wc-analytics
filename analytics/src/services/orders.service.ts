
import { firebaseAdmin } from '../firebaseConfig'

class OrderService {
  public async saveOrders(payload) {
    const productOrders = payload.line_items.map((item) => {
      return {
        orderId: payload.id,
        orderKey: payload.order_key,
        customerId: payload.customer_id,
        productId: item.product_id,
        productName: item.name,
        quantity: item.quantity,
        price: Number(`${item.price}`),
        total: Number(`${item.total}`),
        orderDate: new Date(payload.date_created_gmt),
      }
    })

    for (const order of productOrders) {
      firebaseAdmin.firestore().collection('orders').add(order)
    }
    this.getSalesAnalyticsForDay(new Date(payload.date_created_gmt))
  }

  public async getSalesAnalyticsForDay(date: Date) {
    const start = new Date(date)
    start.setHours(0, 0, 0, 0)
    const end = new Date(date)
    end.setHours(23, 59, 59, 999)

    const q = await firebaseAdmin
      .firestore()
      .collection('orders')
      .where('orderDate', '>=', start)
      .where('orderDate', '<=', end)
      .get()

    const result: any = []
    q.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() })
    })
    const topSellingProducts = result.reduce((acc, item) => {
      if (!acc[item.productId]) {
        acc[item.productId] = { ...item, quantity: 0, total: 0 }
      }
      acc[item.productId].quantity += item.quantity
      acc[item.productId].total += item.total
      return acc
    }, {})

    const topSelling: any = Object.values(topSellingProducts)?.[0]
   

    const totalRevenue = result.reduce((acc, item) => {
      acc += item.total
      return acc
    }, 0)

  
    const totalSales = result.reduce((acc, item) => {
      acc += item.quantity
      return acc
    }, 0)

    return {
      topSelling,
      totalRevenue,
      totalSales,
    }
  }
}

const orderService = new OrderService()
export default orderService
