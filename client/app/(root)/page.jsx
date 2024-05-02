"use client";
import React, { useState } from 'react';
import { BsChatSquareHeart } from "react-icons/bs";
import { color, delay, motion } from 'framer-motion';
import { Button, Container, Heading } from '@radix-ui/themes';
import { BsChatSquareText } from "react-icons/bs";
import useAuthStore from '@/store/store';
import Link from 'next/link';
import { poppins } from '@/fonts/font';

const HomePage = () => {

	const { isLoggedIn } = useAuthStore();

	// if (!isLoggedIn) {
	// 	return <div className='h-screen flex items-center justify-center text-3xl'>Login to continue</div>
	// }
	return (
		<main className={`h-screen flex flex-col justify-center items-center`}>
			<div className="text-center">
				<h1 className="text-2xl md:text-6xl font-bold">Welcome to Discuss-It</h1>
				<p className="text-base md:text-xl px-5 lg:text-3xl text-zinc-500 mt-2 mb-5">Connect with people all around the world</p>
				<Button
					asChild
					size="4"
					color="gray" variant="classic" highContrast
				>
					<Link href={`/chats`}>
						<BsChatSquareHeart size={25} className='mt-2' /> <p>Get Started</p>
					</Link>
				</Button>
			</div>
		</main>
	);
}

export default HomePage;
