import { useEffect, useState } from 'react'
import ChatInput from './components/ChatInput'
import ChatWindow from './components/ChatWindow'
import { sendChat } from './services/api'

const STORAGE_KEY = 'lilbot-messages'

function App() {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  }, [messages])

  const onSend = async (content) => {
    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
    }

    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setIsLoading(true)
    setError('')

    try {
      const reply = await sendChat(
        nextMessages.map(({ role, content: messageContent }) => ({
          role,
          content: messageContent,
        })),
      )

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'assistant', content: reply },
      ])
    } catch (requestError) {
      const message =
        requestError.response?.data?.error ||
        'Unable to fetch a response right now. Please try again.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 bg-zinc-950/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between">
          <h1 className="text-lg font-semibold tracking-tight">Lilbot</h1>
          <button
            type="button"
            onClick={() => setMessages([])}
            className="rounded-md border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-zinc-500 hover:text-zinc-100"
          >
            New chat
          </button>
        </div>
      </header>

      {error && (
        <div className="border-b border-red-500/30 bg-red-500/10 px-4 py-2 text-center text-sm text-red-300">
          {error}
        </div>
      )}

      <ChatWindow messages={messages} isLoading={isLoading} />
      <ChatInput disabled={isLoading} onSend={onSend} />
    </div>
  )
}

export default App
