import express, { type Express, type Request, type Response } from 'express'

import { type Product } from '@prisma/client'
import bodyParser from 'body-parser'
import prisma from './prisma'

const app: Express = express()
const PORT = 3000

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('Klk')
})

app.get('/products', async (req: Request, res: Response) => {
  const products: Product[] = await prisma.product.findMany()

  res.json(products)
})

app.post('/products', async (req, res) => {
  const product: Product = await prisma.product.create({
    data: req.body,
  })
  res.json({ product })
})

app.listen(PORT, () => {
  console.log(`[Server]: I am running at https://localhost:${PORT}`)
})
