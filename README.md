# Friday AI Voice Assistant

A sophisticated voice-to-voice AI chatbot inspired by Tony Stark's Friday assistant, built with React frontend and FastAPI backend.

## Features

- 🎤 **Voice Recognition** - Speak naturally to the AI
- 🔊 **Text-to-Speech** - AI responds with voice
- 🧠 **Advanced AI** - Powered by Ollama's Llama3 model
- 💭 **Conversation Memory** - Remembers context across conversations
- 🎭 **Personality** - Dark humor with flirtatious banter (Friday's personality)
- 🌐 **Web Interface** - Modern React-based chat interface

## Prerequisites

- Python 3.8+
- Node.js 16+
- Ollama installed ([Download here](https://ollama.ai/))

## Quick Setup

1. **Install Python dependencies:**
   ```bash
   python setup_ai.py
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the backend server:**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

4. **Start the frontend (in a new terminal):**
   ```bash
   npm run dev
   ```

5. **Open your browser to:** `http://localhost:5173`

## Manual Setup

If the automatic setup doesn't work:

1. **Install Python packages:**
   ```bash
   pip install fastapi uvicorn pydantic speech-recognition simpleaudio TTS ollama torch
   ```

2. **Install and setup Ollama:**
   ```bash
   # Install Ollama from https://ollama.ai/
   ollama pull llama3
   ```

3. **Install Node.js packages:**
   ```bash
   npm install
   ```

## Usage

1. Click the microphone button in the web interface
2. Speak your message
3. Friday will respond with both text and voice
4. Continue the conversation naturally

## API Endpoints

- `POST /api/chat` - Send messages to the AI
- `GET /health` - Check system status
- `GET /api/conversation` - Get conversation history
- `POST /api/clear` - Clear conversation history

## Configuration

Edit the configuration variables in `main.py`:

- `ASSISTANT_NAME` - Change the AI's name
- `TTS_SPEED` - Adjust speech speed
- `MAX_RESPONSE_LENGTH` - Limit response length
- `OLLAMA_MODEL` - Change the AI model

## Troubleshooting

**"AI systems are still initializing"**
- Wait a few moments for Ollama to start up
- Check that `ollama serve` is running

**Speech recognition not working**
- Ensure microphone permissions are granted
- Use Chrome or Edge browser for best compatibility

**TTS not working**
- Check that audio output is enabled
- Verify TTS model downloaded correctly

## Architecture

- **Frontend**: React with TypeScript, Tailwind CSS
- **Backend**: FastAPI with Python
- **AI Model**: Ollama Llama3
- **TTS**: Coqui TTS with VCTK voices
- **Speech Recognition**: Web Speech API

## License

MIT License - Feel free to modify and use as needed.