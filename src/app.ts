import express, { type Express, type Request, type Response } from 'express'

import bodyParser from 'body-parser'

import productRouter from './routes/product'
import employeesRouter from './routes/employees'

const app: Express = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(productRouter)
app.use(employeesRouter)
app.get('/', (req: Request, res: Response) => {
  res.send(process.env.DATABASE_URL)
})

export default app
