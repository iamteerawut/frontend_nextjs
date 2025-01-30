"use client"

import React from "react";
import { User } from "../types/User";
import { saveUser } from "../actions/userAction";
import { revalidatePath } from "next/cache";

interface UserModalProps {
  user?: User | null;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose }) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userData: User = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string
    }
    console.log(user);
    await saveUser(userData);
    
    onClose();
  };

  return <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="relative p-4 w-full max-w-md max-h-full">
      <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {user ? 'Edit' : 'Add'} User
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-5">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="image-upload">Profile Image</label>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                  {true ? (
                    <img src={"/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  )}
                </div>
                <input id="image-upload" type="file" accept="image/*" className="hidden" />
                <label htmlFor="image-upload" className="cursor-pointer text-sm text-blue-500 hover:text-blue-600">
                  Choose file
                </label>
              </div>
            </div>
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
                defaultValue={user ? user.firstName : ''}
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
                defaultValue={user ? user.lastName : ''}
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={`border p-2 w-full rounded-md focus:outline-none focus:border-blue-500 ${user ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''}`}
                placeholder="Enter email"
                defaultValue={user ? user.email : ''}
                disabled={!!user}
                required
              />
            </div>
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Submit
          </button>
          <button onClick={onClose} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
        </form>
      </div>
    </div>
  </div>;
}

export default UserModal;