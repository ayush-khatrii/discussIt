import { Avatar, Badge, Box, Container, Flex } from '@radix-ui/themes'
import React from 'react'
import Sidebar from '../Sidebar'
import { SlCalender } from 'react-icons/sl'
import { Link } from 'react-router-dom'

const users = [
  {
    fullName: "Gautam Ghanshani",
    username: "gautam",
    fallback: "gg",
    isGroupAdmin: true
  },
  {
    fullName: "Gaurav Lakhwani",
    username: "gaurav",
    fallback: "gl",
    isGroupAdmin: false
  },
  {
    fullName: "Rahul Lakhwani",
    username: "rahul",
    fallback: "rl",
    isGroupAdmin: false
  },
  {
    fullName: "Hem Khatri",
    username: "hem.khatri",
    fallback: "hk",
    isGroupAdmin: false
  },
]

const SingleGroupInfo = () => {
  return (
    <div>
      <>
        <div className='absolute top-5 right-5'>
          <Sidebar />
        </div>
        <div className="max-w-xl mx-auto py-8">
          <Container className="px-2 mx-auto">
            <div className="p-6">
              <div className="flex justify-center items-center mb-10">
                <div className="flex  justify-center items-center text-center flex-col">
                  <div className="mb-2">
                    <Avatar
                      radius="full"
                      fallback="Gr"
                      size="7"
                    />
                  </div>
                  <h1 className='text-3xl capitalize'>Bodmoshiyaan</h1>
                  <p className='text-zinc-600 my-1 font-medium text-lg'>Group · 4  members</p>
                </div>
              </div>
              <div className='text-center'>
                <p className='text-zinc-600 font-medium text-xl'>
                  About
                </p>
                <p className='text-xl w-full'>Groups OF Bakwaas lorem</p>
              </div>
            </div>
            <div className='p-5 flex flex-col justify-start'>
              <p className='text-center my-5 text-zinc-500 font-medium text-xl p-5 '>Group members</p>
              {users?.map((user, index) => (
                <Link key={index} to={`/chats/${user.username}`}>
                  <div className='p-3'>
                    <Flex gap="3" justify="between" align="center">
                      <Flex gap="3" justify="center" align="center">
                        <div>
                          <Avatar
                            radius="full"
                            size="5"
                            fallback={user.fallback}
                          />
                        </div>
                        <Flex justify="" align="" gap="9">
                          <h1 className='text-xl sm:text-xl  text-zinc-200'>
                            {user.fullName}
                          </h1>
                          {user.isGroupAdmin &&
                            <span>
                              <Badge color="gray" variant="surface" highContrast>Admin</Badge>
                            </span>
                          }
                        </Flex>
                      </Flex>
                    </Flex>
                  </div>
                </Link>
              ))
              }
            </div>
            <Flex align="center" justify="center" p="5">
              <SlCalender /><p className='px-3 opacity-50'>Created on 1-02-2000</p>
            </Flex>
          </Container>
        </div>
      </>
    </div>
  )
}

export default SingleGroupInfo