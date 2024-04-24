import React, { useEffect, useRef } from "react";
import {
  CautionIcon,
  LightningChargeIcon,
  SunIcon,
} from "../constants/CONSTANTS";
import Footer from "../Footer";
import Scrollbars from "react-custom-scrollbars";

const RightSection = ({
  lightMode,
  message,
  handleChatMessageSend,
  setMessage,
  actualMessage,
  id,
}) => {
  const messageContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [actualMessage]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      // Scroll to the bottom of the scrollable container
      messageContainerRef.current.scrollToBottom();
    }
  };

  return (
    <div className="flex h-full flex-1 flex-col md:pl-[260px] font-semibold">
      <main className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
        <div className="flex-1 overflow-hidden">
          <div
            className={`flex flex-col items-center text-sm h-full md:h-screen ${
              lightMode ? "bg-white text-black" : "bg-[#1A202C] text-white"
            }`}
          >
            <div>{id}</div>

            <div className="w-full md:max-w-3xl lg:max-w-5xl md:h-full md:flex md:flex-col px-6  ">
              <div></div>
              {actualMessage.length === 0 && (
                <h1
                  className={`text-3xl font-bold text-center mt-4 sm:mt-[10vh] ml-auto mr-auto mb-10 sm:mb-16`}
                >
                  SarahAI
                </h1>
              )}
              {actualMessage.length === 0 && !id ? (
                <div className="md:flex  items-start text-center gap-2 text-[15px] flex-wrap">
                  {[
                    {
                      icon: <SunIcon />,
                      title: "Examples",
                      subTitle: [
                        `"Explain quantum computing in simple terms" →`,
                        `"Got any creative ideas for a 10 year old’s birthday?" →`,
                        `"How do I make an HTTP request in Javascript?" →`,
                      ],
                      hover: true,
                    },
                    {
                      icon: <LightningChargeIcon />,
                      title: "Capabilities",
                      subTitle: [
                        `Remembers what user said earlier in the conversation`,
                        `Allows user to provide follow-up corrections`,
                        `Trained to decline inappropriate requests`,
                      ],
                      hover: false,
                    },
                    {
                      icon: <CautionIcon />,
                      title: "Limitations",
                      subTitle: [
                        `May occasionally generate incorrect information`,
                        `May occasionally produce harmful instructions or biased content`,
                        `Limited knowledge of world and events after 2021`,
                      ],
                      hover: false,
                    },
                  ].map((item, index) => (
                    <div
                      className="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1"
                      key={index}
                    >
                      <h2
                        className={`flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2 ${
                          lightMode ? "text-black" : "text-white"
                        }`}
                      >
                        {item.icon}
                        {item.title}
                      </h2>
                      <ul className="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                        {item.subTitle.map((subTitle, subTitleIndex) => (
                          <button
                            className={`w-full  bg-gray-50 text-gray-100 bg-white/5 p-3 rounded-md ${
                              item.hover
                                ? ` ${
                                    !lightMode
                                      ? "hover:bg-white/10"
                                      : "hover:bg-gray-200"
                                  }   cursor-pointer `
                                : "cursor-text"
                            } ${
                              lightMode
                                ? "text-black bg-slate-100"
                                : "text-white"
                            }`}
                            key={subTitleIndex}
                          >
                            {subTitle}
                          </button>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <Scrollbars
                style={{ width: "100%", height: "100%", maxHeight: "80vh" }}
                ref={messageContainerRef}
              >
                  <div ref={messageContainerRef} className="message-container max-h-80">
                    <ul className="text-left w-full">
                      {actualMessage.map((msg, index) => (
                        <li
                          key={index}
                          className={`mb-6 flex justify-start items-start w-11/12`}
                        >
                          {/* Avatar */}
                          {msg.type === "user" ? (
                            <img
                              className="rounded-full mr-3"
                              src="https://6603e9727d102e8360a41180--zippy-madeleine-28524d.netlify.app/assets/user-81892afe.png"
                              alt="person"
                              width={40}
                              height={40}
                            />
                          ) : (
                            <img
                              className="rounded-full mr-3"
                              src="https://via.placeholder.com/40"
                              alt="ai"
                              width={40}
                              height={40}
                            />
                          )}

                          {/* Chat bubble */}
                          <div
                            className={`rounded-lg px-2 w-full`}
                          >
                            {msg.type === "user" ? (
                              <span className="font-bold text-lg">You</span>
                            ) : (
                              <span className="font-bold text-lg">Sarah AI</span>
                            )}
                            <p className="text-sm w-full break-words">{msg.text}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Scrollbars>
              )}
            </div>
            <div className="w-full h-40 flex-shrink-0"></div>
          </div>
        </div>

        <Footer
          lightMode={lightMode}
          message={message}
          handleChatMessageSend={handleChatMessageSend}
          setMessage={setMessage}
        />
      </main>
    </div>
  );
};

export default RightSection;
