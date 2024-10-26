import React from 'react';
import Container from '../Container/Container';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
        <footer className="py-8 bg-default-200 bg-opacity-50">
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section: Logo and Description */}
          <div>
            <Link href='/'><h2 className="text-3xl font-bold mb-4">Planto</h2></Link>
            <p className="">
            Planto is a vibrant blogging platform dedicated to plant enthusiasts, offering insightful articles on plant care, gardening tips, and eco-friendly living.
            </p>
          </div>

          {/* Middle Section: Navigation Links */}
          <div>
            <ul>
              <li className="mb-2">
                <a href="#" className=" hover:text-default-300">Our Story</a>
              </li>
              <li className="mb-2">
                <a href="#" className=" hover:text-default-300">Blog</a>
              </li>
              <li className="mb-2">
                <a href="#" className=" hover:text-default-300">Shop</a>
              </li>
              <li className="mb-2">
                <a href="#" className=" hover:text-default-300">Contact</a>
              </li>
            </ul>
          </div>

          {/* Right Section: Hours and Image */}
          <div className="md:text-right">
            <div className="mb-4">
              <p className="text-lg font-semibold">Garden</p>
              <p className="">Sunday – Wednesday</p>
              <p className="">11:30am – 9:00pm</p>
            </div>
            <div className="mb-4">
              <p className="text-lg font-semibold">Market</p>
              <p className="">Monday – Saturday</p>
              <p className="">9:00pm – 7:00pm</p>
            </div>
           
          </div>
        </div>

        <div className="border-t border-default-700 mt-8 pt-4 text-center text-default-400">
          <p>COPYRIGHT 2024 Planto</p>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
