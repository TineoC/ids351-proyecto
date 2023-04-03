import express, { type Express, type Request, type Response } from 'express'

import { PrismaClient } from '@prisma/client'

const app: Express = express()
const port = 3000

const prisma = new PrismaClient()

app.post('/products', async (req, res) => {
  const product = await prisma.products.create({
    data: req.body,
  })
  res.json(product)
})

app.get('/', (req: Request, res: Response) => {
  res.send('Klk')
})

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`)
})
