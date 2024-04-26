import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LogOutIcon,
  SunIcon,
  DeleteIcon,
  MoonIcon,
  DOMAIN,
} from "../constants/CONSTANTS";
import NewChat from "./NewChat";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LeftSection = ({ show = false, lightMode, toggleMode ,setActualMessage }) => {
  const [chatList, setChatList] = useState([]);
  const navigate = useNavigate();

  const getAuthHeaders = () => {
    const token = Cookies.get("token");
    const headers = {
      Authorization: `${token}`,
    };
    return headers;
  };

  const fetchData = async () => {
    try {
      const headers =  getAuthHeaders();
      const response = await axios.post(`${DOMAIN}/get_chatlist`, null, { headers });
      setChatList(response.data.chats); // Assuming API response is an array of chat objects
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
    // eslint-disable-next-line
  }, []);

  const handleSingleDelete = async (idToDelete) => {
    try {
      const headers =  getAuthHeaders();
      await axios.post(`${DOMAIN}/delete_chat`,{ chatID: idToDelete }, { headers });
      setChatList((prevItems) =>
        prevItems.filter((item) => item.chatID !== idToDelete)
      );
      setActualMessage([]);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleUpdateChat = async (id, newText) => {

    console.log(id)
    try {
      const headers =  getAuthHeaders();
      await axios.post(`${DOMAIN}/edit_chat_text`, {chatID: id, newText: newText }, { headers });
      setChatList((prevItems) =>
        prevItems.map((item) =>
          item.chatID === id ? { ...item, text: newText } : item
        )
      );
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  const clearConversations = async () => {
    try {
      const headers =  getAuthHeaders();
      await axios.post(`${DOMAIN}/delete_All_chat`, null, { headers });
      setChatList([]);
      navigate("/");
    } catch (error) {
      console.error("Failed to clear conversations:", error);
    }
  };

  const handleAddTab = async () => {
    try {
      const headers =  getAuthHeaders();
      const response = await axios.post(`${DOMAIN}/new_chat_on_list`, null, { headers });
      const newItem = response.data; 
      setChatList((prevItems) => [...prevItems, newItem]);
    } catch (error) {
      console.error("Failed to add new chat:", error);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
    window.location.reload();
  };

  const onChatClick = (id) => {
    navigate(`/chat/${id}`);
  };

  const renderNewChatButtons = () => {
    
    return chatList.map((item) => (
      <NewChat
        key={item.id}
        id={item.id}
        chatID={item.chatID}
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
          <a href className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm" onClick={handleLogout}>
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
