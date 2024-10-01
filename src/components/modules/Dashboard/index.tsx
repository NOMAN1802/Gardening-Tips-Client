"use client";
import Container from "@/src/components/Container/Container";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineBars } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import SidebarOptions from "./SidebarOptions";
import { adminLinks, userLinks } from "./constants";
import { MdSettings } from "react-icons/md";
import { useUser } from "@/src/context/user.provider";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      {/* Small Screen Navbar */}
      
        {/* Toggle button for small screens */}
        {!isOpen && (
          <button
            onClick={toggleSidebar}
            className="mobile-menu-button focus:outline-none focus:bg-default-200"
          >
            <AiOutlineBars className="h-6 w-6 text-default-600" />
          </button>
        )}
 
      {/* Sidebar for Small Devices */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="z-10 md:hidden flex flex-col justify-between overflow-x-hidden bg-default-200 w-64 space-y-6 px-2 py-4 fixed inset-y-0 left-0 transform transition duration-200 ease-in-out"
          >
            {/* Cross icon inside the sidebar to close it */}
            <button
              onClick={closeSidebar}
              className="absolute top-4 right-4 z-20 p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Sidebar Content */}
            <div className="flex-grow">
              <Link href="/" className="flex justify-center items-center flex-col">
                <h2 className="text-3xl font-bold text-black">
                  <span className="text-default-600">Shoppy</span>My
                </h2>
              </Link>
              <div className="flex flex-col items-center mt-4">
                <img
                  src="/images/profile.jpg"
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <p className="mt-2 text-lg font-medium text-default-700">
                  {user?.name}
                </p>
              </div>
              <SidebarOptions
                links={user?.role === "ADMIN" ? adminLinks : userLinks}
                closeSidebar={closeSidebar}
              />
            </div>

            <div>
              <hr />
              {user?.role === "ADMIN" ? (
                <Link
                  href="/dashboard/settings"
                  className="flex w-full items-center px-4 py-2 mt-5 text-default-600 hover:bg-default-300 hover:text-default-700 transition-colors duration-300 transform"
                  onClick={closeSidebar}
                >
                  <MdSettings className="w-6 h-6" />
                  <span className="mx-4 font-medium">Setting</span>
                </Link>
              ) : (
                <Link
                  href="/profile/settings"
                  className="flex w-full items-center px-4 py-2 mt-5 text-default-600 hover:bg-default-300 hover:text-default-700 transition-colors duration-300 transform"
                  onClick={closeSidebar}
                >
                  <MdSettings className="w-6 h-6" />
                  <span className="mx-4 font-medium">Setting</span>
                </Link>
              )}
              <Link
                href="/"
                className="flex w-full items-center px-4 py-2 mt-5 text-default-600 hover:bg-default-300 hover:text-default-700 transition-colors duration-300 transform"
                onClick={closeSidebar}
              >
                <FaHome className="w-6 h-6" />
                <span className="mx-4 font-medium">Home</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Always visible sidebar for large screens */}
      <div className="hidden md:flex md:fixed md:flex-col md:justify-between md:overflow-x-hidden md:bg-default-200 md:w-64 md:space-y-6 md:px-2 md:py-4 md:inset-y-0 md:left-0">
        <div>
          <Link href="/" className="flex-grow flex justify-center items-center flex-col">
           
            <h2 className="text-3xl font-bold text-black">
              <span className="text-default-600">Shoppy</span>My
            </h2>
          </Link>
          <div className="flex flex-col items-center mt-4">
            <img
              src="/images/profile.jpg"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <p className="mt-2 text-lg font-medium text-default-700">
              {user?.name}
            </p>
          </div>
          <SidebarOptions
            links={user?.role === "ADMIN" ? adminLinks : userLinks}
          />
        </div>
        <div>
          <hr />
          {user?.role === "ADMIN" ? (
            <Link
              href="/dashboard/settings"
              className="flex w-full items-center px-4 py-2 mt-5 text-default-600 hover:bg-default-300 hover:text-default-700 transition-colors duration-300 transform"
            >
              <MdSettings className="w-6 h-6" />
              <span className="mx-4 font-medium">Setting</span>
            </Link>
          ) : (
            <Link
              href="/profile/settings"
              className="flex w-full items-center px-4 py-2 mt-5 text-default-600 hover:bg-default-300 hover:text-default-700 transition-colors duration-300 transform"
            >
              <MdSettings className="w-6 h-6" />
              <span className="mx-4 font-medium">Setting</span>
            </Link>
          )}
          <Link
            href="/"
            className="flex w-full items-center px-4 py-2 mt-5 text-default-600 hover:bg-default-300 hover:text-default-700 transition-colors duration-300 transform"
          >
            <FaHome className="w-6 h-6" />
            <span className="mx-4 font-medium">Home</span>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Sidebar;
