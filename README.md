# 🤖 Lilbot - AI Chatbot

A lightweight, full-stack AI chatbot with a modern dark UI, persistent memory, and Lilbot AI personality. Built with React, Node.js, and Google Gemini API.

<img width="1774" height="887" alt="ChatGPT Image May 7, 2026, 02_08_10 PM" src="https://github.com/user-attachments/assets/60eac9f2-6cd2-447f-af6e-54ca1393e6c4" />


## ✨ Features

- **Lilbot Personality**: Bot identifies as "Lilbot" with a friendly, helpful personality
- **Persistent Chat History**: Conversations are automatically saved to localStorage and restored on page reload
- **Conversation Memory**: Full conversation context is maintained across messages for coherent discussions
- **Modern Dark UI**: Sleek, responsive dark theme using TailwindCSS
- **Markdown Support**: Rich text rendering including code blocks with syntax highlighting
- **Copy to Clipboard**: One-click copying of bot responses
- **Real-time Streaming**: Responsive chat interface with loading states
- **Message Validation**: Server-side validation for message integrity
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Error Handling**: User-friendly error messages and recovery suggestions

## 📸 Screenshots

<img width="1508" height="1113" alt="lilbot ai png" src="https://github.com/user-attachments/assets/9d9f9d11-2c8e-4010-9554-92e352276aa3" />

### Main Chat Interface
The chatbot features a clean, intuitive interface with:
- Chat history display with distinct user and bot message styling
- Real-time message input with keyboard shortcuts (Enter to send, Shift+Enter for newline)
- Copy buttons on bot responses for easy text copying
- Typing indicators and loading states
- "New Chat" button to clear conversation history

## 🛠 Tech Stack

### Frontend
- **React 19** - UI library
- **Vite 8** - Build tool and dev server
- **TailwindCSS 4** - Styling framework
- **Axios** - HTTP client
- **React Markdown** - Markdown rendering

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **Axios** - HTTP client
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### AI Provider
- **Google Gemini API** - AI model for chat completions

## 📁 Project Structure

```
.
├── backend/
│   ├── routes/
│   │   └── chat.js              # Chat API routes and system prompt
│   ├── services/
│   │   └── openrouter.js        # Gemini API integration (service name for legacy compatibility)
│   ├── server.js                # Express server setup
│   ├── package.json
│   ├── .env.example             # Environment variables template
│   └── .env                     # Local environment config (git ignored)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatInput.jsx    # Message input component
│   │   │   ├── ChatWindow.jsx   # Chat display area
│   │   │   ├── LoadingDots.jsx  # Loading animation
│   │   │   └── MessageBubble.jsx # Individual message styling
│   │   ├── services/
│   │   │   └── api.js           # API communication
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── .env.example                 # Root environment template
└── README.md                    # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v11 or higher)
- **Google Gemini API Key** (free tier available at [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iinoufshahii/Simple-ChatBot-Lilbot.git
   cd Simple-ChatBot-Lilbot
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**
   
   Create `backend/.env` based on the template:
   ```bash
   cd ../backend
   cp .env.example .env
   ```

   Edit `backend/.env` and add your credentials:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key_here
   GEMINI_MODEL=gemini-pro
   ```

   ⚠️ **IMPORTANT**: 
   - Never commit `.env` to version control
   - Keep your API key confidential
   - Get your free Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Running the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm start
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

Then open your browser and navigate to `http://localhost:5173/`

## 🔌 API Documentation

### Chat Endpoint
**POST** `/api/chat`

**Request:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Hello, who are you?"
    },
    {
      "role": "assistant",
      "content": "Hi! I'm Lilbot, a helpful AI assistant."
    },
    {
      "role": "user",
      "content": "What can you help me with?"
    }
  ]
}
```

**Response:**
```json
{
  "reply": "I can help you with a wide variety of tasks including answering questions, writing, coding, analysis, and much more. What would you like help with?"
}
```

**Error Response:**
```json
{
  "error": "Error message describing what went wrong"
}
```

### Health Check Endpoint
**GET** `/api/health`

**Response:**
```json
{
  "ok": true
}
```

## 💾 Data Persistence

- **Chat History**: Automatically saved to browser localStorage under key `lilbot-messages`
- **Storage Limit**: Typically 5-10MB depending on browser
- **Clear History**: Click "New Chat" button to start fresh

To programmatically clear history:
```javascript
localStorage.removeItem('lilbot-messages');
```

## ⌨️ Keyboard Shortcuts

- **Enter** - Send message
- **Shift + Enter** - Insert new line in message input
- **Ctrl/Cmd + A** - Select all text in input

## 🔒 Security Considerations

- **API Key Protection**: Never expose your API key in frontend code (only backend)
- **Environment Variables**: Use `.env` files, never hardcode secrets
- **CORS Enabled**: Backend allows requests only from configured origins
- **Input Validation**: All messages are validated server-side
- **Message Length Limit**: Max 4000 characters per message

## 🐛 Troubleshooting

### "Cannot GET /" Error
- This is normal - the backend API doesn't have a root route
- Access the frontend at `http://localhost:5173/` instead

### "No endpoints found for model" Error
- Verify your Gemini API key is valid
- Check the model name in `.env` matches available Gemini models

### Chat not responding
- Ensure backend is running: `npm start` in `/backend`
- Check browser console for error messages
- Verify API key is correctly set in `backend/.env`
- Try restarting both frontend and backend servers

### Chat history not saving
- Check browser localStorage is enabled
- Try clearing browser cache and restarting
- Check browser console for storage quota errors

## 📝 Environment Variables Reference

### Backend (.env)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 5000 | Server port |
| `GEMINI_API_KEY` | Yes | - | Google Gemini API key |
| `GEMINI_MODEL` | No | gemini-pro | Gemini model to use |

### Frontend (.env)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_BASE_URL` | No | http://localhost:5000 | Backend API base URL |

## 🎨 Customization

### Change Bot Personality
Edit `backend/routes/chat.js` and modify the `systemMessage` content:
```javascript
const systemMessage = {
  role: 'system',
  content: 'Your custom system prompt here...'
}
```

### Customize UI Colors
Edit `frontend/src/index.css` or use TailwindCSS classes in components

### Add Custom Commands
Extend the chat handling logic in `frontend/src/App.jsx`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the ISC License.

## 🙋 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review API error messages for debugging hints

## 🚀 Deployment

### To Deploy Backend
- Use services like Heroku, Railway, or DigitalOcean
- Set environment variables on the hosting platform
- Ensure `PORT` environment variable is respected

### To Deploy Frontend
- Build: `npm run build` in `/frontend`
- Deploy the `dist/` folder to services like Vercel, Netlify, or GitHub Pages
- Update `VITE_API_BASE_URL` to your production backend URL

## 📌 Version History

- **v1.0.0** - Initial release with Lilbot personality and persistent chat history

---

**Built with ❤️ by [Your Name/Organization]**
