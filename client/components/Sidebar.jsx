"use client"
import { Avatar, Box, Button, Flex, Heading, Text, Tooltip } from '@radix-ui/themes';
import React, { useEffect, useRef, useState } from 'react'
import { IoMdChatboxes, IoIosMenu } from "react-icons/io";
import { FaUserGroup, FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import { BiLogOutCircle, BiSearch } from "react-icons/bi";
import Link from 'next/link';
import useAuthStore from '@/store/store';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation"
import { FaUserCircle } from "react-icons/fa";

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

const Sidebar = ({ position }) => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [user, setUser] = useState([]);
	const sidebarRef = useRef(null);

	const { logout, isLoading, getUser } = useAuthStore();

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
			try {
				const userData = await getUser();
				console.log(userData)
				setUser(userData);
			} catch (error) {

			}
		}

		getCurrentUser();
	}, []);

	const handleLogout = async () => {
		try {
			await logout();
			toast.success("Logout successful");
			router.push("/login");
		} catch (error) {
			toast.error(error.message);
		}

	}
	return (
		<>
			<Toaster />
			<aside ref={sidebarRef} className={`dark:bg-black z-50 ${isOpen ? 'w-64 h-screen ' : 'w-0'} flex  justify-between flex-col transition-all duration-300 ease-in-out h-screen fixed right-0 top-0`}>
				<Flex direction="column">
					<Flex align="center" p="4" mb="5" gap="4">
						<Avatar
							radius='full'
							src={user?.avatar?.avatar_url}
						/>
						<Heading>{user?.username}</Heading>
					</Flex>
					<ul className='flex flex-col gap-4 w-full'>
						{
							navLinks.map((item, index) => (
								<Link key={index} href={item.path}>
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
				<div className='flex flex-col gap-3 mb-10'>
					<Link href={`/profile`} className='flex justify-center gap-3 items-center bg-white text-black hover:bg-zinc-200 px-5 py-2 cursor-pointer rounded-md mx-5' onClick={handleLogout}>
						<FaUserCircle size="1.35rem" />
						<Text as='p'>
							Profile
						</Text>
					</Link>
					<button className='flex justify-center gap-3 items-center border hover:bg-zinc-400 px-5 py-2 cursor-pointer rounded-md mx-5' onClick={handleLogout}>
						<BiLogOutCircle size="1.25rem" />
						<Text>
							{isLoading ? "Logging out..." : "Logout"}
						</Text>
					</button>
				</div>
			</aside>
			<Box onClick={() => setIsOpen(!isOpen)} className={` ${!isOpen && "border"} z-50 absolute ${position} right-4 cursor-pointer ${!isOpen && "bg-[#101010]"} p-2 rounded-full`}>
				{!isOpen && <IoIosMenu size={"1.5rem"} />}
			</Box>
		</>
	)
}

export default Sidebar