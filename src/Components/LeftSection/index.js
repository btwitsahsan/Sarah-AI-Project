import React, { useState } from "react";
import { LogOutIcon, SunIcon, DeleteIcon, MoonIcon } from "../../constants";
import NewChat from "../NewChat";

const LeftSection = ({ show = false, lightMode, toggleMode }) => {
  const [countNewTab, setCountNewTab] = useState([]);

  const handleAddTab = () => {
    const newItem = { id: Date.now() };
    setCountNewTab((prevItems) => [...prevItems, newItem]);
  };

  const handleSingleDelete = (idToDelete) => {
    setCountNewTab((prevItems) =>
      prevItems.filter((item) => item.id !== idToDelete)
    );
  };

  const renderNewChatButtons = () => {
    return countNewTab.map((item) => (
      <NewChat
        key={item.id}
        id={item.id}
        // Directly pass the handleSingleDelete function with the specific item's id
        onDelete={() => handleSingleDelete(item.id)} // This is the key change
        newchat={true}
      />
    ));
  };

  return (
    <div
      className={`${
        show ? "flex flex-col" : "hidden"
      } bg-[#171923] md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col`}
    >
      <div className="flex h-full min-h-0 flex-col ">
        <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
          <nav className="flex h-full overflow-y-auto flex-1 flex-col space-y-1 p-2">
            <div onClick={handleAddTab} className="mb-6">
              <NewChat />
            </div>
            <div className="flex h-full overflow-y-auto  flex-col space-y-1 p-2">
              {renderNewChatButtons()}
            </div>
            <div className="flex-col flex-1 overflow-y-auto border-b border-white/20">
              <div className="flex flex-col gap-2 text-gray-100 text-sm">
                {/*  */}
              </div>
            </div>
            <div
              onClick={() => {
                setCountNewTab([]);
              }}
              className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
            >
              <DeleteIcon
                className="h-4 w-4 text-white font-bold cursor-pointer"
                strokeWidth="2"
              />
              Delete Conversations
            </div>
            <a
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
            </a>

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
    </div>
  );
};

export default LeftSection;
