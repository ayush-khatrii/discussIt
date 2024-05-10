import { Avatar, Box, Button, Card, Container, Dialog, Flex, ScrollArea, Text, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import { FaUserGroup } from 'react-icons/fa6'
import { GoDotFill } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";
import { TbCirclePlus } from "react-icons/tb";
import { IoCheckmark } from "react-icons/io5";
import Sidebar from "../Sidebar";

const users = [
  {
    fullName: "Gautam Ghanshani",
    username: "gautam",
    fallback: "gg"
  },
  {
    fullName: "Gaurav Lakhwani",
    username: "gaurav",
    fallback: "gl"
  },
  {
    fullName: "Rahul Lakhwani",
    username: "rahul",
    fallback: "rl"
  },
  {
    fullName: "Hem Khatri",
    username: "hem.khatri",
    fallback: "hk"
  },
  {
    fullName: "Kush Khatri",
    username: "kush.khatri",
    fallback: "kk"
  },
  {
    fullName: "Jatt Khatri",
    username: "jatt.khatri",
    fallback: "jk"
  },

];


const Friends = () => {
  const [friendRequests, setFriendRequests] = useState([]);

  const sendFriendRequest = (username) => {
    setFriendRequests([...friendRequests, username]);
  };

  const isRequested = (username) => {
    return friendRequests.includes(username);
  };

  const [state, setState] = useState(false);
  return (
    <div>
      <div className='absolute top-5 right-2'>
        <Sidebar />
      </div>
      <div className='flex justify-center items-center text-center gap-3 p-5'>
        <h1 className='text-3xl'>
          Your Friends
        </h1>
      </div>
      <Flex direction="column" gap="5" p="5">
        {users.map((user, index) => (
          <Link key={index} to={`/friend/${user.username}`}>
            <div className='p-3'>
              <Flex gap="3" justify="between" align="center">
                <Flex gap="3" justify="center" align="center">
                  <div>
                    <Avatar
                      radius="full"
                      size={{ base: "5", md: "4" }}
                      fallback={user.fallback}
                    />
                  </div>
                  <Flex justify="center" direction="column" align="center" gap="1">
                    <h1 className='text-xl sm:text-xl text-zinc-200'>
                      {user.fullName}
                    </h1>
                  </Flex>
                </Flex>
              </Flex>
            </div>
          </Link>
        ))}
      </Flex>
      <div className='fixed bottom-5 right-5'>
        <Dialog.Root>
          <Dialog.Trigger>
            <Button>
              <TbCirclePlus size="20" />
              Add Friends
            </Button>
          </Dialog.Trigger>

          <Dialog.Content maxWidth="450px">
            <Dialog.Title> Add friends by sending a friend request</Dialog.Title>
            <Flex direction="column" gap="3" my="4" pb="4">
              <TextField.Root placeholder="type...">
                <TextField.Slot>
                  <IoSearchOutline height="16" width="16" />
                </TextField.Slot>
              </TextField.Root>
            </Flex>
            <ScrollArea type="always" scrollbars="vertical" style={{ height: 300 }}>
              {users.map((item, index) => (
                <Flex mr="5" key={index} align="center" mb="3" justify="between">
                  <div className='flex items-center gap-3'>
                    <Avatar
                      radius='full'
                      fallback={item.fallback}
                    />
                    <h1>{item.fullName}</h1>
                  </div>
                  <div className='space-x-2'>
                    {!item.isFriend && !isRequested(item.username) ? (
                      <Button onClick={() => sendFriendRequest(item.username)}>Add</Button>
                    ) : (
                      <Button variant="surface" color='green'><IoCheckmark color='green' /></Button>
                    )}
                  </div>
                </Flex>
              ))}
            </ScrollArea>
            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </div>
  )
}

export default Friends