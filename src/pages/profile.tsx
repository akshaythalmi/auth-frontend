import React, { useState } from "react";
import axios from "axios";
import { userStore } from "../store/userStore";
import updateProfilerValidationSchema from "../validator/updateProfileValidationSchema";
import { storeUserData } from "../utils";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateProfilerValidationSchema.validate(formData, {
        abortEarly: false,
      });
      const configuration = {
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/updateProfile`,
        data: {
          firstname: formData.firstName || userStore.user.firstname,
          lastname: formData.lastName || userStore.user.lastname,
          email: userStore.user.email,
          address: formData.address || userStore.user.address,
        },
      };

      axios(configuration)
        .then((result) => {
          if (result.data.success) {
            userStore.user = result.data.user;
            storeUserData(result.data.user);
            navigate("/dashboard");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="isolate bg-white px-6 py-12 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Update Profile
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
                defaultValue={userStore.user.firstname}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
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
                defaultValue={userStore.user.lastname}
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
              Email*
            </label>

            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                defaultValue={userStore.user.email}
                disabled
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
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
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={userStore.user.address}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-orange-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
