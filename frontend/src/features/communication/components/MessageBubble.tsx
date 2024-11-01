import React from 'react';

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isUser }) => {
  return (
    <div
      className={`p-2 rounded mb-2 text-black ${
        isUser ? 'bg-yellow text-right ml-auto' : 'bg-gray-300 text-left'
      }`}
      style={{
        maxWidth: '75%', // Limit width of the message bubble
      }}
    >
      <span className="whitespace-normal break-words">{message}</span>
    </div>
  );
};

export default MessageBubble;
