"use client"
import React from 'react'
import SectionTitle from '@/src/components/SectionTitle/SectionTitle';
import { motion } from "framer-motion";
import Container from '@/src/components/Container/Container';

const RecentGardening = () => {

    const images = [
        "https://images.pexels.com/photos/95215/pexels-photo-95215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/161512/eggplant-400-08373800-400-08373801-400-08373802-400-08373803-161512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/1199562/pexels-photo-1199562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/1084542/pexels-photo-1084542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/14594337/pexels-photo-14594337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/15876326/pexels-photo-15876326/free-photo-of-man-picking-bell-peppers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/7728076/pexels-photo-7728076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/7728876/pexels-photo-7728876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/7658805/pexels-photo-7658805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/7658809/pexels-photo-7658809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/7299937/pexels-photo-7299937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/7658822/pexels-photo-7658822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ];
  return (
    <Container>
      <SectionTitle heading="Recent Gardenning" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-10">
        {images.map((src, index) => (
          <motion.div
            key={index}
            className="rounded-lg overflow-hidden"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: index * 0.2 }}
          >
            <img
              className="h-48 w-full object-cover rounded-lg"
              src={src}
              alt=""
            />
          </motion.div>
        ))}
      </div>
    </Container>
  )
}

export default RecentGardening