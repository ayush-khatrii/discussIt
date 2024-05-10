"use client"
import { Avatar, Box, Button, Flex, Heading, Separator, Text, Tooltip } from '@radix-ui/themes';
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
	const sidebarRef = useRef(null);

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
	}, []);

	const handleLogout = async () => {
		try {
			await logout();
			toast.success("Logout successful");
			navigate("/login");
			return;
		} catch (error) {
			toast.error(error.message);
		}
	}
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
					<Link>
						<li className='flex justify-start items-center gap-3 hover:bg-zinc-900 px-5 py-2 cursor-pointer  w-full'>
							<span className='flex justify-start items-start text-center gap-2'>
								<FaUserPlus size="1.35rem" />
							</span>
							<p>
								Friend Requests
							</p>
						</li>
					</Link>
					<Link>
						<li className='flex justify-start items-center gap-3 hover:bg-zinc-900 px-5 py-2 cursor-pointer  w-full'>
							<span className='flex justify-start items-start text-center gap-2'>
								<BiLogOutCircle size="1.25rem" />
							</span>
							<p>
								Logout
							</p>
						</li>
					</Link>
					<Separator size="4" orientation="" />
					<Link to={`/profile`}>
						<Flex align="center" px="3" mt="4" gap="4">
							<Avatar
								radius='full'
								src={user?.avatar?.avatar_url}
							/>
							<Heading>{user?.username}</Heading>
						</Flex>
					</Link>
				</ul>
			</aside>
			<Box onClick={() => setIsOpen(!isOpen)} className={` ${!isOpen && "border"} z-50 absolute right-4 cursor-pointer ${!isOpen && "bg-[#101010]"} p-2 rounded-full`}>
				{!isOpen && <IoIosMenu size={"1.5rem"} />}
			</Box>
		</>
	)
}

export default Sidebar