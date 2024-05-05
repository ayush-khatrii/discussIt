import { Button, Container, Dialog, Flex, Heading, Spinner, Text, TextField } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import useAuthStore from '../../store/store';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { FaRegEdit } from "react-icons/fa";

const Profile = () => {
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
      <div className="h-screen max-w-7xl mx-auto py-8">
        <Container className="px-2 mx-auto">
          <h1 className="text-left px-8 lg:text-center font-bold my-5 text-xl">{user?.username}</h1>
          <div className="p-6">
            <div className="flex justify-between lg:justify-between items-start mb-10">
              <div>
                <div className="w-20 h-20 rounded-full overflow-hidden mb-2">
                  {
                    isLoading ?
                      <div className='relative top-10 left-8'>
                        <Spinner size="3" className='z-50  object-cover w-full h-full' />
                      </div> :
                      <img src={user?.avatar?.avatar_url} alt="Avatar" className="object-cover w-full h-full" />
                  }
                </div>
                <h1 className='text-xl'>{user?.fullName}</h1>
              </div>
              <div className='text-center '>
                <h1 className='text-4xl font-bold'>344</h1>
                <p className='text-2xl'>Friends</p>
              </div>
            </div>
            <p className='opacity-50'>
              Bio
            </p>
            <p className='text-xl w-full'>{user?.bio || "Hello my name is ayush and i love coding qkej5tjeoityeh jrghuimuerhgkueh  💘💘💘💘💘💘💘💘"}</p>
          </div>
          <div className='px-5'>
            <Dialog.Root>
              <Dialog.Trigger>
                <Button>
                  <FaRegEdit /> Edit profile
                </Button>
              </Dialog.Trigger>
              <Dialog.Content maxWidth="450px">
                <Dialog.Title>Edit profile</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                  Make changes to your profile.
                </Dialog.Description>

                <Flex direction="column" gap="3">

                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="multiple_files">
                    <Text as="div" size="2" mb="1" weight="bold">
                      Upload Profile Photo
                    </Text>
                    <TextField.Root class="block" id="multiple_files" type="file" />
                  </label>

                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Full Name
                    </Text>
                    <TextField.Root
                      defaultValue="Freja Johnsen"
                      placeholder="Enter your full name"
                    />
                  </label>
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Username
                    </Text>
                    <TextField.Root
                      defaultValue="freja@example.com"
                      placeholder="Enter your email"
                    />
                  </label>
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Bio
                    </Text>
                    <TextField.Root
                      defaultValue="freja@example.com"
                      placeholder="Enter your email"
                    />
                  </label>
                </Flex>
                <Flex gap="3" mt="4" justify="end">
                  <Dialog.Close>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Dialog.Close>
                    <Button>Save</Button>
                  </Dialog.Close>
                </Flex>
              </Dialog.Content>
            </Dialog.Root>
          </div>
        </Container>
      </div>
    </>
  );
}
export default Profile;
