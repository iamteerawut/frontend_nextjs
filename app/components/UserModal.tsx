"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { User } from "../types/User";
import { saveUser } from "../actions/userAction";

interface UserModalProps {
  user?: User | null;
  onClose: () => void;
}

export default function UserModal({ user, onClose }: UserModalProps) {
  const [userId, setUserId] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    setUserId(user?.id ?? 0);
    setEmail(user?.email ?? "");
    setFirstName(user?.firstName ?? "");
    setLastName(user?.lastName ?? "");
    setImagePreview(
      user?.imagePath
        ? process.env.NEXT_PUBLIC_MINIO_URL + user.imagePath
        : imagePreview
          ? imagePreview
          : "/placeholder.svg",
    );
  }, []);

  const handleImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImageFile(event.target.files[0]);
      setImagePreview(URL.createObjectURL(event.target.files[0]))
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();

    if (email) {
      formData.append("email", email);
    }

    if (password) {
      const hashedPassword = btoa(password);
      formData.append("password", hashedPassword);
    }

    if (firstName) {
      formData.append("firstName", firstName);
    }
    if (lastName) {
      formData.append("lastName", lastName);
    }

    if (imageFile) {
      formData.append("file", imageFile);
    }

    await saveUser(formData, userId);

    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {user ? "Edit" : "Add"} User
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              {user?.id && (
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <label htmlFor="image-upload">Profile Image</label>
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      )}
                    </div>
                    <input
                      onChange={handleImageFileChange}
                      name="imageFile"
                      type="file"
                      accept="image/*"
                    />
                  </div>
                </div>
              )}
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`border p-2 w-full rounded-md focus:outline-none focus:border-blue-500 ${
                    user ? "bg-gray-200 text-gray-500 cursor-not-allowed" : ""
                  }`}
                  placeholder="Enter email"
                  value={email}
                  onChange={(event) => setEmail(event?.target.value)}
                  readOnly={userId != 0}
                  required
                />
              </div>
              {userId === 0 && (
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className={`border p-2 w-full rounded-md focus:outline-none focus:border-blue-500 ${
                      user ? "bg-gray-200 text-gray-500 cursor-not-allowed" : ""
                    }`}
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) => setPassword(event?.target.value)}
                    readOnly={userId != 0}
                    required
                  />
                </div>
              )}
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="border p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(event) => setFirstName(event?.target.value)}
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="border p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(event) => setLastName(event?.target.value)}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Submit
            </button>
            <button
              onClick={onClose}
              type="button"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
