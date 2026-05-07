import { Router } from 'express'
import { createChatCompletion } from '../services/openrouter.js'

const router = Router()

const isValidMessage = (message) => {
  if (!message || typeof message !== 'object') return false

  const { role, content } = message
  const validRoles = ['system', 'user', 'assistant']

  return (
    validRoles.includes(role) &&
    typeof content === 'string' &&
    content.trim().length > 0 &&
    content.length <= 4000
  )
}

router.post('/', async (req, res) => {
  const { messages } = req.body ?? {}

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages must be a non-empty array' })
  }

  if (!messages.every(isValidMessage)) {
    return res.status(400).json({
      error:
        'Each message must include a valid role (system|user|assistant) and non-empty content',
    })
  }

  try {
    const reply = await createChatCompletion(messages)
    return res.json({ reply })
  } catch (error) {
    if (error.response?.status === 429) {
      return res.status(429).json({
        error: 'Rate limit reached. Please wait a moment and try again.',
      })
    }

    const status = error.response?.status || 500
    const message =
      error.response?.data?.error?.message ||
      error.message ||
      'Failed to process chat request'

    return res.status(status).json({ error: message })
  }
})

export default router
