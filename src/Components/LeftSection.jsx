import React, { useEffect, useState } from "react";
import {
  LogOutIcon,
  SunIcon,
  DeleteIcon,
  MoonIcon,
  DOMAIN,
  MessageIcon,
  PlusIcon,
} from "../constants/CONSTANTS";
import NewChat from "./NewChat";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { MoreVertical } from "react-feather";

const LeftSection = ({ show = false, lightMode, toggleMode }) => {
  const [ChatList, setChatList] = useState([]);
  const token = Cookies.get("token");

  const fetchChats = async () => {
    try {
      const response = await fetch(`${DOMAIN}/get_chatlist`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Chat List data : ", data);
      if (response.ok) {
        setChatList(data.chats);
      } else {
        console.error("Failed to fetch chats:", data.message);
      }
    } catch (error) {
      console.error("Error fetching chat lists:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchChats();
    }
  }, [token]);

  const navigate = useNavigate();
  const handleAddTab = async () => {
    try {
      const response = await fetch(`${DOMAIN}/new_chat_on_list`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      const newChat = await response.json();
      if (response.ok) {
        setChatList((prevChats) => [
          ...prevChats,
          { chatID: newChat.chatID, text: newChat.text },
        ]);
      } else {
        console.error("Failed to create new chat:", newChat.message);
      }
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  const handleUpdateChat = async (chatID, newText) => {
    try {
      const response = await fetch(`${DOMAIN}/edit_chat_text`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatID, newText }),
      });

      const data = await response.json();
      if (response.ok) {
        setChatList((prevItems) =>
          prevItems.map((item) =>
            item.chatID === chatID ? { ...item, text: newText } : item
          )
        );
      } else {
        console.error("Failed to update chat:", data.message);
      }
    } catch (error) {
      console.error("Error updating chat:", error);
    }
  };

  const handleSingleDelete = async (chatID) => {
    try {
      const response = await fetch(`${DOMAIN}/delete_chat`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatID }),
      });

      const data = await response.json();
      if (response.ok) {
        setChatList((prevItems) =>
          prevItems.filter((item) => item.chatID !== chatID)
        );
      } else {
        console.error("Failed to delete chat:", data.message);
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  const clearConversations = async () => {
    try {
      setChatList([]);
    } catch (error) {
      console.error("Failed to clear conversations:", error);
    }
  };
  const onChatClick = (chatID) => {
    navigate(`/chat/${chatID}`);
  };

  const renderNewChatButtons = () => {
    return ChatList.map((item, index) => (
      <NewChat
        key={index}
        id={item.chatID}
        text={item.text}
        NewChat={false}
        onClick={() => onChatClick(item.chatID)}
        onDelete={() => handleSingleDelete(item.chatID)}
        onUpdate={handleUpdateChat}
      />
    ));
  };

  return (
    <div
      className={`${
        show ? "flex" : "hidden"
      } flex-col bg-[#171923] md:fixed md:inset-y-0 md:flex md:w-[260px]`}
    >
      <div className="flex h-full min-h-0 flex-col">
        <nav className="flex h-full overflow-y-auto flex-1 flex-col space-y-1 p-2 font-bold">
          <div onClick={handleAddTab} className="mb-2 text-2xl">
            <div className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20">
              <PlusIcon />
              New Chat
            </div>
          </div>
          <div className="flex h-full overflow-y-auto flex-col space-y-1">
            {renderNewChatButtons()}
          </div>
          <div
            onClick={clearConversations}
            className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
          >
            <DeleteIcon
              className="h-4 w-4 text-white font-bold cursor-pointer"
              strokeWidth="2"
            />
            Delete Conversations
          </div>
          <div
            className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
            onClick={toggleMode}
          >
            {lightMode ? (
              <MoonIcon
                className="h-4 w-4 text-white font-bold cursor-pointer"
                strokeWidth="2"
              />
            ) : (
              <SunIcon
                className="h-4 w-4 text-white font-bold cursor-pointer"
                strokeWidth="2"
              />
            )}
            {lightMode ? "Dark mode" : "Light mode"}
          </div>
          <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
            <LogOutIcon
              className="h-4 w-4 text-white font-bold cursor-pointer"
              strokeWidth="2"
            />
            Log out
          </a>
        </nav>
      </div>
    </div>
  );
};

export default LeftSection;
