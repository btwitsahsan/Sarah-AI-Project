import React, { useState } from "react";
import { PlusIcon, MessageIcon, DeleteIcon } from "../constants/CONSTANTS";

const NewChat = ({ id, text, NewChat, onDelete, onUpdate, onClick }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleTextChange = (event) => {
    setEditText(event.target.value);
  };

  const handleBlur = () => {
    if (editText !== text) {
      onUpdate(id, editText);
    }
    setIsEditing(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <a
      onClick={onClick}
      className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20"
    >
      {NewChat ? <PlusIcon /> : <MessageIcon />}
      {!NewChat ? (
        isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={handleTextChange}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            autoFocus
            className="bg-transparent border-none text-white focus:ring-0"
          />
        ) : (
          <span onClick={handleEdit}>{text}</span>
        )
      ) : (
        "New chat"
      )}
      {!NewChat && (
        <button onClick={onDelete} className="ml-auto">
          <DeleteIcon />
        </button>
      )}
    </a>
  );
};

export default NewChat;
