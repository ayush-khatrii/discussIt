

import React, { useEffect } from 'react';
import { Button, Text } from '@radix-ui/themes';
import useAuthStore from '../../store/authstore';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { motion } from 'framer-motion';
import { MdArrowOutward } from "react-icons/md";

const HomePage = () => {
  const { isLoggedIn, getUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) return navigate("/home", { replace: true });
  }, [isLoggedIn, navigate]);

  const handleUserRedirection = async () => {
    try {
      const userData = await getUser();
      if (!userData) {
        toast.error("Please log in first");
        navigate("/login");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error fetching user: ", error.message);
      toast.error("Error fetching user");
    }
  }

  return (
    <div className="bg-black text-white overflow-y-auto relative">
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className=''>
            <Hero handleUserRedirection={handleUserRedirection} />
            <HeroImagePreview />
          </div>
          <Features />
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};

const Hero = ({ handleUserRedirection }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, }}
    className="text-center mb-16"
  >
    <h1 className="text-2xl text-zinc-300 sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 ">
      Discuss with <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-800'> Discuss-It </span>
    </h1>
    <p className="text-xl sm:text-2xl text-zinc-600 max-w-3xl mx-auto mb-8">
      Simple, minimalistic, and easy to use. Start chatting without the clutter.
    </p>
    <Button
      onClick={handleUserRedirection}
      size="lg"
      color='gray'
      highContrast
      radius='full'
      className=""
    >
      Start Chatting Now <IoIosArrowRoundForward size={24} className="inline" />
    </Button>
  </motion.div>
);

const HeroImagePreview = () => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.5, ease: "backOut" }}
    className="relative mb-16"
  >
    <div className="relative rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
      <img
        src="/hero.png"
        alt="Discuss-It Interface"
        className="w-full h-auto object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t  from-black via-zinc-950 to-transparent"></div>
    </div>
  </motion.div>
);

const Features = () => (
  <motion.div
    whileInView={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.8, delay: 0.4 }}
    className="text-center mb-16"
  >
    <h1 className='font-extrabold text-3xl text-zinc-300 mb-8 lg:text-center '>
      Features
    </h1>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >

      <FeatureCard
        title="Clean Interface"
        description="A clutter-free design that puts your conversations first."
        icon="✨"
      />
      <FeatureCard
        title="Quick Start"
        description="No complex setup. Just open and start chatting immediately."
        icon="🚀"
      />
      <FeatureCard
        title="Focus on Essentials"
        description="Only the features you need, nothing you don't."
        icon="🎯"
      />
    </motion.div>
  </motion.div>
);

const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-zinc-950 rounded-xl p-6 shadow-lg border border-zinc-800 hover:border-zinc-500 transition-all duration-300">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const HomeFooter = () => (
  <footer className="bg-black text-zinc-300 py-8">
    <div className="text-center">
      <div className="text-center">
        <p className="text-xl font-medium text-zinc-500">Developed by <span className='bg-clip-text text-xl font-bold text-transparent bg-gradient-to-r from-pink-900 to-purple-600'>
          Ayush Khatri  </span>
        </p>
      </div>
    </div>
  </footer>
);

export default HomePage;