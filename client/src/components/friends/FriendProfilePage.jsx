import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/store";
import { Button, Container, Flex } from "@radix-ui/themes";
import Sidebar from "../Sidebar";

const FriendProfilePage = () => {
  const { getUser, isLoading } = useAuthStore();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userData = await getUser();
        if (!userData) {
          toast.error("Please log in first");
          navigate("/login");
          return;
        }
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user: ", error.message);
        toast.error("Error fetching user");
      }
    }
    fetchCurrentUser();
  }, [getUser, navigate]);

  return (
    <>
      <div className='absolute top-5 right-5'>
        <Sidebar />
      </div>
      <div className="h-screen max-w-xl mx-auto py-8">
        <Container className="px-2 mx-auto">
          <h1 className="text-left px-8 lg:text-center font-bold my-5 text-xl">{user?.username}</h1>
          <div className="p-6">
            <div className="flex justify-center items-center mb-10">
              <div>
                <div className="w-20 h-20 rounded-full overflow-hidden mb-2">
                  {
                    isLoading ?
                      <div className='relative top-10 left-8'>
                        <Spinner size="3" className='z-50 object-cover w-full h-full' />
                      </div> :
                      <img src={user?.avatar?.avatar_url} alt="Avatar" className="object-cover w-full h-full" />
                  }
                </div>
                <h1 className='text-xl'>{user?.fullName}</h1>
              </div>
            </div>
            <p className='text-zinc-700 font-medium text-xl'>
              Bio
            </p>
            <p className='text-xl w-full'>{user?.bio || "Hello my name is ayush and i love coding qkej5tjeoityeh jrghuimuerhgkueh  💘💘💘💘💘💘💘💘"}</p>
          </div>

        </Container>
      </div>
    </>
  )
}

export default FriendProfilePage