import { Avatar, Badge, Box, Button, Dialog, Flex, ScrollArea, Separator, TextField } from '@radix-ui/themes'
import React, { useEffect, useMemo, useState } from 'react'
import { MdSearch } from "react-icons/md";

import { Link } from 'react-router-dom';
import { useSocket } from '../../socket';
import useChatStore from '../../store/chatstore';
import useUserStatus from '../../hooks/useUserStatus';

const ChatsPage = () => {
	const socket = useSocket();
	const onlineUsers = useUserStatus(socket);

	const { chats, getMyChats } = useChatStore();
	useEffect(() => {
		const fetchChats = async () => {
			await getMyChats();
		};

		fetchChats();
	}, [getMyChats]);

	if (chats?.length === 0) {
		return (
			<div className='flex flex-col justify-center items-center'>
				<p className='p-5 flex  justify-center items-center text-center'>No Chats Found! Click on the  + icon to create a new chat </p>
			</div>
		)
	}
	return (
		<>
			<div className='flex flex-col px-5 my-3'>
				{chats?.map((chat, index) => (
					<>
						<div key={index} className='cursor-pointer w-auto h-full flex flex-col'>
							<Link to={`/chats/${chat?._id}`} className='hover:bg-zinc-900 px-2 py-1  w-full transition ease-out  duration-200 rounded'>
								<div className=' py-2 border-b border-zinc-900'>
									<Flex gap="3" justify="between" align="center">
										<Flex gap="3" justify="center" align="center">
											<div>
												<Avatar
													key={chat.username}
													radius="full"
													size={"2"}
													className='border'
													src={chat?.avatar} />
											</div>
											<div className="flex w-full justify-between">
												<h1 className='text-xl sm:text-xl text-zinc-300'>
													{chat.name}
												</h1>
												<div className='absolute right-8'>
													{
														onlineUsers.some(user => user.id === chat?.otherMemberId && user.status === 'online') && <Badge color="green">Online</Badge>
													}
												</div>
											</div>
										</Flex>
									</Flex>
								</div>
							</Link>
							{/* <div className='opacity-20'>
								<Separator size="4" className='' orientation="horizontal" />
							</div> */}
						</div>
					</>
				))}
			</div>
		</>
	)
}

export default ChatsPage