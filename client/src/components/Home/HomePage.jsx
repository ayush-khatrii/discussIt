import React, { useEffect } from 'react';
import { BsChatSquareHeart } from "react-icons/bs";
import { Button, Container, Heading } from '@radix-ui/themes';
import useAuthStore from '../../store/authstore';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

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

    <div className="h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <Container size="large">
        <div className="text-center">
          <h1 className=" text-5xl font-bold ">Welcome to Discuss-It</h1>
          <p className="text-lg md:text-xl lg:text2xl text-zinc-500 mb-4">Connect with people all around the world</p>
          <Button
            onClick={handleUserRedirection}
            highContrast
            color='gray'
            variant='classic'
            size={{ base: "3", md: "4" }}
          >
            <BsChatSquareHeart size="20" className='mt-1' />
            Start Discussing
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default HomePage;