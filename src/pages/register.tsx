import React, { useState } from "react";
import validationSchema from "../validator/registerValidationSchema";
import * as Yup from "yup";
import axios from "axios";
import Toast from "../components/toast";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string } | undefined>(
    undefined
  );
  const [register, setRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const configuration = {
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/register`,
        data: {
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
          address: formData.address,
          password: formData.password,
        },
      };
      axios(configuration)
        .then((result) => {
          setRegister(true);
        })
        .catch((error) => {
          if (error.response) {
            setErrorMessage(error.response.data.message);
          } else {
            setErrorMessage("Error registering user");
          }
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            password: "",
          });
        });
    } catch (err: any) {
      const validationErrors: { [key: string]: string } = {};
      err.inner.forEach((error: Yup.ValidationError) => {
        if (error.path) {
          validationErrors[error.path] = error.message;
        }
      });
      setErrors(validationErrors);
      setLoading(false);
    }
  };

  return (
    <div className="isolate bg-white px-6 py-12 sm:py-16 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Register
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-xl">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              First name*
            </label>

            <div className="mt-2.5">
              <input
                type="text"
                name="firstName"
                id="first-name"
                value={formData.firstName}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
              {errors?.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors?.firstName}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Last name*
            </label>

            <div className="mt-2.5">
              <input
                type="text"
                name="lastName"
                id="last-name"
                value={formData.lastName}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
              {errors?.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors?.lastName}</p>
              )}
            </div>
          </div>
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
                value={formData.email}
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
              htmlFor="address"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Address
            </label>

            <div className="mt-2.5">
              <input
                name="address"
                id="address"
                value={formData.address}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Password*
            </label>

            <div className="mt-2.5">
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
              {errors?.password && (
                <p className="text-red-500 text-sm mt-1">{errors?.password}</p>
              )}
            </div>
          </div>
        </div>

        {register ? (
          <div className="mt-4 text-green-600">
            Registration successfully completed.{" "}
            <span>
              <a className="text-purple-600 hover:underline" href="/login">
                Login
              </a>
            </span>
            <Toast message="Registration successfully completed." />
          </div>
        ) : (
          <div className="mt-4 text-grey-600">
            Already Registered?{" "}
            <span>
              <a className="text-purple-600 hover:underline" href="/login">
                Login
              </a>
            </span>
          </div>
        )}

        {!register && errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}

        <div className="mt-10">
          <button
            type="submit"
            disabled={loading}
            className="block w-full rounded-md bg-orange-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? "Registering..." : "Register"}{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
