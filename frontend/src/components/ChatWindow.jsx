import { useEffect, useRef } from 'react'
import LoadingDots from './LoadingDots'
import MessageBubble from './MessageBubble'

function ChatWindow({ isLoading, messages }) {
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  if (!messages.length) {
    return (
      <section className="flex flex-1 items-center justify-center p-6">
        <div className="max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 text-center">
          <h2 className="text-xl font-semibold text-zinc-100">Welcome to Lilbot</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Ask anything to get started. Your recent conversation is saved locally in this browser.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="flex-1 overflow-y-auto px-3 py-4 sm:px-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-zinc-700 bg-zinc-900 px-3 py-2">
              <LoadingDots />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
    </section>
  )
}

export default ChatWindow
