import React from "react";
import { CautionIcon, LightningChargeIcon, SunIcon } from "../../constants";
import Footer from "../Footer";

const RightSection = ({
  lightMode,
  message,
  handleMessageSend,
  setMessage,
  actualMessage,
}) => {
  return (
    <div className="flex h-full flex-1 flex-col md:pl-[260px]">
      <main className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
        <div className="flex-1 overflow-hidden">
          <div
            className={`flex flex-col items-center text-sm h-full md:h-screen ${
              lightMode ? "bg-white text-black" : "bg-[#1A202C] text-white"
            }`}
          >
            <div className="w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6 ">
              <h1
                className={`text-4xl font-semibold text-center mt-2 sm:mt-[10vh] ml-auto mr-auto mb-10 sm:mb-16`}
              >
                SarahAI
              </h1>
              {actualMessage.length === 0 ? (
                <div className="md:flex  items-start text-center gap-3.5">
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
                <div className="message-container overflow-y-auto max-h-80">
                  <ul className="text-left">
                    {actualMessage.map((msg, index) => (
                      <li key={index} className="mb-3">
                        {msg}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="w-full h-48 flex-shrink-0"></div>
          </div>
        </div>

        <Footer
          lightMode={lightMode}
          message={message}
          handleMessageSend={handleMessageSend}
          setMessage={setMessage}
        />
      </main>
    </div>
  );
};

export default RightSection;