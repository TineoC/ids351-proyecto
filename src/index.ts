import express, { type Express, type Request, type Response } from 'express'

const app: Express = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Klk')
})

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`)
})
