"use client";
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TypewriterEffect, TypewriterEffectSmooth } from "@/components/ui/TypewriterEffect";
import { IoMdChatboxes } from "react-icons/io";

const HomePage = () => {

	const words = [
		{
			text: "Where",
		},
		{
			text: "Talks",
		},
		{
			text: " Start, ",
		},
		{
			text: "Ideas",
		},
		{
			text: "Grow,",
		},
		{
			text: "and",
		},
		{
			text: "Friendships",
		},
		{
			text: "Blossom",
		},
		// {
		// 	text: "Aceternity.",
		// 	className: "text-blue-500 dark:text-blue-500",
		// },
	];
	return (
		<div className="flex flex-col justify-center items-center  text-center h-screen  ">
			<h1 className="font-bold text-6xl md:text-7xl lg:text-9xl text-zinc-200 my-2">
				DiscussIt
			</h1>
			<TypewriterEffectSmooth words={words} />
			<div className="flex  justify-center items-center gap-3 my-2 ">
				<Button asChild variant="outline" size="4">
					<Link href={`/sign-in`}>Login</Link>
				</Button>
				<Button asChild variant="solid" size="4">
					<Link href={`/sign-in`}>Creat New Account</Link>
				</Button>
				<Button asChild variant="soft" size="4">
					<Link href={`/chats`}>Chat Now</Link>
				</Button>

			</div>
			<div className="-z-50">
				<BackgroundBeams />
			</div>
			<div className="absolute flex transform translate(-50%, -50%) top-16 lg:top-0">
				<IoMdChatboxes className=" size-40 md:size-64 lg:size-72  opacity-10" />
			</div>
		</div >
	)
}

export default HomePage