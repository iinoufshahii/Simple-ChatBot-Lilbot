import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function MessageBubble({ message }) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <article
        className={`group max-w-[85%] rounded-2xl border px-4 py-3 text-sm shadow-sm sm:max-w-[75%] ${
          isUser
            ? 'border-indigo-500/30 bg-indigo-500/20 text-indigo-100'
            : 'border-zinc-700 bg-zinc-900 text-zinc-100'
        }`}
      >
        <div className="markdown break-words leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
        </div>

        {!isUser && (
          <button
            type="button"
            onClick={copyMessage}
            className="mt-2 rounded-md border border-zinc-700 px-2 py-1 text-xs text-zinc-300 transition hover:border-zinc-500 hover:text-zinc-100"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}
      </article>
    </div>
  )
}

export default MessageBubble
