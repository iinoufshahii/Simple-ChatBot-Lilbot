import axios from 'axios'

export const createChatCompletion = async (messages) => {
  const apiKey = process.env.GEMINI_API_KEY
  const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash'

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is missing in backend environment')
  }

  // Convert OpenAI format to Gemini format
  const contents = messages.map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }))

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

  try {
    const response = await axios.post(
      url,
      {
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      },
    )

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()

    if (!reply) {
      throw new Error('Gemini returned an empty response')
    }

    return reply
  } catch (error) {
    if (error.response?.data?.error?.message) {
      throw new Error(`Gemini API Error: ${error.response.data.error.message}`)
    }
    throw error
  }
}
