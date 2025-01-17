"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";

type Message = {
  sender: "user" | "bot";
  text: string;
};

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false); // Toggle visibility

  const [isBottom, setIsBottom] = useState<boolean>(true);
  // Function to toggle chatbox and reset messages
  const toggleChatbox = (visible: boolean) => {
    setIsVisible(visible);
    if (visible) {
      // Reset messages and add the first bot message
      const firstMessage: Message = { sender: "bot", text: "Hi! How can I assist you today?" };
      setMessages([firstMessage]);
    }
  };
  // Monitor user scroll to adjust bot icon position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsBottom(false); // Move icon to bottom-24
      } else {
        setIsBottom(true); // Keep icon at bottom-0
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Automatically show chatbot after 6 seconds on initial load
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      toggleChatbox(true);
    }, 6000); // 6 seconds

    return () => clearTimeout(initialTimer); // Cleanup the timer
  }, []);

  // Monitor user inactivity
  useEffect(() => {
    const inactivityTimer = setTimeout(() => {
      if (!isVisible) {
        toggleChatbox(true);
        const inactiveMessage: Message = { sender: "bot", text: "Need any help? I'm here!" };
        setMessages([inactiveMessage]);
      }
    }, 15000);
    const handleActivity = () => clearTimeout(inactivityTimer);

    // Add event listeners for user activity
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("scroll", handleActivity);
    window.addEventListener("keydown", handleActivity);

    return () => {
      clearTimeout(inactivityTimer); // Cleanup the timer
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, [isVisible]); // Re-run on visibility change

  const handleSend = async (): Promise<void> => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    // API-based response
    try {
      const response = await axios.post<{ reply: string }>("/api/chatbot", { message: input });
      const botMessage: Message = { sender: "bot", text: response.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      const errorMessage: Message = { sender: "bot", text: "Sorry, I couldn't process that!" };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <>
      {/* Bot icon to toggle the chatbot */}
      {!isVisible && (
        <button
          onClick={() => toggleChatbox(true)}
          className={`fixed ${
            isBottom ? "bottom-6" : "bottom-24"
          } right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none z-50 transition-all duration-300`}
        >
          <FontAwesomeIcon icon={faRobot} size="lg" />
        </button>
      )}

      {/* Chatbox */}
      {isVisible && (
        <div className="fixed bottom-0 right-0 w-full max-w-xs  bg-white rounded-lg shadow-lg overflow-hidden z-50">
          {/* Chatbox Header */}
          <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
            <span className="text-sm md:text-base">Chat with us</span>
            <button
              onClick={() => toggleChatbox(false)}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <FontAwesomeIcon icon={faChevronDown} size="lg" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="h-72 md:h-96 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  } items-center`}
                >
                  {msg.sender === "bot" && (
                    <FontAwesomeIcon
                      icon={faRobot}
                      className="text-blue-500 mr-2"
                      size="lg"
                    />
                  )}
                  <div
                    className={`${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white text-wrap"
                        : "bg-gray-200 text-gray-800 text-wrap"
                    } px-4 py-2 rounded-lg max-w-xs`}
                  >
                    {msg.text}
                  </div>
                  {msg.sender === "user" && (
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-blue-500 ml-2"
                      size="lg"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Input Field */}
            <div className="p-4 border-t border-gray-300 flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend(); // Call handleSend on Enter key press
                }}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
