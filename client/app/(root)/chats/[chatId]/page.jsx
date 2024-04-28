import { Avatar, Box, Button, Flex, Heading, ScrollArea, TextArea } from '@radix-ui/themes';
import { RiSendPlaneFill } from "react-icons/ri";
import { IoMdAttach } from "react-icons/io";
const SingleChatPage = ({ params }) => {
	const chatData = [
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
		{ id: 1, sender: 'user1', message: 'Hello there!', timestamp: '10:00 AM' },
		{ id: 2, sender: 'user2', message: 'Hi, how are you?', timestamp: '10:05 AM' },
	];


	return (
		<main className={` flex flex-col justify-between h-screen`}>
			<Box as="div" className='bg-zinc-900 border-b border-zinc-700'>
				<Flex align="center" gap="3" className="p-4">
					<div className='p-2 bg-green-500 rounded-full z-50 relative left-[4.6rem] top-5'></div>
					<Avatar
						radius="full"
						size="5"
						fallback="GG"
					/>
					<Flex direction="column" className="flex-1">
						<Heading className="text-zinc-400">{params.chatId}</Heading>
						<p className="text-gray-400 text-sm">Last online: 1 hour ago</p>
					</Flex>
				</Flex>
			</Box>

			<ScrollArea type="always" scrollbars="vertical" className="flex-1 overflow-y-auto">
				<div className="flex flex-col gap-2 px-5 py-2">
					{chatData.map((chat) => (
						<div key={chat.id} className={`flex cursor-pointer  ${chat.sender === 'user1' ? 'justify-end text-left' : 'justify-start text-left'}`}>
							<div className={`p-2 flex flex-col t rounded-xl ${chat.sender === 'user1' ? 'bg-zinc-800 text-white' : 'border border-zinc-700'}`}>
								{chat.message}
								<span className={` opacity-50 ${chat.sender === 'user1' ? "text-gray-00 text-right" : "text-right"}`}>
									{chat.timestamp}
								</span>
							</div>
						</div>
					))}
				</div>
			</ScrollArea>

			<Flex justify="center" items="center" className="p-4">
				<TextArea size="3" radius='full' className="flex-1 rounded-lg" placeholder="Type..." style={{ marginRight: 8 }} />
				<Flex direction="column" gap="2">
					<Button size="4" className="bg-blue-500 text-white rounded-full">
						<RiSendPlaneFill />
					</Button>
					<Button size="4" variant='outline'>
						<IoMdAttach />
					</Button>
				</Flex>
			</Flex>
		</main>
	);
};

export default SingleChatPage;
