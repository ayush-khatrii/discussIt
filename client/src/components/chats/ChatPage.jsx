import { Avatar, Badge, Box, Button, Dialog, Flex, ScrollArea, Separator, TextField } from '@radix-ui/themes'
import React, { useEffect, useMemo, useState } from 'react'
import { MdSearch } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom';
import { IoMdNotifications } from "react-icons/io";
import { IoHeartSharp, IoSearchOutline } from "react-icons/io5";
import { BsChatLeftTextFill } from "react-icons/bs";
import { useSocket } from '../../socket';
import { io } from 'socket.io-client';
import useChatStore from '../../store/chatstore';
import useFriendsStore from '../../store/friendsStore';

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
	const [myChats, setMyChats] = useState([])

	const { getMyChats } = useChatStore();
	useEffect(() => {
		const getChats = async () => {
			const chats = await getMyChats();
			setMyChats(chats);
			console.log("Chats :: ", chats);
		};
		getChats();
	}, []);

	console.log("These are my chats :::::: ", myChats);

	if (!users) {
		return (
			<div>
				<h1>No Chats Found! Click on the  + icon to create a new chat </h1>
			</div>
		)
	}
	return (
		<>
			<div className='absolute top-5 right-2'>
				<Sidebar />
			</div>
			<div className='absolute top-6 right-20 cursor-pointer'>
				<IoMdNotifications size="30" />
			</div>
			<div className='absolute top-6 right-32 cursor-pointer'>
				<div className=''>
					{/* <Dialog.Root>
						<Dialog.Trigger>
							<IoHeartSharp size="30" />
						</Dialog.Trigger>
						<Dialog.Content maxWidth="450px">
							<Dialog.Title mb="6">Friend Requests</Dialog.Title>
							<ScrollArea type="always" scrollbars="vertical" style={{ height: 300 }}>
								{users.map((item, index) => (
									<div key={index}>
										<Flex mr="5" align="center" mb="3" justify="between">
											<div className='flex gap-3'>
												<Avatar
													radius='full'
													fallback={item.fallback}
												/>
												<h1>{item.fullName}</h1>
											</div>
											<Button>Accept</Button>
										</Flex>
									</div>
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
					</Dialog.Root> */}
				</div>
			</div>
			{/* <Navbar /> */}
			<div className='flex justify-between items-center text-center gap-3'>
				<h1 className='font-bold text-2xl md:text-4xl m-5'>Discuss-It</h1>
			</div>
			<Separator my="3" size="4" />
			<div className='flex flex-col px-5 py-2'>
				<div className='flex justify-start m-5 items-center'>
					<TextField.Root placeholder="Search chats">
						<TextField.Slot>
							<MdSearch size="20" />
						</TextField.Slot>
					</TextField.Root>
				</div>
				{myChats?.map((chat, index) => (
					<div key={index}>
						<Link to={`/chats/${chat?._id}`}>
							<div className='p-3'>
								<Flex gap="3" justify="between" align="center">
									<Flex gap="3" justify="center" align="center">
										<div>
											<div className='z-50 relative left-7 top-10 lg:left-9 lg:top-10'>
												<GoDotFill color='lightgreen' />
											</div>
											<Avatar
												key={chat.username}
												radius="full"
												size={{ base: "5", md: "4" }}
												src={chat?.avatar} />
										</div>
										<Flex justify="center" direction="column" align="center" gap="1">
											<h1 className='text-xl sm:text-xl  text-zinc-200'>
												{chat.name}
											</h1>
										</Flex>
									</Flex>
									<Box as="div">
										<p className='text-sm sm:text-lg text-zinc-500'>12:00 PM</p>
									</Box>
								</Flex>
							</div>
						</Link>
					</div>
				))}
			</div>
			<div className='fixed bottom-5 right-5'>

			</div>
		</>
	)
}

export default ChatsPage