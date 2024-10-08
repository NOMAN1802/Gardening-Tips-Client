"use client"
import React from 'react'
import Container from '../Container/Container';
import { FaQuoteLeft } from 'react-icons/fa';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import SectionTitle from '../SectionTitle/SectionTitle';

interface Quote {
    _id: string;
    image: string;
    name: string;
    details: string;
  }
  
const Quotes = () => {

    const qoutes = [
        {
            "_id": "643010e0f5a7e52ce1e8fa65",
            "name": "Jane Doe",
            "details": "Gardening is a way to believe in tomorrow's beauty today.",
            "image": "https://images.pexels.com/photos/428333/pexels-photo-428333.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            "_id": "643010f9f5a7e52ce1e8fa66",
            "name": "John Doe",
            "details": "A garden is a friend you can visit anytime.",
            "image": "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            "_id": "6430110af5a7e52ce1e8fa67",
            "name": "MJ Doe",
            "details": "In every gardener, there’s a child who loves dirt.",
            "image": "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            "_id": "64301123f5a7e52ce1e8fa68",
            "name": "Sarah Smith",
            "details": "Plant seeds of happiness, hope, success, and love in gardens.",
            "image": "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            "_id": "6430113af5a7e52ce1e8fa69",
            "name": "Robert Johnson",
            "details": "Gardening adds years to your life and life to years.",
            "image": "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            "_id": "6430113af5a7q32ce1e8fa79",
            "name": "Sarah Smith",
            "details": "Where flowers bloom, so does the hope for tomorrow.",
            "image": "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
    ]
  return (
    <Container>

<div>
      <SectionTitle
        
        heading={'Geneous Says that!!!'}
      />
      <div className="my-6">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          slidesPerView={1}
        >
          {qoutes.map((qoute : Quote) => (
            <SwiperSlide key={qoute._id}>
              <div
                
                className='flex flex-col items-center bg-gradient-to-r from-default-200 via-default-300 to-blue-200 hover:shadow-2xl shadow-lg  rounded-xl'
              >
                <img 
                  src={qoute.image} 
                  alt={qoute.name} 
                  className='w-32 h-32 rounded-full object-cover mb-4 border-4 border-default-300' 
                />
                
                <FaQuoteLeft className='mt-4 text-4xl text-default-600' />
                <p className='py-6 text-default-700 italic'>" {qoute.details} "</p>
                <h3 className='text-2xl font-semibold text-default-600'>{qoute.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
    </Container>
  )
}

export default Quotes