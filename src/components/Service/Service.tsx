"use client"
import React from 'react'
import { AiOutlineSolution } from 'react-icons/ai';
import { FaMoneyCheckAlt, FaRegLightbulb } from 'react-icons/fa';
import { IoPricetagsSharp } from 'react-icons/io5';
import SectionTitle from '../SectionTitle/SectionTitle';
import { motion } from "framer-motion";
import Container from '../Container/Container';

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

const Service = () => {

    const services = [
        {
          icon: <AiOutlineSolution className="text-5xl text-white" />,
          label: "Expert Suggestion",
          description: "Choose the perfect solution of your problem.",
        },
        {
          icon: <FaRegLightbulb className="text-5xl text-white" />,
          label: "Creative Idea",
          description: "Get creative idea for gardenning with us.",
        },
        {
          icon: <IoPricetagsSharp className="text-5xl text-white" />,
          label: "Permium content",
          description: "Premium content with minimum cost witht us",
        },
        {
          icon: <FaMoneyCheckAlt className="text-5xl text-white" />,
          label: "Done with Payment",
          description: "Complete the payment to varified your account.",
        },
      ];
  return (
    <Container>
      <SectionTitle heading="Top Services" />
      <div className=" mx-auto px-4 my-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-r from-default-400 via-default-500 to-blue-300 hover:shadow-2xl shadow-lg rounded-xl p-6 text-center relative overflow-hidden"
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 flex justify-center items-center opacity-20">
                <div className="text-8xl text-white">{service.icon}</div>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-2 text-white">{service.label}</h3>
                <p className="text-default-200 font-light">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default Service;