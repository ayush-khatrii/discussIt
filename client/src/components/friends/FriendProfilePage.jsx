import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Container, Flex } from "@radix-ui/themes";
import Sidebar from "../Sidebar";
import { SlCalender } from "react-icons/sl";

const FriendProfilePage = () => {


  return (
    <>
      <div className='absolute top-5 right-5'>
        <Sidebar />
      </div>
      <div className="h-screen max-w-xl mx-auto py-8">
        <Container className="px-2 mx-auto">
          <div className="p-6">
            <div className="flex justify-center items-center mb-10">
              <div className="flex  justify-center items-center text-center flex-col">
                <div className="mb-2">
                  <Avatar
                    radius="full"
                    fallback="h"
                    size={{ base: "4", md: "5" }}
                  />
                </div>
                <h1 className='text-xl'>fullname</h1>
              </div>
            </div>
            <p className='text-zinc-700 font-medium text-xl'>
              Bio
            </p>
            <p className='text-xl w-full'>Hello my name is ayush and i love coding qkej5tjeoityeh jrghuimuerhgkueh  💘💘💘💘💘💘💘💘</p>
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