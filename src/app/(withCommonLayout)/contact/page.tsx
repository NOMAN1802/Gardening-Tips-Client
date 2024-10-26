import Container from '@/src/components/Container/Container';
import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';
import React from 'react';

const ContactUs = () => {
  return (
    <Container>
      <div className="mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-12">
        <div className="lg:w-1/2">
          <img src="https://images.pexels.com/photos/95215/pexels-photo-95215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1g" alt="Gardening" className="w-full h-[600px] rounded-lg shadow-md" />
        </div>
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl font-bold mb-4">Enhance your gardening experience</h2>
          <p className="mb-6">
          Planto is a vibrant blogging platform dedicated to plant enthusiasts, offering insightful articles on plant care, gardening tips, and eco-friendly living.
          </p>
          <form className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Your Name"
              className="px-4  w-full"
            />
            <Input
              type="text"
              placeholder="Phone Number"
              className="px-4 py-2  w-full"
            />
            <Textarea rows={6} className="px-4 py-2 w-full">
              
            </Textarea>
            <div className='flex justify-center'>
            <Button className=" w-2/3 hover:bg-default-600">
              Send message
            </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Services Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-6">Whether you're a beginner or an experienced gardener, Planto helps you</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <img src="https://images.pexels.com/photos/28818759/pexels-photo-28818759/free-photo-of-child-harvesting-fresh-vegetables-in-garden.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Planting tips" className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-lg font-semibold">Gardenning Tips</h3>
          </div>
          <div className="flex flex-col items-center">
            <img src="https://images.pexels.com/photos/17916511/pexels-photo-17916511/free-photo-of-man-holding-saplings.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="solutions" className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-lg font-semibold">Expert's suggestions</h3>
          </div>
          <div className="flex flex-col items-center">
            <img src="https://images.pexels.com/photos/12215558/pexels-photo-12215558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Primiun content" className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-lg font-semibold">Advance Tips</h3>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="lg:w-1/2 text-center lg:text-left">
        <h2 className="text-3xl font-bold mb-6">When will hepl you with</h2>
        <p className='text-lg my-2'> Planto is a vibrant blogging platform dedicated to plant enthusiasts, offering insightful articles on plant care, gardening tips, and eco-friendly living. Whether you're a beginner or an experienced gardener, Planto helps you cultivate your green thumb with expert advice, inspiring ideas, and a community of fellow plant lovers. Embrace nature with Planto!</p>
          <h2 className="text-3xl font-bold mb-6">When We're Open to Serve You</h2>
          <ul className="text-lg mb-6">
            <li>Monday - Friday: 11:00 AM - 11:00 PM</li>
            <li>Saturday: 10:00 AM - 1:00 PM</li>
            <li>Sunday: 9:00 AM - 12:00 PM</li>
          </ul>
          <div>
            <p className="font-semibold">Our Location</p>
            <p>Dhaka, Bangladesh</p>
          </div>
          <div className="mt-4">
            <p className="font-semibold">Contact Us</p>
            <p>(555) 123-4567</p>
            <p>planto@gmail.com</p>
          </div>
        </div>
        <div className="lg:w-1/2">
          <img src="https://images.pexels.com/photos/102156/pexels-photo-102156.jpeg" alt="Chef Image" className="w-full h-[600px] rounded-lg shadow-md" />
        </div>
      </div>
    </div>
    </Container>
  );
};

export default ContactUs;
