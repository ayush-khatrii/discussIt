"use client"
import React, { useEffect, useState } from "react";
import ChatsPage from "./chats/ChatPage";
import { Avatar, Flex, ScrollArea, TextField, Tooltip } from "@radix-ui/themes";
import { Link, Navigate } from "react-router-dom";
import useAuthStore from '../store/authstore';
import { BsPlus } from "react-icons/bs";
import { SlMagnifier } from "react-icons/sl";
import useSideBarStore from "../store/sidebarStore";
import { IoIosSettings, IoMdMenu, IoMdPersonAdd } from "react-icons/io";
import { TbMessageHeart } from "react-icons/tb";
import AddFriendComponent from "./AddFriendComponent";
import FriendRequests from "./FriendRequests";
import { LuLogOut, LuX } from "react-icons/lu";
import SidebarMenu from "./Sidebar-Menu";
import { FaAngleLeft, FaCross } from "react-icons/fa";

export function SidebarView() {
	const { open, toggleSidebar } = useSideBarStore();
	return (
		<>
			<div className={`flex justify-center z-[200] absolute transition-width duration-100 ease-in-out sm:relative flex-col border-r h-screen border-zinc-900 bg-zinc-950 hscree  ${open ? "lg:w-[500px] w-[300px] " : "w-[0px]"}`}>
				{
					open &&
					<>
						<div className="flex justify-center items-center pt-5 px-5 py-2">
							<TextField.Root className="w-full" variant="surface" size="3" radius="full" color="red" placeholder="Search">
								<TextField.Slot>
									<SlMagnifier size={15} />
								</TextField.Slot>
							</TextField.Root>
							<div
								onClick={() => toggleSidebar(false)}
								className="border-zinc-700 bg-zinc-950 border absolute z-10 -right-6 top-12 flex cursor-pointer justify-center items-center mx-2 text-center p-2 rounded-full">
								<FaAngleLeft />
							</div>

						</div>
						{/* Chats */}
						<div className="flex-1 overflow-y-auto">
							<>
								<ScrollArea type="always" scrollbars="vertical" style={{ height: " 100%" }}	>
									<ChatsPage />
								</ScrollArea>
							</>
						</div>
					</>
				}
			</div >
		</>
	)
}