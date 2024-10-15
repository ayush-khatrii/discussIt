import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
	Avatar,
	Box,
	Button,
	DropdownMenu,
	Flex,
	ScrollArea,
	Spinner,
	TextField
} from '@radix-ui/themes';
import toast from 'react-hot-toast';
import { format } from "date-fns";
import { Link, useParams } from 'react-router-dom';
import { useSocket } from '../../socket';
import useChatStore from '../../store/chatstore';
import useAuthStore from '../../store/authstore';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IoMdAttach, IoMdCopy } from "react-icons/io";
import { SlDocs } from "react-icons/sl";
import { RiSendPlaneFill } from "react-icons/ri";
import { useInView } from "react-intersection-observer";
import { HiOutlineDotsVertical, HiOutlineSearch } from "react-icons/hi";
import { IoCall, IoCopyOutline, IoVideocam } from "react-icons/io5";
import { BiTrash } from "react-icons/bi";
import { NEW_MESSAGE, MESSAGE_DELETED } from '../../constants/events';
import EmojiPicker from 'emoji-picker-react';
import { FaRegLaugh } from "react-icons/fa";


const SingleChatPage = () => {
	const socket = useSocket();
	const { chatId } = useParams();
	const { getChatDetails, getChatMessages, clearChatMessages } = useChatStore();
	const { getUser } = useAuthStore();

	const [user, setUser] = useState([]);
	const [members, setMembers] = useState([]);
	const [message, setMessage] = useState("");
	const [chatData, setChatData] = useState([]);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [showEmoji, setShowEmoji] = useState(false);

	const { ref, inView } = useInView();
	const scrollAreaRef = useRef(null);

	const queryClient = useQueryClient();
	const { data, error, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: ['messages', chatId],
		queryFn: ({ pageParam = 1 }) => getChatMessages(chatId, pageParam),
		getNextPageParam: (lastPage, allPages) => allPages.length + 1,
	});

	// Send new message mutation
	const sendMessageMutation = useMutation({
		mutationFn: (newMessage) => socket.emit(NEW_MESSAGE, newMessage),
		onSuccess: () => {
			queryClient.invalidateQueries(['messages', chatId]);
		},
	});

	const oldMessages = data?.pages.flatMap(page => page.messages).reverse() || [];
	if (isError) return <div>{error}</div>;

	useEffect(() => {
		if (inView) fetchNextPage();
	}, [inView, fetchNextPage]);

	useEffect(() => {
		const fetchChatDetails = async () => {
			try {
				const [userResponse, chatResponse] = await Promise.all([
					getUser(),
					getChatDetails(chatId),
				]);
				setUser(userResponse);
				setMembers(chatResponse.chatdata.members);
				setChatData(chatResponse.chatdata);
			} catch (err) {
				toast.error("Failed to load chat details");
				console.error(err);
			}
		};
		fetchChatDetails();
	}, [chatId, getChatDetails, getUser]);

	const handleSendMessage = useCallback(
		(e) => {
			e.preventDefault();
			if (!message.trim()) return;
			sendMessageMutation.mutate({
				chat: chatId,
				members: chatData.members,
				content: message,
			});
			setMessage("");
		},
		[chatId, chatData, message, sendMessageMutation]
	);

	const handleCopy = useCallback((message) => {
		navigator.clipboard.writeText(message);
		toast.success("Message copied!");
	}, []);


	const clearChatMutation = useMutation({
		mutationFn: () => clearChatMessages(chatId),
		onMutate: async () => {
			await queryClient.cancelQueries(['messages', chatId]);

			const previousMessages = queryClient.getQueryData(['messages', chatId]);

			queryClient.setQueryData(['messages', chatId], {
				pages: [{ messages: [] }],
				pageParams: [1],
			});

			return { previousMessages };
		},
		onError: (err, newTodo, context) => {
			queryClient.setQueryData(['messages', chatId], context.previousMessages);
			console.log("Attempting to show error toast");
			toast.error("Failed to clear chat");
		},
		onSuccess: () => {
			console.log("Attempting to show success toast");
			toast.success("Chat cleared successfully");
		},
		onSettled: () => {
			queryClient.invalidateQueries(['messages', chatId]);
		},
	});

	const handleGetNewMessage = useCallback(
		(data) => {
			queryClient.setQueryData(['messages', chatId], (oldData) => {
				if (!oldData) return { pages: [{ messages: [data.receivedMessage] }], pageParams: [1] };
				return {
					...oldData,
					pages: oldData.pages.map((page, index) =>
						index === 0
							? { ...page, messages: [data.receivedMessage, ...page.messages] }
							: page
					),
				};
			});
			if (scrollAreaRef.current) {
				scrollAreaRef.current.scrollTo(0, scrollAreaRef.current.scrollHeight);
			}
		},
		[chatId, queryClient]
	);

	useEffect(() => {
		socket.on(NEW_MESSAGE, handleGetNewMessage);
		return () => {
			socket.off(NEW_MESSAGE, handleGetNewMessage);
		};
	}, [socket, handleGetNewMessage]);

	const handleEmojiClick = (emojiObject) => {
		setMessage((prev) => prev + emojiObject.emoji);
	};

	const allMessages = oldMessages;

	return (
		<main className={`h-screen flex flex-col justify-between`}>
			{/* Header Section */}
			<Flex align="center" gap="3" className="bg-zinc-950 border-b border-zinc-900 p-3 mx-5">
				<Link to={`/friend/${chatData.otherMemberId}`}>
					<Avatar
						radius="full"
						size=""
						src={chatData?.chatAvatar}
					/>
				</Link>
				<Flex direction="column" className="flex-1">
					<h1 className="text-zinc-300 capitalize font-bold">{chatData?.name}</h1>
					<p className='text-sm font-medium text-zinc-600'>last seen: 1 hour ago</p>
				</Flex>
				<div className='mx-12 mt-2'>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<Button variant='soft'>
								<HiOutlineDotsVertical />
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<Link to={`/friend/${chatData.otherMemberId}`}>
								<DropdownMenu.Item>View Profile</DropdownMenu.Item>
							</Link>
							<DropdownMenu.Sub>
								<DropdownMenu.SubTrigger>Call</DropdownMenu.SubTrigger>
								<DropdownMenu.SubContent>
									<DropdownMenu.Item>Voice Call <IoCall /></DropdownMenu.Item>
									<DropdownMenu.Item>Video Call <IoVideocam /></DropdownMenu.Item>
								</DropdownMenu.SubContent>
							</DropdownMenu.Sub>
							<DropdownMenu.Separator />
							<DropdownMenu.Item
								onClick={() => {
									if (oldMessages.length < 1) {
										return toast.error("Chat is empty");
									}
									clearChatMutation.mutate();
									toast.success("Chat cleared successfully");
								}}
								color="red">
								Clear Chat
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</Flex>

			{/* Messages Section */}
			<div>
				<ScrollArea
					ref={scrollAreaRef}
					type="always"
					style={{ height: 'calc(100vh - 150px)' }}
					scrollbars="vertical"
				>
					<div className="flex flex-col gap-2 px-5 py-5">
						{isFetchingNextPage && <Spinner />}
						<div ref={ref}></div>
						{allMessages.length === 0 ? (
							<p className="opacity-50 text-center text-sm">
								No messages yet! <b className='text-zinc'>Start Discussion</b>
							</p>
						) : (
							allMessages.map((item, index) => {
								const isSender = item?.sender?._id === user?._id;
								return (
									<div key={index} className={`flex items-center gap-1 ${isSender ? "justify-end" : "justify-start"}`}>
										<div className='flex flex-col items-end'>
											<div className={`relative group px-3 py-2 w-auto flex flex-col rounded-lg cursor-pointer transition-all duration-300 ${isSender ? "border border-zinc-800 bg-indigo-800" : "bg-zinc-950 border border-zinc-800"}`}>
												<div className='flex justify-between items-center'>
													<p className='text-zinc-300'>
														{item.content}
													</p>
													{isSender && (
														<div className='relative'>
															<button className="text-zinc-400 opacity-75 hover:opacity-100 group-hover:block hidden">
																<HiOutlineDotsVertical size={20} />
															</button>
															<div className="absolute right-0 mt-2 w-40 bg-zinc-900 border border-zinc-700 rounded shadow-lg hidden group-hover:block z-50">
																<button
																	className="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 w-full"
																	onClick={() => handleCopy(item.content)}
																>
																	<IoCopyOutline className="mr-2" /> Copy
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
									</div>
								);
							})
						)}
					</div>
					{!hasNextPage && <div className='text-center text-zinc-600'>You've reached the beginning of the chat!</div>}
				</ScrollArea>

			</div>

			{/* Input Section */}
			<form onSubmit={handleSendMessage} className='lg:bottom-0'>
				<div className='px-3 py-2 pb-5 flex items-center justify-between'>
					{/* Emoji Picker Button */}
					<div onClick={() => setShowEmoji(!showEmoji)} className='mx-2 bg-zinc-800 p-2 cursor-pointer rounded-full flex justify-center items-center text-center'>
						<FaRegLaugh size={20} />
					</div>

					{/* Emoji Picker */}
					{showEmoji && (
						<div className='absolute bottom-20 left-0 md:left-auto w-full md:w-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl p-2 z-50'>
							<EmojiPicker
								emojiStyle='facebook'
								lazyLoadEmojis={true}
								onEmojiClick={handleEmojiClick}
								searchDisabled={true}
								theme='dark'
								className='w-full'
							/>
						</div>

					)}

					{/* Message Input Field */}
					<TextField.Root required size="3" radius='medium' name='content' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Type a message...' className="flex-grow rounded-lg mr-3">
						<TextField.Slot>
							{/* Uncomment below if you need attachments in the future */}
							{/* <DropdownMenu.Root>
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
              </DropdownMenu.Root> */}
						</TextField.Slot>
					</TextField.Root>

					{/* Send Button */}
					<Button type='submit' radius='full' disabled={!message.trim()} size="3" className="bg-blue-500 text-white rounded-full">
						<RiSendPlaneFill />
					</Button>
				</div>
			</form>
		</main>
	);
};

export default SingleChatPage;