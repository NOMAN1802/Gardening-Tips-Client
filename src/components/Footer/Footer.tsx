import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="py-8 bg-default-200 bg-opacity-90">
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start justify-evenly"> 
          <div>
            <Link href='/'><h2 className="text-2xl md:text-4xl  font-bold mb-4">Planto</h2></Link>
            <p className="text-sm"> {/* Added text-base for better readability */}
              Planto is a vibrant blogging platform dedicated to plant enthusiasts, offering insightful articles on plant care, gardening tips, and eco-friendly living.
            </p>
          </div>

          {/* Middle Section: Navigation Links */}
          <div className='md:mx-auto' >
            <ul>

              <li className="mb-2 text-lg font-bold">Important Links</li>
              <li className="mb-2">
                <a href="/about" className="font-semibold">Our Story</a>
              </li>
              <li className="mb-2">
                <a href="/posts" className="font-semibold">Blog</a>
              </li>
              <li className="mb-2">
                <a href="#" className="font-semibold">Shop</a>
              </li>
              <li className="mb-2">
                <a href="#" className="font-semibold">Contact</a>
              </li>
            </ul>
          </div>

          {/* Right Section: Hours and Image */}
          <div className="md:text-right">
            <div className="mb-4">
              <p className="text-lg font-semibold">Garden</p>
              <p>Saturday – Friday</p>
              <p>8:30am – 9:00pm</p>
              <div className='text-lg flex gap-4 justify-center md:justify-end my-6'> 
                <div className='p-2 border-2 rounded-full border-default-400 text-default-500 hover:bg-default-400 hover:text-default-100'>
                  <FaFacebookF />
                </div>
                <div className='p-2 border-2 rounded-full border-default-400 text-default-500 hover:bg-default-400 hover:text-default-100'>
                  <FaYoutube />
                </div>
                <div className='p-2 border-2 rounded-full border-default-400 text-default-500 hover:bg-default-400 hover:text-default-100'>
                  <FaTwitter />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-default-700 mt-8 pt-4 text-center text-default-900">
          <p className='font-semibold'>COPYRIGHT 2024 Planto</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;