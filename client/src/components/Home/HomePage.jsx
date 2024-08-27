import React, { useEffect } from 'react';
import { BsChatSquareHeart } from "react-icons/bs";
import { Button, Container, Heading } from '@radix-ui/themes';
import useAuthStore from '../../store/authstore';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { IoIosArrowRoundForward } from 'react-icons/io';

const HomePage = () => {
  const { isLoggedIn, getUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // redirect to landing page if logged in
    if (isLoggedIn) return navigate("/home", { replace: true });
  }, []);

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
    <div className="dark:bg-black bg-white h-[80rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] lg:h-auto flex lg:items-center lg:pt-32 justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className='lg:flex lg:justify-center lg:items-center lg:flex-col'>
        <button
          className="bg-slate-800 my-3 mb-10 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative font-normal flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
            <span>
              Introducing new UI
            </span>
            <svg
              fill="none"
              height="16"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.75 8.75L14.25 12L10.75 15.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </button>
        <div className="flex justify-center items-center text-center flex-col">
          <h1 className="text-2xl md:text-5xl lg:text-7xl z-50 font-black">Discuss with <span className='text-blue-500 font-bold'> Discuss-It</span></h1>
          <p className="text-lg md:text-xl lg:text-2xl w-auto z-50 lg:w-9/12 py-2 text-zinc-600 mb-4 ">
            Join the conversation and stay in sync. Our chat app makes it easy to connect anytime, anywhere.
          </p>
          <Button
            onClick={handleUserRedirection}
            asChild color='gray' highContrast
            size="3"            >
            <Link className="no-underline">
              Chat Now <IoIosArrowRoundForward size={20} />
            </Link>
          </Button>
        </div>
        <div className="relative pt-10 z-50">
          <img src="/hero.png" alt="Hero" width={1000} className=" h-auto border border-zinc-800 object-cover rounded-xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;