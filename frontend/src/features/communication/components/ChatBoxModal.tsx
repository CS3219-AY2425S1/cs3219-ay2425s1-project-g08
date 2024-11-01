import React, { useState } from "react";
import MessageBubble from "./MessageBubble";

interface User {
  id: number;
  name: string;
}

const ChatBoxModal: React.FC = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ message, setMessage ] = useState('');
  const [ messages, setMessages ] = useState<{ text: string; isUser: boolean }[]>([]);
  const [ currUserIndex, setCurrUserIndex ] = useState(0);

  const users: User[] = [
    { id: 1, name: 'Partner' },
    { id: 2, name: 'AI' },
  ];

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  }

  /* for testing purposes */
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, { text: message, isUser: true}]);
      setMessage('');
    }

    // Simulate a response from another sender
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `This is a response from ${users[currUserIndex].name}`, isUser: false },
      ]);
    }, 1000);
  };

  const handleTabClick = (index: number) => {
    setCurrUserIndex(index);
    setMessages([]); // Clear messages when switching users
  };

  return (
    <div className="fixed bottom-5 right-8 justify-items-end">
      <button
        className={`${isOpen ? 'bg-black' : 'bg-yellow'} text-white p-3 rounded-3xl shadow-lg`}
        onClick={toggleChatBox}
      >
        {isOpen ? "Close" : "Chat"}
      </button>
      
      
      {isOpen && (
        <div
          id="chatBoxModal"
          className="bg-white border border-gray-300 px-3 pb-3 shadow-lg rounded-lg mt-2 w-80"
        >
          {/* Tabs for User Switching */}
          <div className="flex">
            {users.map((user, index) => (
              <button
                key={user.id}
                className={`-mx-4 flex-1 py-2 rounded-t-lg ${
                  currUserIndex === index
                    ? 'bg-yellow text-white'
                    : 'bg-gray-300 text-black'
                }`}
                onClick={() => handleTabClick(index)}
              >
                {user.name}
              </button>
            ))}
          </div>

          {/* Separator Line */}
          <div className="-mx-4 border-b border-black mb-2" />

          <h2 className="text-black text-2xl font-bold">
            Chat with {users[currUserIndex].name}
          </h2>

          { /* Messages */ }
          <div className="flex flex-col h-64 overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <MessageBubble key={index} message={msg.text} isUser={msg.isUser} />
            ))}
          </div>

          {/* Action buttons */}
          <div className="mt-6">
            <form onSubmit={handleSendMessage} className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border border-gray-700 rounded-l p-2 flex-grow text-black"
                placeholder="Type your message..."
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-r p-2"
              >
                Send
              </button>
            </form>
          </div>
        </div>)}
    </div>
  );
};

export default ChatBoxModal;
