import express, { type Express, type Request, type Response } from 'express'

import bodyParser from 'body-parser'

import router from './routes/product'

const app: Express = express()
const PORT = 3000

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)
app.get('/', (req: Request, res: Response) => {
  res.send('Klk')
})

app.listen(PORT, () => {
  console.log(`[Server]: I am running at https://localhost:${PORT}`)
})
