function LoadingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-2" aria-label="Assistant is typing">
      <span className="size-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.3s]" />
      <span className="size-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.15s]" />
      <span className="size-2 animate-bounce rounded-full bg-zinc-400" />
    </div>
  )
}

export default LoadingDots
