import { Avatar, Box, Flex } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import { IoMdNotifications } from "react-icons/io";
import { useRouter } from "next/navigation"
import useAuthStore from '@/store/store';
import toast from 'react-hot-toast';
const Navbar = () => {

	const { isLoggedIn, getUser } = useAuthStore();
	const [user, setUser] = useState([]);
	const router = useRouter();



	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getUser();
				console.log("user data  from navbar", userData);
				setUser(userData);
			} catch (error) {
				toast.error(error);
			}
		}
		fetchUser();
	}, []);
	return (

		<>
			<nav className=' shadow-md top-0 w-full p-2 bg-black border-b border-zinc-700'>
				<Flex as='div' className='' px="5" align="center" justify="between" gap="3">
					<Flex align="center" gap="3">
						<Avatar
							radius="full"
							size="4"
							src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
							fallback="ak"
						>
						</Avatar>
						<Flex align="center" direction="column">
							<p className='text-2xl font-bold text-zinc-300 '>
								{user?.username}
							</p>
						</Flex>
					</Flex>
					<Box position="absolute">
						<IoMdNotifications />
					</Box>
				</Flex>
			</nav>
		</>
	)
}

export default Navbar