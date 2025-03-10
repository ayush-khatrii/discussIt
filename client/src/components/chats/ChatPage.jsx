import { Avatar, Badge, Flex } from '@radix-ui/themes'
import React, { useEffect, useMemo, useState } from 'react'

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

	if (!chats || chats?.length < 1) {
		return (
			<div className='flex flex-col justify-center items-center'>
				<p className='p-5 flex text-white  justify-center items-center text-center'>No Chats Found! Click on the  + icon to create a new chat </p>
			</div>
		)
	}
	return (
		<>
			<div className='flex flex-col'>
				{chats?.map((chat, index) => (
					<div key={index}>
						<div className='cursor-pointer w-full flex flex-col'>
							<Link to={`/chats/${chat?._id}`} className='hover:bg-zinc-900 w-full transition ease-in-out duration-200 rounded'>
								<div className='border-b p-2 border-zinc-900'>
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
												<h1 className='text-lg md:text-base text-zinc-300'>
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
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default ChatsPage