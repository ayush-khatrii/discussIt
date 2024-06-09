import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Avatar, Box, Button, DropdownMenu, Flex, ScrollArea, TextField } from '@radix-ui/themes';
import toast from 'react-hot-toast';
import { format } from "date-fns";
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { useSocket } from '../../socket';
import useChatStore from '../../store/chatstore';
import useAuthStore from '../../store/authstore';
import { useInfiniteQuery } from '@tanstack/react-query'
import { IoMdAttach, IoMdCopy } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { SlDocs } from "react-icons/sl";
import { CiClock2 } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RiSendPlaneFill } from "react-icons/ri";

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
	const [oldMessages, setOldMessages] = useState([]);
	const [chatData, setChatData] = useState([]);
	const [page, setPage] = useState(1);


	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status
	} = useInfiniteQuery({
		queryKey: ['messages'],
		queryFn: () => getChatMessages(chatId),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => lastPage + 1
	});

	// console.log("data from useInfiniteQuery", data);


	const scrollRef = useRef(null);
	const fetchMsg = async () => {
		const msg = await getChatMessages(chatId, page);
		console.log(msg);
		setOldMessages(msg);
	}
	useEffect(() => {
		fetchMsg();
	}, []);

	console.log("oldMessages", oldMessages)

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

	useEffect(() => {
		// Scroll to the bottom of the chat area when chatData changes
		if (scrollRef.current) {
			scrollRef.current.scrollTo({
				top: scrollRef.current.scrollHeight,
				behavior: 'smooth'
			});
		}
	}, [messages]);

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
			fetchMsg()
		}
	}
	// Call-Back fucntion(useCallBack) for listining to realtime events
	const getMessage = useCallback((data) => {
		setMessages((prevMessages) => [...prevMessages, data.receivedMessage]);
	}, []);

	useEffect(() => {
		socket.on("new-message", getMessage);

		return () => {
			socket.off("new-message", getMessage);
		}
	}, []);


	// const allMessages = [...oldMessages?.messages, ...messages];

	return (
		<>
			<div className='relative top-3'>
				<Sidebar />
			</div>
			<main className={`flex flex-col justify-between h-screen`}>
				<Link to={`/friend/${chatData.otherMemberId}`}>
					<Box as="div" className='bg-zinc-900 border-b border-zinc-700'>
						<Flex align="center" gap="3" className="p-2">
							<Avatar
								radius="full"
								size="4"
								src={chatData?.chatAvatar}
							/>
							<Flex direction="column" className="flex-1">
								<h1 className="text-zinc-400 capitalize font-bold">{chatData?.name}</h1>
								<p className="text-gray-400 text-sm">Last online: 1 hour ago</p>
							</Flex>
						</Flex>
					</Box>
				</Link>
				<ScrollArea ref={scrollRef} type="always" scrollbars="vertical" className="flex-1 overflow-y-auto">
					<div className="flex flex-col gap-2 px-5 py-2">
						{oldMessages?.messages?.map((item, index) => (
							<div key={index} className={`flex items-center gap-1  ${item?.sender?._id === user?._id ? "justify-end" : "justify-start"}`}>
								{
									item?.sender?._id === user?._id &&
									<DropdownMenu.Root>
										<DropdownMenu.Trigger>
											<Button variant="ghost" radius=''>
												<HiOutlineDotsVertical />
											</Button>
										</DropdownMenu.Trigger>
										<DropdownMenu.Content>
											<DropdownMenu.Item>
												<CiClock2 size={20} />  {format(item.createdAt, 'hh:mm a, dd-MMM-yyyy')}</DropdownMenu.Item>
											<DropdownMenu.Item onClick={() => handleCopy(item.content)}>
												<IoMdCopy size={20} /> Copy
											</DropdownMenu.Item>
											<div className={`${item?.sender?._id !== user?._id ? "hidden" : ""}`}>
												<DropdownMenu.Item onClick={() => handleDeleteMessage(item._id)} color="red">
													<MdDeleteOutline size={20} />
													Delete message
												</DropdownMenu.Item>
											</div>
										</DropdownMenu.Content>
									</DropdownMenu.Root>
								}
								<div className={`p-2 flex flex-col rounded-lg cursor-pointer ${item?.sender?._id === user?._id ? "border border-zinc-900 bg-zinc-900" : "bg-zinc-950"}`}>
									<div className='mt-1 flex items-center justify-between gap-2'>
										<div>
											<p className='w-full'>
												{item.content}
												{/* time */}
											</p>
											<p className='text-xs opacity-25 w-full'>
												{format(item.createdAt, 'hh:mm a , dd-MMM-yyyy  ')}
											</p>
										</div>
									</div>
								</div>
								{
									item?.sender?._id !== user?._id &&
									<Button variant="ghost" radius=''>
										<HiOutlineDotsVertical />
									</Button>
								}
							</div>
						))}
						{messages?.map((item, index) => (
							<div key={index} className={`flex items-center gap-1  ${item?.sender?._id === user?._id ? "justify-end" : "justify-start"}`}>
								{
									item?.sender?._id === user?._id &&
									<DropdownMenu.Root>
										<DropdownMenu.Trigger>
											<Button variant="ghost" radius=''>
												<HiOutlineDotsVertical />
											</Button>
										</DropdownMenu.Trigger>
										<DropdownMenu.Content>
											<DropdownMenu.Item>
												<CiClock2 size={20} />  {format(item.createdAt, 'hh:mm a, dd-MMM-yyyy')}</DropdownMenu.Item>
											<DropdownMenu.Item onClick={() => handleCopy(item.content)}>
												<IoMdCopy size={20} /> Copy
											</DropdownMenu.Item>
											<div className={`${item?.sender?._id !== user?._id ? "hidden" : ""}`}>
												<DropdownMenu.Item onClick={() => handleDeleteMessage(item._id)} color="red">
													<MdDeleteOutline size={20} />
													Delete message
												</DropdownMenu.Item>
											</div>
										</DropdownMenu.Content>
									</DropdownMenu.Root>
								}
								<div className={`p-2 flex flex-col rounded-lg cursor-pointer ${item?.sender?._id === user?._id ? "border border-zinc-900 bg-zinc-900" : "bg-zinc-950"}`}>
									<div className='mt-1 flex items-center justify-between gap-2'>
										<div>
											<p className='w-full'>
												{item.content}
											</p>
											<p className='text-xs opacity-25 w-full'>
												{format(item.createdAt, 'hh:mm a , dd-MMM-yyyy  ')}
											</p>
										</div>
									</div>
								</div>
								{
									<Button variant="ghost" radius=''>
										<HiOutlineDotsVertical />
									</Button>
								}
							</div>
						))}
					</div>
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
						<Button type='submit' disabled={message.content === ""} size="3" className="bg-blue-500 text-white rounded-full">
							<RiSendPlaneFill />
						</Button>
					</Flex>
				</form>
			</main >
		</>
	);
};

export default SingleChatPage;