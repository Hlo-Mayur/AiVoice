import React, { useState } from 'react';
import { Mic } from 'lucide-react';
import './styles.css';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your voice assistant. Click the microphone to start talking.", sender: 'bot' }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessageToBackend = async (message: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Add bot's reply to messages
      setMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);
      
      // Make the bot speak the response
      speakResponse(data.reply);
    } catch (error) {
      console.error('Error sending message to backend:', error);
      const errorMessage = "Sorry, I'm having trouble connecting to the server. Please try again.";
      setMessages(prev => [...prev, { 
        text: errorMessage, 
        sender: 'bot' 
      }]);
      
      // Speak the error message too
      speakResponse(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const speakResponse = (text: string) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create new speech utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Optional: Configure voice settings
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0; // Normal pitch
    utterance.volume = 1.0; // Full volume
    
    // Speak the response
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    // Create speech recognition instance
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // Configure recognition settings
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    // Set listening state
    setIsListening(true);

    // Handle successful recognition
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      
      // Add user message to conversation
      setMessages(prev => [...prev, { text: transcript, sender: 'user' }]);
      
      // Send transcript to backend
      sendMessageToBackend(transcript);
      
      setIsListening(false);
    };

    // Handle recognition errors
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      if (event.error === 'no-speech') {
        setMessages(prev => [...prev, { text: "I didn't hear anything. Please try again.", sender: 'bot' }]);
      } else if (event.error === 'not-allowed') {
        alert('Microphone access denied. Please allow microphone access and try again.');
      } else if (event.error === 'network') {
        setMessages(prev => [...prev, { text: "There was a network error with speech recognition. Please check your internet connection and try again.", sender: 'bot' }]);
      }
    };

    // Handle recognition end
    recognition.onend = () => {
      setIsListening(false);
    };

    // Start recognition
    recognition.start();
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Voice Chatbot</h1>
      </div>
      
      <div className="messages-container">
        <div className="messages-display">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <div className="message-content">
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="input-container">
        <button 
          className={`mic-button ${isListening ? 'recording' : ''}`} 
          type="button"
          onClick={startListening}
          disabled={isListening}
        >
          <Mic size={24} />
        </button>
      </div>
    </div>
  );
}

export default App;
