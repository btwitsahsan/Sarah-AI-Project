import React, { useState } from "react";
import {
  LogOutIcon,
  SunIcon,
  DeleteIcon,
  MoonIcon,
} from "../constants/CONSTANTS";
import NewChat from "./NewChat";
import { useNavigate } from "react-router-dom";

const LeftSection = ({ show = false, lightMode, toggleMode }) => {
  const [ChatList, setChatList] = useState([
    { id: "bba129c3-7736-4b49-8561-732b5175b698", text: "maths" },
    { id: "458b15f5-81c3-4d1f-8750-d81b4e570cd6", text: "equations" },
    { id: "68eedd0a-6e51-449b-bb17-88d6ba733a98", text: "linear graph" },
    { id: "bba129c3-7736-4b49-8561-732b5175b698", text: "maths" },
    { id: "458b15f5-81c3-4d1f-8750-d81b4e570cd6", text: "equations" },
    { id: "68eedd0a-6e51-449b-bb17-88d6ba733a98", text: "linear graph" },
  ]);

  const navigate = useNavigate();
  const handleAddTab = () => {
    const newItem = { id: Date.now(), text: "New chat" };
    setChatList((prevItems) => [...prevItems, newItem]);
  };

  const handleSingleDelete = (idToDelete) => {
    setChatList((prevItems) =>
      prevItems.filter((item) => item.id !== idToDelete)
    );
  };

  const handleUpdateChat = (id, newText) => {
    setChatList((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      )
    );
  };

  const clearConversations = async () => {
    try {
      // API call if needed here
      setChatList([]);
    } catch (error) {
      console.error("Failed to clear conversations:", error);
    }
  };
  const onChatClick = (id) => {
    navigate(`/chat/${id}`);
  };

  const renderNewChatButtons = () => {
    return ChatList.map((item, index) => (
      <NewChat
        key={index}
        id={item.id}
        text={item.text}
        NewChat={false}
        onClick={() => onChatClick(item.id)}
        onDelete={() => handleSingleDelete(item.id)}
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
            <NewChat NewChat={true} />
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
