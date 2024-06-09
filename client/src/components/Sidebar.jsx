"use client"
import { Avatar, Box, Button, Dialog, Flex, Heading, ScrollArea, Separator, Text, TextField, Tooltip } from '@radix-ui/themes';
import React, { useEffect, useRef, useState } from 'react'
import { IoMdChatboxes, IoIosMenu } from "react-icons/io";
import { FaUserGroup, FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { BiLogOutCircle, BiSearch } from "react-icons/bi";
import useAuthStore from '../store/authstore';
import toast, { Toaster } from 'react-hot-toast';
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { TbCirclePlus } from 'react-icons/tb';
import { IoSearchOutline } from 'react-icons/io5';
import useFriendsStore from '../store/friendsStore';
const navLinks = [
	{
		title: "Chats",
		path: "/chats",
		icon: <IoMdChatboxes size="1.35rem" />
	},
	{
		title: "Groups",
		path: "/groups",
		icon: <MdGroups size="1.35rem" />
	},
	{
		title: "Friends",
		path: "/friends",
		icon: <FaUserGroup size="1.35rem" />
	},
]

const Sidebar = () => {
	const getUser = useAuthStore((state) => state.getUser);
	const logout = useAuthStore((state) => state.logout);
	const isLoading = useAuthStore((state) => state.isLoading);
	const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState(false);
	const [user, setUser] = useState([]);
	const [friendRequests, setFriendRequests] = useState([]);
	const sidebarRef = useRef(null);
	const { getAllFriendRequests, accepFriendRequest } = useFriendsStore();

	useEffect(() => {
		const handleOutsideClick = (e) => {
			if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleOutsideClick);
		}

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [isOpen]);

	useEffect(() => {
		const getCurrentUser = async () => {
			const userData = await getUser();
			setUser(userData);
		}
		getCurrentUser();
		getFriendRequests();
	}, []);


	const getFriendRequests = async () => {
		try {
			const response = await getAllFriendRequests();
			setFriendRequests(response.friendRequests);
		} catch (error) {
			console.log(error.message)
		}
	};

	const handleLogout = async () => {
		try {
			await logout();
			navigate("/login");
			toast.success("Logout successful");
			return;
		} catch (error) {
			toast.error(error.message);
		}
	}

	const handleAcceptFriendRequest = async (requestId, accept) => {
		try {
			const response = await accepFriendRequest(requestId, accept);
			console.log(response);
			toast.success(response.message || "Friend Request Accepted!");
			getFriendRequests();
		} catch (error) {
			console.log(error.message);
			toast.error(error.message);
		}
	};

	return (
		<>
			<aside ref={sidebarRef} className={`dark:bg-black z-50 ${isOpen ? 'w-64 h-screen ' : 'w-0'} flex  justify-between flex-col transition-all duration-300 ease-in-out h-screen fixed right-0 top-0`}>
				<Flex direction="column">
					<h1 className='text-3xl font-bold text-blue-500 px-5 my-5'>Discuss-It</h1>
					<ul className='flex flex-col gap-2 w-full'>
						{
							navLinks.map((item, index) => (
								<Link key={index} to={item.path}>
									<li className='hover:bg-zinc-900 px-5 py-2 cursor-pointer  w-full'>
										<span className='flex justify-start items-start text-center gap-2'>
											<span>
												{item.icon}
											</span>
											<Text>
												{item.title}
											</Text>
										</span>
									</li>
								</Link>
							))
						}
					</ul>
				</Flex>
				<ul className='mb-5 flex flex-col gap-2 w-full'>
					<li className='flex justify-start items-center gap-3 hover:bg-zinc-900 px-5 py-2 cursor-pointer  w-full'>
						<Dialog.Root>
							<Dialog.Trigger>
								<Button variant='ghost'>
									<TbCirclePlus size="20" />
									Friend Requests
								</Button>
							</Dialog.Trigger>

							<Dialog.Content maxWidth="450px">
								<Dialog.Title> Add friends by sending a friend request</Dialog.Title>
								<Flex direction="column" gap="3" my="4" pb="4">
									<TextField.Root
										placeholder="type..."
									>
										<TextField.Slot>
											<IoSearchOutline height="16" width="16" />
										</TextField.Slot>
										<Button radius='none'>Search</Button>
									</TextField.Root>
								</Flex>
								<ScrollArea type="always" scrollbars="vertical" style={{ height: 120 }}>
									{friendRequests?.map((item) => (
										<Flex mr="5" key={item.sender?._id} align="center" mb="3" justify="between">
											<div className='flex items-center gap-3'>
												<Avatar
													radius='full'
													src={item.sender?.avatar}
												/>
												<div>
													<h1 className='font-medium'>{item.sender?.fullName}</h1>
													<span className='text-zinc-400'>{item.sender?.username}</span>
												</div>
											</div>
											<div className='space-x-2'>
												<Button onClick={() => handleAcceptFriendRequest(item._id, true)}>Accept</Button>
												<Button color='red' onClick={() => handleAcceptFriendRequest(item._id, false)}>Reject</Button>
											</div>
										</Flex>
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
						</Dialog.Root>
					</li>
					<button onClick={handleLogout}>
						<li className='flex justify-start items-center gap-3 hover:bg-zinc-900 px-5 py-2 cursor-pointer  w-full'>
							<span className='flex justify-start items-start text-center gap-2'>
								<BiLogOutCircle size="1.25rem" />
							</span>
							<p>
								Logout
							</p>
						</li>
					</button>
					<Separator size="4" orientation="" />
					<Link to={`/profile`}>
						<Flex align="center" px="3" mt="4" gap="4">
							<Avatar
								radius='full'
								src={user?.avatar}
							/>
							<Heading>{user?.username}</Heading>
						</Flex>
					</Link>
				</ul>
			</aside >
			<Box onClick={() => setIsOpen(!isOpen)} className={` ${!isOpen && "border"} z-50 absolute right-4 cursor-pointer ${!isOpen && "bg-[#101010]"} p-2 rounded-full`}>
				{!isOpen && <IoIosMenu size={"1.5rem"} />}
			</Box>
		</>
	)
}

export default Sidebar