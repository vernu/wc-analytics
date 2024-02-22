import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import cron from 'node-cron'
import { webhookRouter } from './routes'
import notificationService from './services/notification.service'
;(async () => {
  console.log('Starting server...')
  const PORT = process.env.PORT || 5050
  const app = express()

  app.use(cors())
  app.use(express.json())

  app.use('/webhook', webhookRouter)

  cron.schedule('0 0 * * *', () => {
    notificationService.sendDailyReport()
  })

  app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
  })
})()
