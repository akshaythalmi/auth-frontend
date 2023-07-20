import React, { useState } from "react";
import validationSchema from "../validator/loginValidationSchema";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authState } from "../store/authStore";
import { userStore } from "../store/userStore";
import { storeUserData } from "../utils";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string } | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        [name]: "",
      };
    });

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const configuration = {
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/login`,
        data: {
          email: formData.email,
          password: formData.password,
        },
      };

      axios(configuration)
        .then((result) => {
          if (result.data.token) {
            authState.isAuthenticated = true;
            userStore.user = result.data.user;
            storeUserData(result.data.user);
            navigate("/dashboard");
          }
        })
        .catch((error) => {
          if (error.response) {
            setErrorMessage(error.response.data.message);
          } else {
            setErrorMessage("Error logging in");
          }
          console.error(error);
        });
    } catch (err: any) {
      const validationErrors: { [key: string]: string } = {};
      err.inner.forEach((error: Yup.ValidationError) => {
        if (error.path) {
          validationErrors[error.path] = error.message;
        }
      });
      setErrors(validationErrors);
    }
  };

  return (
    <div className="isolate bg-white px-6 py-12 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Login
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-xl">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email*
            </label>

            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
              {errors?.email && (
                <p className="text-red-500 text-sm mt-1">{errors?.email}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Password*
            </label>

            <div className="mt-2.5">
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
              {errors?.password && (
                <p className="text-red-500 text-sm mt-1">{errors?.password}</p>
              )}
            </div>
          </div>
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}

        <div className="mt-4 text-grey-600">
          Don't have an account yet?{" "}
          <span>
            <a className="text-purple-600 hover:underline" href="/register">
              Register
            </a>
          </span>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-orange-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
