import React, { useState, useEffect } from "react";

import Cookies from "js-cookie";
import { MenuIcon, PlusIcon } from "./constants/CONSTANTS";
import LeftSection from "./Components/LeftSection";
import RightSection from "./Components/RightSection";
import LandingPage from "./pages/LandingPage";

export default function App() {
  const [show, setShow] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [message, setMessage] = useState("");
  const [actualMessage, setActualMessage] = useState([]);
  const handleMessageSend = (e) => {
    e.preventDefault();
    setActualMessage([...actualMessage, message]);
    setMessage("");
  };

  const token = Cookies.get("token");

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

  return token ? (
    <div>
      <div className="sticky top-0 z-10 flex items-center border-b border-white/20 bg-gray-800 pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
        <button
          type="button"
          className={`-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center outline-none justify-center rounded-md focus:ring-1 focus:ring-white ${
            !show && "!ring-0"
          } dark:hover:text-white text-gray-100`}
          onClick={() => setShow(!show)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuIcon />
        </button>
        <h1 className="flex-1 text-center text-base font-normal">New chat</h1>
        <button type="button" className="px-3">
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>

      <LeftSection
        {...{ show }}
        lightMode={lightMode}
        toggleMode={toggleMode}
      />

      <RightSection
        lightMode={lightMode}
        message={message}
        setMessage={setMessage}
        handleMessageSend={handleMessageSend}
        actualMessage={actualMessage}
      />
    </div>
  ) : (
    <LandingPage />
  );
}
