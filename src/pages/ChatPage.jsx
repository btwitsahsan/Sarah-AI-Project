import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { DOMAIN, MenuIcon, PlusIcon } from "../constants/CONSTANTS";
import LeftSection from "../Components/LeftSection";
import RightSection from "../Components/RightSection";
import axios from "axios";

export default function ChatPage() {
  const { chatId } = useParams();
  const [show, setShow] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [message, setMessage] = useState("");
  const [actualMessage, setActualMessage] = useState([]);

  useEffect(() => {
    const fetchChatData = async (chatID) => {
      setActualMessage([])
      try {
        const headers = {
          chat_id : chatId,
        }
        const response = await axios.post(`${DOMAIN}/get_message_by_chatID`, null , {headers});

        // console.log(response.data)
        const data = await response.data;
        // const updatedMessages = data.map((msg) => ({ ...msg, type: 'user' }));
        const updatedMessages = await data.map((msg) => ({ ...msg, }));

        setActualMessage(updatedMessages);

        // You can use updatedMessages for further processing or state updates
        // console.log(updatedMessages);
      } catch (error) {
        console.error('Failed to fetch chat data:', error);
      }
    };

    if (chatId) {
      fetchChatData(chatId); // Pass chatId to fetchChatData function
    }
  }, [chatId]);

  const handleChatMessageSend = async (e) => {
    e.preventDefault();
console.log(chatId);
    setActualMessage([...actualMessage, { text: message, type: 'user' }]);
    
    if (message.trim() === "") return;
    // setLoading(true);
   
      // Send the user message to the backend for storage
      const response = await axios.post(`${DOMAIN}/save_chat_message`, {
        chatID: chatId,
        text: message,
        type: 'user',
      });

console.log(response.data)

setMessage("");

try {
      const aiResponse = await handleMessageSend(message);
      setMessage(""); // Clear input field after sending message
      // setLoading(false);

      // Update actualMessage state to include user message and AI response
      setActualMessage((prevMessages) => [...prevMessages, { text: aiResponse, type: 'ai' }]);

        axios.post(`${DOMAIN}/save_chat_message`, {
        chatID: chatId,
        text: aiResponse,
        type: 'ai',
      });

    } catch (error) {
      console.error("Error sending message:", error);
      // setLoading(false);
    }
  };


  // const [loading, setLoading] = useState(false);

  const handleMessageSend = async (userMessage) => {
    // Simulating AI response (replace with actual API call to AI service)
    const aiResponse = `AI: Hi there! You said: "${userMessage}"`;

    // Simulate asynchronous delay (remove in production)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return aiResponse;
  };

  useEffect(() => {
    const savedMode = Cookies.get("lightMode");
    if (savedMode !== undefined) {
      setLightMode(savedMode === "true");
    }
  }, []);

  const toggleMode = () => {
    setLightMode((prevMode) => {
      const newMode = !prevMode;
      Cookies.set("lightMode", newMode.toString());
      return newMode;
    });
  };

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center border-b border-white/20 bg-gray-800 pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
        <button
          type="button"
          className={`-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center outline-none justify-center rounded-md focus:ring-1 focus:ring-white ${
            !show && "!ring-0"
          }`}
          onClick={() => setShow(!show)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuIcon />
        </button>
        <h1 className="flex-1 text-center text-base font-normal">New Chat</h1>
        <button type="button" className="px-3">
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>

      <LeftSection show={show} lightMode={lightMode} toggleMode={toggleMode} setActualMessage={setActualMessage}/>

      <RightSection
        chatId={chatId}
        lightMode={lightMode}
        message={message}
        setMessage={setMessage}
        handleChatMessageSend={handleChatMessageSend}
        actualMessage={actualMessage}
        setActualMessage={setActualMessage}
      />
    </div>
  );
}
