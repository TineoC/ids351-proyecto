import app from './app'

const PORT = 3000

app.listen(PORT, () => {
  console.log(`[Server]: I am running at https://localhost:${PORT}`)
})
