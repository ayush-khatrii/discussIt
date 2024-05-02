"use client"
import Navbar from '@/components/Navbar'
import { Avatar, Box, Card, Container, Flex, Heading, ScrollArea, Separator, Text, TextField } from '@radix-ui/themes'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { MdSearch } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import config from '@/constants/config'
import Sidebar from '@/components/Sidebar'

const { SERVER_URL } = config

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
		fullName: "Kush Khatri",
		username: "kush.khatri",
		fallback: "kk"
	},
	{
		fullName: "Jatt Khatri",
		username: "jatt.khatri",
		fallback: "jk"
	},
	{
		fullName: "Aashi Khatri",
		username: "aashi.khatri",
		fallback: "ak"
	},
]
const ChatsPage = () => {
	return (
		<>
			{/* <Navbar /> */}
			<Sidebar />
			<h1 className='font-bold text-2xl md:text-4xl m-5'>Discuss-It</h1>
			<Separator my="3" size="4" />
			<div className='flex flex-col px-5 my-5'>
				<div className='flex justify-start m-5 items-center'>
					{/* <h1 className='text-2xl font-semibold text-center mx-5 mb-8'>Your chats</h1> */}
					<TextField.Root placeholder="Search chats">
						<TextField.Slot>
							<MdSearch size="20" />
						</TextField.Slot>
					</TextField.Root>
				</div>
				{users.map((user, index) => (
					<Link key={index} href={`/chats/${user.username}`}>
						<div className='p-3'>
							<Flex gap="3" justify="between" align="center">
								<Flex gap="3" justify="center" align="center">
									<div>
										<div className='z-50 relative left-7 top-10 lg:left-9 lg:top-10'>
											<GoDotFill color='lightgreen' />
										</div>
										<Avatar
											radius="full"
											size={{ base: "5", md: "4" }}
											fallback={user.fallback}
										/>
									</div>
									<Flex justify="center" direction="column" align="center" gap="1">
										<h1 className='text-xl sm:text-xl  text-zinc-200'>
											{user.fullName}
										</h1>
									</Flex>
								</Flex>
								<Box as="div">
									<p className='text-sm sm:text-lg text-zinc-500'>12:00 PM</p>
								</Box>
							</Flex>
						</div>
					</Link>
				))
				}
			</div >
		</>
	)
}

export default ChatsPage