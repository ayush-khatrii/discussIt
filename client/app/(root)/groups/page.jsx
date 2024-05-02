import Navbar from '@/components/Navbar'
import { Avatar, Box, Card, Container, Flex, Heading, ScrollArea, Text, TextField } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { MdSearch } from "react-icons/md";

const users = [
	{
		fullName: "Masti Majak",
		chatName: "masti-majak",
		fallback: "gg"
	},
	{
		fullName: "pagal Panti",
		chatName: "pagal.panti",
		fallback: "kk"
	},

]


const GroupsPage = () => {
	return (
		<>
			<Navbar />
			<div className='m-6'>
				<TextField.Root size="3" placeholder="Search groups	" className=''>
					<TextField.Slot>
						<MdSearch size="20" />
					</TextField.Slot>
				</TextField.Root>
			</div>
			<div className='flex flex-col px-5 my-5'>
				{users.map((user, index) => (
					<Link key={index} href={`/groups/${user.chatName}`}>
						<div className='p-4 border-b border-zinc-800 '>
							<Flex gap="3" justify="between">
								<Flex gap="3">
									<Avatar
										radius="full"
										size="4"
										src="https://i.pinimg.com/736x/cc/46/eb/cc46eb3eebd3cda03972d215ab764b34.jpg"
										fallback={user.fallback}
									/>
									<Flex justify="center" direction="column" gap="1">
										<h1 className='text-xl text-zinc-200'>
											{user.fullName}
										</h1>
										{/* <p className='text-xl text-gray-500'>
											{user.username}
										</p> */}
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
			</div>
		</>
	)
}

export default GroupsPage