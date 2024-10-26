import Container from '@/src/components/Container/Container';
import React from 'react';

const AboutPage = () => {
  return (
<Container>
<div className="py-16">
      {/* About Us Section */}
      <div className=" mx-auto mt-16 py-16 bg-gradient-to-r from-default-800 via-default-700 to-default-600 shadow-xl rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img
              src="https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Handyman"
              className="rounded-xl shadow-xl w-full h-auto pl-2"
            />
          </div>
          <div className="text-center md:text-left p-8">
            <h2 className="text-4xl font-bold text-default mb-6">About Us</h2>
            <p className="text-lg mb-8 text-default-300">
            Planto is your go-to blog for all things gardening! Whether you're a seasoned gardener or just starting out, Planto offers expert advice, tips, and inspiration to help you grow your dream garden. From plant care guides and seasonal gardening tips to creative DIY projects and eco-friendly solutions, we cover everything you need to cultivate a thriving, sustainable garden. Our mission is to make gardening accessible and enjoyable for everyone, no matter the space or experience level. Join the Planto community and let’s grow together, one plant at a time! Happy gardening! 🌿🌼
            </p>
          </div>
        </div>
      </div>
   
   <div className=' gird sm:grid-col-1 md: grid-cols-2'>
          {/* Stats Section */}
          <div className=" mx-auto mt-16">
        <div className="bg-gradient-to-r from-default-800 via-default-700 to-default-600 shadow-xl rounded-xl p-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-5xl font-bold text-default">12</h3>
            <p className="text-default-400 text-lg mt-2">Years in Business</p>
          </div>
          <div>
            <h3 className="text-5xl font-bold text-default">700+</h3>
            <p className="text-default-400 text-lg mt-2">Blog Published</p>
          </div>
          <div>
            <h3 className="text-5xl font-bold text-default">5/5</h3>
            <p className="text-default-400 text-lg mt-2">Client Happiness</p>
          </div>
          <div>
            <h3 className="text-5xl font-bold text-default">100+</h3>
            <p className="text-default-400 text-lg mt-2">Service Coverage Area</p>
          </div>
        </div>
      </div>

      {/* Vision and Commitment Section */}
      <div className=" mx-auto mt-16 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
          <div className="bg-gradient-to-b from-default-700 via-default-600 to-default-500 p-12 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h4 className="text-xl font-bold text-default mb-4">Our Vision for Your Home</h4>
            <p className="text-default-300 mb-6">To be the most trusted and preferred handyman service provider.</p>
            <button className="py-3 px-6 bg-blue-500 text-default rounded-full hover:bg-blue-600 transition-colors">
              Get a Quote
            </button>
          </div>
          <div className="bg-gradient-to-b from-default-700 via-default-600 to-default-500 p-12 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h4 className="text-xl font-bold text-default mb-4">Our Commitment to Excellence</h4>
            <p className="text-default-300 mb-6">To provide top-quality handyman services that exceed our clients' expectations.</p>
            <button className="py-3 px-6 bg-orange-500 text-default rounded-full hover:bg-orange-600 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>

   </div>

      {/* Our Story Section */}
      <div className=" mx-auto mt-16 py-16 bg-gradient-to-r from-default-800 via-default-700 to-default-600 shadow-xl rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left p-8">
            <h2 className="text-4xl font-bold text-default mb-6">Our Story</h2>
            <p className="text-default-300 text-lg">
            Planto began with a passion for gardening and a desire to share the joy of nurturing plants with others. What started as a personal project quickly grew into a thriving community of plant lovers. Our founder, an avid gardener, wanted to create a space where people could find reliable, practical gardening tips and advice. Planto is built on the belief that anyone can grow a beautiful garden, regardless of experience or space. Through our blog, we aim to inspire and empower others to cultivate their own green spaces, fostering a love for nature and sustainable living. Let's grow together! 🌱
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Handyman Services"
              className="rounded-xl shadow-xl w-full h-auto pr-2"
            />
          </div>
        </div>
      </div>
    </div>
</Container>
  );
};

export default AboutPage;
