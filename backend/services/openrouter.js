import axios from 'axios'

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

export const createChatCompletion = async (messages) => {
  const apiKey = process.env.OPENROUTER_API_KEY

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is missing in backend environment')
  }

  const model = process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini'

  const response = await axios.post(
    OPENROUTER_URL,
    {
      model,
      messages,
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    },
  )

  const reply = response.data?.choices?.[0]?.message?.content?.trim()

  if (!reply) {
    throw new Error('OpenRouter returned an empty response')
  }

  return reply
}
