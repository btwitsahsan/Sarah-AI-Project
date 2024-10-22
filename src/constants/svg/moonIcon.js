import React from "react";

const MoonIcon = ({ className = "h-6 w-6", strokeWidth = "2" }) => {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  );
};

export default MoonIcon;
