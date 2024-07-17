import express from 'express'
import cors from 'cors'
import usuarioRouter from './routes/usuarioRouter.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use(usuarioRouter)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
