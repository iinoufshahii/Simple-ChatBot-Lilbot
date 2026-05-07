import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import chatRouter from './routes/chat.js'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT) || 5000

app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/chat', chatRouter)

app.use((err, _req, res, _next) => {
  console.error('Unhandled server error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`)
})
