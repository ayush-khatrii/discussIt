"use client"
import { Avatar, Box, Button, Flex, Heading, Text, Tooltip } from '@radix-ui/themes';
import React, { useEffect, useRef, useState } from 'react'
import { IoMdChatboxes, IoIosMenu } from "react-icons/io";
import { FaUserGroup, FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import { BiLogOutCircle, BiSearch } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import Link from 'next/link';

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
	{
		title: "Settings",
		path: "/settings",
		icon: <IoSettings size="1.35rem" />
	},
	{
		title: "Search",
		path: "/search",
		icon: <BiSearch size="1.35rem" />
	}
]

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
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
	return (
		<>
			<aside ref={sidebarRef} className={` w- dark:bg-black z-50 ${isOpen ? 'w-52 ' : 'hidden'} transition-all duration-300 ease-out p-3 h-screen flex justify-between text-left flex-col fixed right-0 border-r border-zinc-800`}>
				<div>
					<div className={`flex items-center gap-2 ${isOpen ? "justify-start" : "justify-center"} mt-3`}>
						<Avatar
							radius='full'
							fallback="Ak"
						/>
						<Heading>{isOpen ? "Ayush" : ""}</Heading>
					</div>
					<Flex mt="6" justify="between" direction="column">
						<ul className='flex  flex-col gap-4 w-full'>
							{
								navLinks.slice(0, 5).map((item, index) => (
									<Link key={index} href={item.path}>
										<li className='hover:bg-zinc-900 px-5 py-2 cursor-pointer rounded w-full'>
											<span className='flex justify-start items-start text-center gap-2'>
												<span>
													{item.icon}
												</span>
												<Text className={`${isOpen ? "block" : "hidden"}`}>
													{item.title}
												</Text>
											</span>
										</li>
									</Link>
								))
							}
						</ul>
						<ul className='flex  flex-col gap-4 w-full'>
							{
								navLinks.slice(5).map((item, index) => (
									<Link key={index} href={item.path}>
										<Tooltip content="ljkashdui">
											<li className='hover:bg-zinc-900 px-5 py-2 cursor-pointer rounded w-full'>
												<span className='flex justify-start items-start text-center gap-2'>
													<span>
														{item.icon}
													</span>
													<Text className={`${isOpen ? "block" : "hidden"}`}>
														{item.title}
													</Text>
												</span>
											</li>
										</Tooltip>
									</Link>
								))
							}
						</ul>
					</Flex>
				</div>
				<Flex mb="8">
					<Button>
						<BiLogOutCircle size="1.25rem" />
						<Text className={`${isOpen ? "block" : "hidden"}`}>
							Logout
						</Text>
					</Button>
				</Flex>
			</aside>
			<Box onClick={() => setIsOpen(!isOpen)} className={` z-50 absolute top-5 right-4 cursor-pointer  bg-[#101010] border p-2 rounded-full`}>
				{isOpen ? <MdCancel /> : <IoIosMenu />}
			</Box>

		</>
	)
}

export default Sidebar