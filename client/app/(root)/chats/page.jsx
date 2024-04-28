import Navbar from '@/components/Navbar'
import { Avatar, Box, Card, Container, Flex, Heading, ScrollArea, Text, TextField } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { MdSearch } from "react-icons/md";
import { GoDotFill } from "react-icons/go";

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
			<Navbar />
			<div className='m-6'>
				<TextField.Root size="3" placeholder="Search chats" className=''>
					<TextField.Slot>
						<MdSearch size="20" />
					</TextField.Slot>
				</TextField.Root>
			</div>
			<div className='flex flex-col px-5 my-5'>
				{users.map((user, index) => (
					<Link key={index} href={`/chats/${user.username}`}>
						<div className='p-4 border-b border-zinc-800 '>
							<Flex gap="3" justify="between">
								<Flex gap="3">
									<div>
										<div className='z-50 relative left-7 top-10 lg:left-12 lg:top-14'>
											<GoDotFill color='lightgreen' />
										</div>
										<Avatar
											radius="full"
											size={{ base: "2", md: "5" }}
											fallback={user.fallback}
										/>
									</div>
									<Flex justify="center" direction="column" gap="1">
										<h1 className='text-xl text-zinc-200'>
											{user.fullName}
										</h1>

									</Flex>
								</Flex>
								<Box as="div">
									<Text as='p'>
										12:00 PM
									</Text>
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