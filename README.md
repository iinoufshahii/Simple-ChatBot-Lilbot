# Simple-ChatBot-Lilbot

A lightweight full-stack AI chatbot starter template with a modern dark UI.

## Stack

- Frontend: React + Vite + TailwindCSS + Axios
- Backend: Node.js + Express + Axios + dotenv + CORS
- AI Provider: OpenRouter (`openai/gpt-4o-mini`)

## Project structure

```bash
.
├── backend/
│   ├── routes/chat.js
│   ├── services/openrouter.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/components/
│   │   ├── ChatInput.jsx
│   │   ├── ChatWindow.jsx
│   │   ├── LoadingDots.jsx
│   │   └── MessageBubble.jsx
│   ├── src/services/api.js
│   ├── src/App.jsx
│   ├── src/main.jsx
│   └── src/index.css
└── .env.example
```

## Setup

1. Install frontend dependencies:

```bash
cd frontend
npm install
```

2. Install backend dependencies:

```bash
cd ../backend
npm install
```

3. Configure environment variables:

```bash
cp .env.example backend/.env
```

Then update `OPENROUTER_API_KEY` in `backend/.env`.

## Run

Start backend:

```bash
cd backend
npm start
```

Start frontend in a second terminal:

```bash
cd frontend
npm run dev
```

## API flow

1. Frontend sends `POST /api/chat` with conversation `messages`
2. Backend validates payload
3. Backend calls OpenRouter `https://openrouter.ai/api/v1/chat/completions`
4. Backend returns `{ "reply": "..." }`
5. Frontend appends assistant message to chat history

Example request body:

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Hello"
    }
  ]
}
```

Example response body:

```json
{
  "reply": "Hello! How can I help?"
}
```

## Notes

- API key is only used on the backend and never exposed in the frontend.
- Enter sends the message, Shift+Enter inserts a newline.
- Recent conversation history is persisted in localStorage.
- Includes markdown rendering, code blocks, and copy button for assistant messages.
