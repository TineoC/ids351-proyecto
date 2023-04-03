import express, { type Express, type Request, type Response } from 'express'

import { PrismaClient } from '@prisma/client'

const app: Express = express()
const port = 3000
app.use(express.json())
app.use(express.urlencoded())

const prisma = new PrismaClient()

app.get('/', (req: Request, res: Response) => {
  res.send('Klk')
})

app.post('/products', async (req, res) => {
  console.log(req.body)
  const product = await prisma.products.create({
    data: req.body,
  })
  res.json({ product })
})

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`)
})
