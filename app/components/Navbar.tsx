"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { id: "user", label: "User", href: "/user" },
  { id: "image", label: "Image", href: "/image" },
  { id: "email", label: "Email", href: "/email" }
];

const Navbar = () => {
  const pathName = usePathname();
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <span>Home</span>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/user" className={`text-white hover:text-gray-300 ${pathName === '/user' ? 'font-bold' : ''}`}>
            User
          </Link>
          <Link href="/email" className={`text-white hover:text-gray-300 ${pathName === '/email' ? 'font-bold' : ''}`}>
            Email
          </Link>
        </div>
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            Menu
          </button>
        </div>
      </div>
    </nav>
  )
}
export default Navbar;