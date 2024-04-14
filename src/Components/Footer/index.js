import React, { useState } from "react";
import { PlaneIcon, UserIcon,FiSend } from "../../constants";
import { DiVim } from "react-icons/di";

const Footer = ({ lightMode, message, handleMessageSend, setMessage,isTextareaFocused }) => {

  
  return (
   <>
   <div
      className={`bg-[#171923] pt-8 pb-2 absolute bottom-0 left-0 w-full ${lightMode
          ? "border-white-700 bg-vert-light-gradient bg-white/20 bg-[#C2C2C2]"
          : "border-transparent bg-[rgba(0, 0, 0, 0.24)]"
        }`}
    >
      <form className="mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6">
        <div className="relative flex h-full flex-1 md:flex-col ">
          <div className="ml-1 mt-1.5 md:w-full md:m-auto md:flex md:mb-2 gap-2 justify-center">
            <div className="text-gray-100 p-1 md:hidden">
              <UserIcon />
            </div>
          </div>
          {/* Input */}
          <div
            className={`flex flex-col w-full py-2 pl-3 flex-grow md:py-3 md:pl-4 relative    ${lightMode
                ? "border-black/10 bg-[#EDF2F7] "
                : "border-gray-900/50 text-white bg-[#3f4050] "
              } rounded-md ${isTextareaFocused ? 'border-blue-500' : ''}` }
          >
            <textarea
              value={message}
              onChange={(e) =>setMessage(e.target.value)}
              tabIndex="0"
              data-id="root"
              rows="1"
              className=" m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent outline-none overflow-y-hidden h-[20px]"
            ></textarea>
            <button
              className={`absolute p-1 rounded-md text-gray-400 bottom-1.5 right-1 md:bottom-2.5 md:right-2  ${lightMode ? "hover:bg-black" : "hover:bg-gray-700"
                }`}
              onClick={handleMessageSend}
            >
            
            <FiSend  className={`${!lightMode
                ? "text-white"
                : " text-black "
              } ` } />
            </button>
          </div>
        </div>
      </form>
      <div className="px-3 pt-2 pb-3 text-center text-sm text-gray-100/50 md:px-4 md:pt-3 md:pb-6 flex justify-center">
        <p className="lg:w-[50%]">Free Research Preview. Our goal is to make AI systems more natural and
        safe to interact with. Your feedback will help us improve.</p>
      </div>
    </div>

   </>
  );
};

export default Footer;
