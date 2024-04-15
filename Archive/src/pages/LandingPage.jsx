import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex  ">
      <div class="hidden md:block w-[60%] h-[100vh] bg-[#000080] text-bold text-2xl text-[#d292ff] px-6 py-12">
        Sarah-AI
        <p class=" md:text-2xl w-[50%] my-48">
          This is a system that will provide requested questions, answers to its
          users
        </p>
      </div>

      <div className="flex flex-col  text-white justify-center items-center w-[100%] md:w-[40%] h-[100vh] bg-[#000000] ">
        <h2 className="text-3xl my-5"> Get Started</h2>
        <div className="flex flex-col md:flex-row  justify-between">
          <button
            onClick={() => {
              navigate("/signin");
            }}
            className="bg-[#000080] my-2 mx-2 px-20 md:px-12  py-2 border rounded-3xl"
          >
            Login
          </button>
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="bg-[#000080] my-2 mx-2 px-20 md:px-12 py-2 border rounded-3xl"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
