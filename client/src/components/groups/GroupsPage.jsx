import { Avatar, Badge, Box, Dialog, Button, Flex, ScrollArea, Separator, TextField } from '@radix-ui/themes'
import React, { useEffect, useMemo, useState } from 'react'
import { MdSearch } from "react-icons/md";

import { Link } from 'react-router-dom';
import { useSocket } from '../../socket';
import { io } from 'socket.io-client';
import useChatStore from '../../store/chatstore';

const GroupsPage = () => {
  const [groupChats, setGroupChats] = useState([])
  const { getMyChats } = useChatStore();
  useEffect(() => {
    const getChats = async () => {
      const chats = await getMyChats();
      const groups = chats.filter(chat => chat.isGroup);
      setGroupChats(groups);
    };
    getChats();
  }, []);

  if (groupChats?.length === 0) {
    return (
      <div className='flex flex-col text-left'>
        <p className='p-5 flex  justify-center items-center text-center'>No Group Chats Found! </p>
        <Button size="2" variant="soft">
          Create Group
        </Button>
      </div>
    )
  }
  return (
    <>
      <div className='flex flex-col px-5 my-5'>
        {groupChats?.map((chat, index) => (
          <>
            <div key={index} className=' my-3 cursor-pointer w-full flex md:justify-start flex-col'>
              <Link to={`/chats/${chat?._id}`} className='hover:bg-zinc-600 w-full transition ease-out duration-300 rounded'>
                <div className='p-3'>
                  <Flex gap="3" justify="between" align="center">
                    <Flex gap="3" justify="center" align="center">
                      <div>
                        <Avatar
                          key={chat.username}
                          radius="full"
                          size={{ base: "5", md: "3" }}
                          src={chat?.avatar} />
                      </div>
                      <Flex justify="center" direction="column" align="center" gap="1">
                        <h1 className='text-xl sm:text-xl  text-zinc-200'>
                          {chat.name}
                        </h1>
                      </Flex>
                    </Flex>
                  </Flex>
                </div>
              </Link>
              <Separator size="4" />
            </div>
          </>
        ))}
      </div>
    </>
  )
}

export default GroupsPage;