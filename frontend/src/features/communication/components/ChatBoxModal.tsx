import React, { useEffect, useState, useRef } from "react";
import MessageBubble from "./MessageBubble";
import io from "socket.io-client";
import { useUser } from "../../../context/UserContext";
import useClaudeSonnet from "../hooks/useClaudeSonnet";
import { userToString } from "../../../types/User";

interface User {
  id: number;
  name: string;
}

const socket = io("http://localhost:5000");

const ChatBoxModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  /* For tab switching */
  const [currUserIndex, setCurrUserIndex] = useState(0);
  const users: User[] = [
    { id: 0, name: "Partner" },
    { id: 1, name: "AI" },
  ];

  const [message, setMessage] = useState(""); // Message input field
  const [partnerMessages, setPartnerMessages] = useState<
    { text: string; isUser: boolean }[]
  >([]);
  const [aIMessages, setAIMessages] = useState<
    { text: string; isUser: boolean }[]
  >([]);

  /* For chat with partner */
  const { user, roomId, updatePartnerMessages, getPartnerMessages } = useUser();
  const userId = user?.id;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [unreadPartnerCount, setUnreadPartnerCount] = useState(9);
  const [unreadAICount, setUnreadAICount] = useState(9);

  const unreadCountToString = (unreadCount: number) => {
    if (unreadCount < 99) {
      return unreadCount.toString();
    } else {
      return ("99+");
    }
  }

  // Reset unread counts when opened
  useEffect(() => {
    if (isOpen) {
      if (currUserIndex == 0) {
        setUnreadPartnerCount(0);
      } else {
        setUnreadAICount(0);
      }
    }
  }, [isOpen, currUserIndex]);

  // Get local storage messages on mount
  useEffect(() => {
    const storedPartnerMessages = getPartnerMessages();
    if (storedPartnerMessages.length > 0) {
      //console.log("setting MSGS");
      setPartnerMessages(storedPartnerMessages);
    }
  }, []);
  

  /* Watch for messages from partner */
  useEffect(() => {
    console.log("USER " + userToString(user) + roomId);
    
    /* Join chat room */
    if (roomId) {
      socket.emit("joinRoom", { userId, roomId });

      socket.on("receiveMessage", (message: string) => {
        setPartnerMessages((prevMessages) => [
          ...prevMessages,
          { text: message, isUser: false },
        ]);
        if (!isOpen || currUserIndex != 0) {
          setUnreadPartnerCount(unreadPartnerCount + 1);
        }
      });

      updatePartnerMessages(partnerMessages);

      return () => {
        socket.off("receiveMessage");
      };
    }
  }); // Run on every reload

  /* Send messages to partner */
  const sendPartnerMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId) {
      // Empty roomId
      alert("Invalid chat room, please try again.");
      return;
    }
    if (message.trim()) {
      socket.emit("sendMessage", { roomId, message });
      setPartnerMessages((prevMessages) => [
        ...prevMessages,
        { text: message, isUser: true },
      ]);
      setMessage(""); // Clear the message input

      // For temporary chat storage
      updatePartnerMessages(partnerMessages);
    }
  };

  const { sendAIMessage, aiResponse, isLoading, error } = useClaudeSonnet();

  // Watch for changes in aiResponse and add to AI messages
  useEffect(() => {
    if (aiResponse) {
      setAIMessages((prevMessages) => [
        ...prevMessages,
        { text: aiResponse, isUser: false },
      ]);
      if (!isOpen || currUserIndex != 1) {
        setUnreadAICount(unreadAICount + 1);
      }
    }
  }, [aiResponse]);

  const handleAIMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setAIMessages((prevMessages) => [
        ...prevMessages,
        { text: message, isUser: true },
      ]);
      setMessage(""); // Clear the message input
    }

    // Call the sendAIMessage function
    await sendAIMessage(message);

    if (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [partnerMessages, aIMessages, isLoading, isOpen, currUserIndex]);

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  const handleTabClick = (index: number) => {
    setCurrUserIndex(index);
    console.log("CURR INDEX " + index);
  };

  return (
    <div className="fixed bottom-5 right-12 justify-items-end mr-4">
      <div
        className="relative"
      >
        {/* Unread messages count */}
        {((unreadPartnerCount + unreadAICount) > 0 ) ? 
          (<p
            className="absolute bottom-7 right-12 h-8 w-8 max-w-8 max-h-8 bg-green rounded-full m-2 text-center text-white text-sm border-2 border-white"
          >
            {unreadCountToString(unreadPartnerCount + unreadAICount)}
          </p>) : (<></>)
        }

        {/* Open/close chat button*/}
        <button
          className={`${
            isOpen ? "bg-gray-900 hover:bg-gray-500" : "bg-yellow hover:bg-amber-300"
          } text-white py-3 px-4 rounded-full`}
          onClick={toggleChatBox}
        >
          {isOpen ? "Close" : "Chat"}
        </button>
      </div>
      
      {/* Actual chat box */}
      {isOpen && (
        <div
          id="chatBox"
          className="bg-white px-3 pb-3 shadow-lg rounded-lg mt-2 w-80"
        >
          {/* Tabs for User Switching */}
          <div className="flex">
            {users.map((user, index) => (
              <button
                key={user.id}
                className={`-mx-4 flex-1 py-2 rounded-t-lg ${
                  currUserIndex === index
                    ? "bg-yellow text-white"
                    : "bg-gray-300 text-black"
                }`}
                onClick={() => handleTabClick(index)}
              >
                {user.name} 
                {(user.id === 0 && unreadPartnerCount > 0) ? ` (${unreadCountToString(unreadPartnerCount)})` : ''}
                {(user.id === 1 && unreadAICount > 0) ? ` (${unreadCountToString(unreadAICount)})` : ''}
              </button>
            ))}
          </div>

          {/* Separator Line */}
          <div className="-mx-4 border-b border-black mb-2" />

          <h2 className="text-black text-2xl font-bold">
            Chat with {users[currUserIndex].name}
          </h2>

          {/* Messages */}
          <div className="flex flex-col h-64 overflow-y-auto mb-4">
            {currUserIndex == 0
              ? partnerMessages.map((msg, index) => (
                  <MessageBubble
                    key={index}
                    message={msg.text}
                    isUser={msg.isUser}
                  />
                ))
              : aIMessages.map((msg, index) => (
                  <MessageBubble
                    key={index}
                    message={msg.text}
                    isUser={msg.isUser}
                  />
                ))}
            {/* Loading indicator for AI response */}
            {currUserIndex === 1 && isLoading && (
              <div className="text-gray-500 text-sm italic mt-2">
                AI is typing...
              </div>
            )}
            {/* Invisible div to anchor scroll */}
            <div ref={messagesEndRef} />
          </div>

          {/* Action buttons */}
          <div className="mt-6">
            <form
              className="flex"
              onSubmit={
                currUserIndex == 0 ? sendPartnerMessage : handleAIMessage
              }
            >
              <input
                type="text"
                className="border rounded-l p-2 flex-grow text-black shadow-md"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-300 text-white rounded-r p-2 shadow-md"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBoxModal;
