import React from "react";

const MessageIcon = ({ className = "h-6 w-6", strokeWidth = "2" }) => {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );
};

export default MessageIcon;
