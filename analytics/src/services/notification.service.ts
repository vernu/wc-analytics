import ordersService from './orders.service'
import { Resend } from 'resend'
class NotificationService {
  async sendDailyReport() {
    console.log('Sending daily report...')
    const stats = await ordersService.getSalesAnalyticsForDay(new Date())
    
    const notificationBody = `
      <h1>Daily Sales Report</h1>
      Top selling product for today is: ${stats?.topSelling?.productName} with ${stats?.topSelling?.quantity} orders and total sales of ${stats?.topSelling?.total}
      </p>
      <p>Total sales: ${stats.totalSales}</p>
      <p>Total revenue: ${stats.totalRevenue}</p>
    `

    const resend = new Resend(process.env.RESEND_API_KEY)

    resend.emails.send({
      from: 'noreply@vernu.dev',
      to: 'vernu1997@gmail.com',
      subject: 'Daily Sales Report',
      html: notificationBody,
    })
  }
}
const notificationService = new NotificationService()
export default notificationService
