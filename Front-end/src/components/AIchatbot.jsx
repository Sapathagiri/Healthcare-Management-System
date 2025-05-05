import React, { useState } from 'react';
import axios from 'axios';  // Import axios to make API requests

function AIchatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Function to call OpenAI API
  const getAIResponse = async (userMessage) => {
    try {
      const response = await axios.post('http://localhost:11434/api/generate', {
        model: "llama3.2",  // You can choose any model you prefer
        prompt: userMessage,
       
      });
      const jsonStrings = response.data.trim().split("\n");
      const jsonObjects = jsonStrings.map((line) => JSON.parse(line));
      const fullResponse = jsonObjects.map((obj) => obj.response).join("");
      return fullResponse
    } catch (error) {
      console.error("Error fetching AI response", error);
      return "Sorry, I couldn't process that.";
    }
  };

//   const response = await axios.post("http://localhost:11434/api/generate", {
//     model: "llama3.2",
//     prompt: userInput,
// });

  const handleSendMessage = async () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');
      
      // Get AI response from OpenAI
      const aiResponse = await getAIResponse(message);

      // Add AI response to messages
      setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      {isOpen && (
        <div className="w-80 h-96 bg-white shadow-lg rounded-lg border">
          <div className="p-4 bg-blue-600 text-white rounded-t-lg">
            AI Chatbot
          </div>
          <div className="h-64 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-2 p-2 rounded ${msg.sender === 'user' ? 'bg-blue-100 text-right ml-10' : 'bg-gray-100 text-left mr-10'}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-4 flex">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-2 border rounded-l"
              placeholder="Type your message"
            />
            <button 
              onClick={handleSendMessage}
              className="bg-blue-600 text-white p-2 rounded-r"
            >
              Send
            </button>
          </div>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        {isOpen ? 'Close' : 'Chat'}
      </button>
    </div>
  );
}

export default AIchatbot;
