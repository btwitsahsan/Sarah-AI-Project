import React, { useState } from "react";
import { MessageIcon, ThreeDotsVertical } from "../constants/CONSTANTS";

const NewChat = ({ id, text, onDelete, onUpdate, onClick }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [showMenu, setShowMenu] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setShowMenu(false); // Hide menu when editing
  };

  const handleTextChange = (event) => {
    setEditText(event.target.value);
  };

  const handleBlur = () => {
    if (editText !== text) {
      onUpdate(id, editText); // Update only if text has changed
    }
    setIsEditing(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleBlur();
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Wrap content click logic to avoid interaction when editing
  const handleClick = () => {
    if (!isEditing) {
      onClick();
    }
  };

  return (
    <div
      className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20"
      onClick={handleClick}
    >
      <MessageIcon />
      {isEditing ? (
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
        <span>{text}</span>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Stop click event from bubbling to parent div
          toggleMenu();
        }}
        className="ml-auto"
      >
        <ThreeDotsVertical />
      </button>
      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
          <ul>
            <li
              onClick={handleEdit}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Rename
            </li>
            <li
              onClick={onDelete}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Delete
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NewChat;
