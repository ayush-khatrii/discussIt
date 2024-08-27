import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Avatar, Box, Button, DropdownMenu, Flex, ScrollArea, Spinner, TextField } from '@radix-ui/themes';
import toast from 'react-hot-toast';
import { format } from "date-fns";
import { Link, useParams } from 'react-router-dom';
import { useSocket } from '../../socket';
import useChatStore from '../../store/chatstore';
import useAuthStore from '../../store/authstore';
import { useInfiniteQuery } from '@tanstack/react-query'
import { IoMdAttach, IoMdCopy } from "react-icons/io";
import { SlDocs } from "react-icons/sl";
import { RiSendPlaneFill } from "react-icons/ri";
import { useInView } from "react-intersection-observer";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoCopyOutline } from "react-icons/io5";
import { BiTrash } from "react-icons/bi";


// import Message from '../Message';
const SingleChatPage = () => {
	const socket = useSocket();

	const { chatId } = useParams();

	const { getChatDetails, getChatMessages, deleteMessage } = useChatStore();

	const { getUser } = useAuthStore();
	const [user, setUser] = useState([]);
	const [members, setMembers] = useState([]);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	// const [oldMessages, setOldMessages] = useState([]);
	const [chatData, setChatData] = useState([]);
	const [page, setPage] = useState(1);

	const { ref, inView } = useInView();
	const {
		data,
		error,
		isError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		refetch,
		status,
		lastPage
	} = useInfiniteQuery({
		queryKey: ['messages'],
		queryFn: ({ pageParam = 1 }) => getChatMessages(chatId, pageParam),
		// getNextPageParam(lastPage, allPages) {
		// 	return allPages.length + 1;
		// },
		getNextPageParam: (lastPage, allPages) => allPages.length + 1,
		initialPageParam: 1,
	});

	console.log('data', data);

	const oldMessages = data?.pages.flatMap(page => page.messages) || [];
	console.log('query data', data);

	if (isError) return <div>{error?.message}</div>;
	const scrollRef = useRef(null);
	useEffect(() => {
		if (inView)
			fetchNextPage();
		else return;
	}, [inView, hasNextPage, fetchNextPage]);

	useEffect(() => {
		const getchatdetails = async () => {
			try {
				const [userResponse, chatResponse] = await Promise.all([getUser(), getChatDetails(chatId, page)]);
				setUser(userResponse);
				setMembers(chatResponse.chatdata.members);
				setChatData(chatResponse.chatdata);
			} catch (error) {
				console.log(error.message);
			}
		}
		getchatdetails();
	}, [chatId, getChatDetails, getUser, socket]);



	const handleChange = (e) => {
		setMessage(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		socket.emit("new-message", { chat: chatId, members, content: message, })
		setMessage("");
	}

	const handleCopy = (message) => {
		navigator.clipboard.writeText(message);
		toast.success("Message copied!")
	}
	const handleDeleteMessage = async (messageId) => {
		const deletedMessage = await deleteMessage(messageId);
		if (deletedMessage) {
			toast.success("Message deleted!");
			refetch();
		}
	}
	// Call-Back fucntion(useCallBack) for listining to realtime events
	const getMessage = useCallback((data) => {
		setMessages((prevMessages) => [data.receivedMessage, ...prevMessages]);
	}, []);
	
	useEffect(() => {
		socket.on("new-message", getMessage);

		return () => {
			socket.off("new-message", getMessage);
		}
	}, []);


	const allMessages = [...messages, ...oldMessages];
	// const allMessages = [...oldMessages, ...messages];

	return (
		<>
			<main className={``}>
				<Box as="div" className='bg-zinc-950  border-b border-zinc-900'>
					<Flex align="center" gap="3" className="p-3 mx-5">
						<Link to={`/friend/${chatData.otherMemberId}`}>
							<Avatar
								radius="full"
								size=""
								src={chatData?.chatAvatar}
							/>
						</Link>
						<Flex direction="column" className="flex-1">
							<h1 className="text-zinc-300 capitalize font-bold">{chatData?.name}</h1>
							<p className='text-sm font-medium  text-zinc-600'>last seen: 1 hour ago</p>
						</Flex>
					</Flex>
				</Box>
				{/* <ScrollArea ref={scrollRef} type="always" style={{ height: "80vh" }} scrollbars="vertical" className="" >
					<div className="flex flex-col gap-2 px-5 z-50 py-5">
						{allMessages.map((item, index) => (
							<div key={index} className={`flex items-center gap-1 ${item?.sender?._id === user?._id ? "justify-end" : "justify-start"}`}>
								<div className='flex flex-col items-end'>
									<div className={`px-3 py-2 w-auto flex flex-col rounded-lg cursor-pointer ${item?.sender?._id === user?._id ? "border border-zinc-900 bg-zinc-900" : "bg-zinc-950 border border-zinc-800"}`}>
										<div className=''>
											<div>
												<p className='w-full text-zinc-300'>{item.content}</p>
												<p className={`text-xs py-1 pr-2 opacity-25 ${item?.sender?._id === user?._id ? "text-right" : "text-left"}`}>{format(item.createdAt, 'hh:mm a, dd-MMM-yyyy')}</p>
											</div>
										</div>
									</div>
									<div>
									</div>
								</div>
								{index === allMessages.length - 1 && <div ref={ref}></div>}
							</div>
						))}
					</div>
					{hasNextPage && <div className='text-center text-zinc-600'>You reached the end of the Discussions!</div>}
				</ScrollArea> */}
				<ScrollArea type="always" style={{ height: "80vh" }} scrollbars="vertical">
					<div className="flex flex-col gap-2 px-5 py-5">
						{allMessages.length === 0 ? (
							<p className="opacity-50 text-center text-sm">
								No messages yet! <b className='text-zinc'>Start Discussion</b>
							</p>
						) : null}

						{allMessages.map((item, index) => {
							const isSender = item?.sender?._id === user?._id;
							return (
								<div key={index} className={`flex items-center gap-1 ${isSender ? "justify-end" : "justify-start"}`}>
									<div className='flex flex-col items-end'>
										<div className={`relative group px-3 py-2 w-auto flex flex-col rounded-lg cursor-pointer transition-all duration-300 ${isSender ? "border border-zinc-800 bg-zinc-800" : "bg-zinc-950 border border-zinc-800"}`}>
											<div className='flex justify-between items-center'>
												<p className='text-zinc-300'>
													{item.content}
												</p>
												{isSender && (
													<div className='relative'>
														<button className="text-zinc-400 opacity-75 hover:opacity-100 group-hover:block hidden">
															<HiOutlineDotsVertical size={20} /></button>
														<div className="absolute right-0 mt-2 w-40 bg-zinc-900 border border-zinc-700 rounded shadow-lg hidden group-hover:block z-50">
															<button
																className="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 w-full"
																onClick={() => handleCopy(item.content)}
															>
																<IoCopyOutline className="mr-2" /> Copy
															</button>
															<button
																className="flex items-center px-4 py-2 text-sm text-red-500 hover:bg-zinc-800 w-full"
																onClick={() => handleDeleteMessage(item._id)}
															>
																<BiTrash className="mr-2" /> Delete
															</button>
														</div>
													</div>
												)}
											</div>
											<p className={`text-xs py-1 pr-2 opacity-50 ${isSender ? "text-right" : "text-left"}`}>
												{format(item.createdAt, 'hh:mm a, dd-MMM-yyyy')}
											</p>
										</div>
									</div>
									{index === allMessages.length - 1 && <div ref={ref}></div>}
								</div>
							);
						})}
					</div>
					{!hasNextPage && <div className='text-center text-zinc-600'>You reached the end of the Discussions!</div>}
				</ScrollArea>

				<form onSubmit={handleSubmit}>
					<Flex justify="center" items="center" className="p-3 pb-5">
						<TextField.Root size="3" radius='medium' name='content' value={message} onChange={handleChange} placeholder='Type a message...' className="flex-grow rounded-lg  mx-2" >
							<TextField.Slot>
								<DropdownMenu.Root>
									<DropdownMenu.Trigger>
										<Button variant="ghost">
											<IoMdAttach size={25} />
										</Button>
									</DropdownMenu.Trigger>
									<DropdownMenu.Content>
										<label htmlFor="file-input" className="flex text-base items-center cursor-pointer">
											<SlDocs />
											<span className="ml-2">Send File</span>
										</label>
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							</TextField.Slot>
						</TextField.Root>
						<Button type='submit' radius='full' as="a" disabled={message.content === ""} size="3" className="bg-blue-500 text-white rounded-full">
							<RiSendPlaneFill />
						</Button>
					</Flex>
				</form>
			</main >
		</>
	);
};

export default SingleChatPage;