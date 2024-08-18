import React, { useEffect } from 'react'
import useFriendsStore from '../store/friendsStore';
import { Avatar, Button, Dialog, Flex, ScrollArea, TextField, Tooltip } from '@radix-ui/themes';
import { FaBell } from 'react-icons/fa';
import toast from 'react-hot-toast';

const FriendRequests = () => {
  const { getAllFriendRequests, allFriendRequests, accepFriendRequest } = useFriendsStore();
  useEffect(() => {
    getAllFriendRequests();
  }, []);

  const handleAcceptFriendRequest = (id, value) => {
    accepFriendRequest(id, value);
    toast.success("Friend Request Accepted!");
    getAllFriendRequests();
  }
  const handleRejectFriendRequest = (id, value) => {
    try {
      accepFriendRequest(id, value);
      toast.success("Friend Request Rejected!");
      getAllFriendRequests();
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <div>
        <Dialog.Root>
          <Tooltip content="Friend Requests">
            <Dialog.Trigger>
              <div className='cursor-pointer'>
                <FaBell size="18" />
              </div>
            </Dialog.Trigger>
          </Tooltip>
          <Dialog.Content maxWidth="450px">
            <Dialog.Title>Friend Requests</Dialog.Title>
            <ScrollArea type="always" scrollbars="vertical" style={{ height: 300 }}>
              {!allFriendRequests && <p className='text-center mt-32'>No Friend Requests!</p>}
              {
                allFriendRequests?.map((item, index) => (
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