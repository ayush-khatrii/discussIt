import React from 'react';
import { BsChatSquareHeart } from "react-icons/bs";
import { Button, Container, Heading } from '@radix-ui/themes';
import useAuthStore from '../../store/store';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const HomePage = () => {
  const { getUser } = useAuthStore();
  const navigate = useNavigate();

  const handleUserRedirection = async () => {
    try {
      const userData = await getUser();
      if (!userData) {
        toast.error("Please log in first");
        navigate("/login");
      } else {
        navigate("/chats");
      }
    } catch (error) {
      console.error("Error fetching user: ", error.message);
      toast.error("Error fetching user");
    }
  }

  return (
    <Container className="h-screen flex flex-col justify-center items-center ">
      <main className="flex items-center flex-col justify-center flex-1">
        <Container size="large">
          <div className="text-center">
            <Heading size={{ base: "4", md: "5", lg: "9" }} className="mb-4 font-bold ">Welcome to Discuss-It</Heading>
            <p className="text-lg md:text-xl lg:text-4xl text-zinc-500 my-5">Connect with people all around the world</p>
            <Button
              onClick={handleUserRedirection}
              highContrast
              color='gray'
              variant='classic'
              size={{ base: "3", md: "4" }}
            >
              <BsChatSquareHeart size="20" className='mt-1' />
              Get Started
            </Button>
          </div>
        </Container>
      </main>
    </Container>
  );
}

export default HomePage;