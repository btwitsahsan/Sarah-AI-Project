import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests
import { DOMAIN } from "../constants/CONSTANTS";

const SignUp = () => {
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
          Sign Up
        </h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string()
              .required("Password is required")
              .min(6, "Password must be at least 6 characters"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Confirm password is required"),
          })}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              const response = await axios.post(
                `${DOMAIN}/register`,
                values
              );
              console.log(response.data);
              navigate("/signin");
            } catch (error) {
              console.error("Registration Error:", error);
              if (
                error.response &&
                error.response.data &&
                error.response.data.error
              ) {
                setFieldError("email", error.response.data.error);
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
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="mt-1 block w-full h-10 px-4 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-gray-800 placeholder-gray-500 sm:text-sm"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
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
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="mt-1 block w-full h-10 px-4 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-gray-800 placeholder-gray-500 sm:text-sm"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white py-2 rounded-md font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition duration-300"
              >
                {isSubmitting ? "Submitting..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default SignUp;
