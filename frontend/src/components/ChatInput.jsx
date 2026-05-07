import { useEffect, useRef, useState } from 'react'

function ChatInput({ disabled, onSend }) {
  const [input, setInput] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const submit = () => {
    const trimmed = input.trim()
    if (!trimmed || disabled) return

    onSend(trimmed)
    setInput('')
    textareaRef.current?.focus()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submit()
    }
  }

  return (
    <div className="sticky bottom-0 border-t border-zinc-800 bg-zinc-950/95 p-3 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-zinc-700 bg-zinc-900 p-2">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Lilbot..."
          disabled={disabled}
          className="max-h-40 min-h-10 flex-1 resize-y rounded-xl bg-transparent px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed"
        />
        <button
          type="button"
          onClick={submit}
          disabled={disabled || !input.trim()}
          className="h-10 rounded-xl bg-indigo-500 px-4 text-sm font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </div>
      <p className="mx-auto mt-2 max-w-3xl px-1 text-xs text-zinc-500">
        Enter to send • Shift + Enter for newline
      </p>
    </div>
  )
}

export default ChatInput
