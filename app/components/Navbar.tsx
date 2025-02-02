"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <span>Home</span>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link
            href="/user"
            className={`text-white hover:text-gray-300 ${
              pathName === "/user" ? "font-bold" : ""
            }`}
          >
            User
          </Link>
          <Link
            href="/email"
            className={`text-white hover:text-gray-300 ${
              pathName === "/email" ? "font-bold" : ""
            }`}
          >
            Email
          </Link>
        </div>
      </div>
    </nav>
  );
}
