import React, { useCallback, useEffect, useState } from 'react'
import useFriendsStore from '../store/friendsStore';
import { Avatar, Badge, Button, Dialog, Flex, ScrollArea, TextField, Tooltip } from '@radix-ui/themes';
import { FaUserFriends } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useChatStore from '../store/chatstore';
import { NEW_FRIEND_REQUEST } from "../constants/events"
import { useSocket } from '../socket';
import { FaBell } from "react-icons/fa";

const FriendRequests = () => {
  const socket = useSocket();
  const { getAllFriendRequests, allFriendRequests, acceptOrRejectFriendRequest, setFriendsRequests } = useFriendsStore();
  const { getMyChats } = useChatStore();
  const [isNewFriendRequest, setIsNewFriendRequest] = useState(false);
  const [totalFriendRequests, setTotalFriendRequests] = useState(0);


  const handleAcceptFriendRequest = (id, value) => {
    acceptOrRejectFriendRequest(id, value);
    toast.success("Friend Request Accepted!");
    getAllFriendRequests();
    getMyChats();
  }
  const handleRejectFriendRequest = (id, value) => {
    acceptOrRejectFriendRequest(id, value);
    toast.success("Friend Request Rejected!");
    getMyChats();
  };


  useEffect(() => {
    getAllFriendRequests();
  }, []);

  useEffect(() => {
    const handleNewFriendRequest = (data) => {
      setFriendsRequests([...data.friendRequests, ...allFriendRequests]);
      const length = data.friendRequests.length;
      setTotalFriendRequests(length);
      if (data.friendRequests.length > 0) {
        setIsNewFriendRequest(true);
      }
    };

    socket.on(NEW_FRIEND_REQUEST, handleNewFriendRequest);

    return () => {
      socket.off(NEW_FRIEND_REQUEST, handleNewFriendRequest);
    };
  }, [socket, setFriendsRequests]);


  return (
    <>
      <div>
        <Dialog.Root>
          <Tooltip content="Friend Requests">
            <Dialog.Trigger onClick={() => setIsNewFriendRequest(false)}>
              <div className={`cursor-pointer ${isNewFriendRequest ? "" : ""}`}>
                <FaBell size="18" />
                {
                  isNewFriendRequest &&
                  <div className='rounded-full'>
                    <Badge radius='full' variant='solid' className='absolute rounded-full top-3 right-2' size="1" color="red">
                      {totalFriendRequests}
                    </Badge>
                  </div>
                  // <div className='px-1 py-1 bg-red-600 rounded-full absolute top-5 right-4'></div>
                }
              </div>
            </Dialog.Trigger>
          </Tooltip>
          <Dialog.Content maxWidth="450px">
            <Dialog.Title>Friend Requests</Dialog.Title>
            <ScrollArea type="always" scrollbars="vertical" style={{ height: 300 }}>
              {!allFriendRequests && <p className='text-center mt-32'>No Friend Requests!</p>}
              {Array.isArray(allFriendRequests) && allFriendRequests?.map((item) => (
                <Flex mr="5" key={"1"} align="center" my="3" justify="between">
                  <>
                    <div className='flex items-center gap-3'>
                      <Avatar
                        radius='full'
                        src={item.sender.avatar}
                      />
                      <div>
                        <h1 className='font-medium'>{item.sender?.fullName}</h1>
                        <span className='text-zinc-400'>{item.sender.username}</span>
                      </div>
                    </div>
                    <div className='space-x-2'>
                      <Button onClick={() => handleAcceptFriendRequest(item._id, true)}>Confirm</Button>
                      <Button variant='outline' onClick={() => handleRejectFriendRequest(item._id, false)} color='gray'>Delete</Button>
                    </div>
                  </>
                </Flex>
              ))
              }
            </ScrollArea>
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </>

  )
}

export default FriendRequests