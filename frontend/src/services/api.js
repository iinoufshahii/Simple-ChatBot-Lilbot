import axios from 'axios'

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api`,
  timeout: 30000,
})

export const sendChat = async (messages) => {
  const response = await apiClient.post('/chat', { messages })
  return response.data.reply
}
