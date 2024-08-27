import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Avatar, Button, Container, Flex } from "@radix-ui/themes";
import { SlCalender } from "react-icons/sl";
import useUserStore from "../../store/userstore";

const FriendProfilePage = () => {
  const [friendProfile, setFriendProfile] = useState([]);
  const { fetchUserProfile } = useUserStore();
  const { id } = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await fetchUserProfile(id);
      console.log(userData);
      setFriendProfile(userData);
    }
    fetchUser();
  }, []);

  return (
    <>
      <div className='absolute top-5 right-5'>
      </div>
      <div className="h-screen max-w-xl mx-auto py-8">
        <Container className="px-2 mx-auto">
          <div className="p-6">
            <div className="flex justify-center items-center mb-10">
              <div className="flex  justify-center items-center text-center flex-col">
                <div className="mb-2">
                  <Avatar
                    radius="full"
                    // size={{ base: "7", md: "5" }}
                    size="7"
                    src={friendProfile.avatar?.avatar_url}
                  />
                </div>
                <h1 className='text-xl'>{friendProfile?.fullName}</h1>
                <h1 className='text-base opacity-50'>{friendProfile.username}</h1>
              </div>
            </div>
            <p className='text-zinc-700 font-medium text-xl'>
              Bio
            </p>
            <p className='text-xl w-full'>
              {friendProfile.bio}
            </p>
          </div>
          <Flex align="center" justify="center" p="5">
            <SlCalender /><p className='px-3 opacity-50'>joined 1-02-2000</p>
          </Flex>
        </Container>
      </div>
    </>
  )
}

export default FriendProfilePage