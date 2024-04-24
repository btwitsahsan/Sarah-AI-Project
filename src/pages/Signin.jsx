import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie
import { DOMAIN } from "../constants/CONSTANTS";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg sm:w-96 w-80"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
          Sign In
        </h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string()
              .required("Password is required")
              .min(6, "Password must be at least 6 characters"),
          })}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              const response = await axios.post(`${DOMAIN}/login`, values);
              Cookies.set("token", response.data.token);
              navigate("/");
            } catch (error) {
              console.error("Login Error:", error);
              if (error.response && error.response.data) {
                
                const message = error.response.data.message || "Unknown error";
                setFieldError("email", message);
                setFieldError("password", message);
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="mt-1 block w-full h-10 px-4 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-gray-800 placeholder-gray-500 sm:text-sm"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="mt-1 block w-full h-10 px-4 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-gray-800 placeholder-gray-500 sm:text-sm"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white py-2 rounded-md font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition duration-300"
              >
                {isSubmitting ? "Submitting..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default SignIn;
