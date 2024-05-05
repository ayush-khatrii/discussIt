"use client";

import { Avatar, Box, Button, DropdownMenu, Flex, ScrollArea, TextField } from '@radix-ui/themes';
import { RiSendPlaneFill } from "react-icons/ri";
import { IoMdAttach, IoMdCopy } from "react-icons/io";
import { useState } from 'react';
import { CiClock2 } from "react-icons/ci";
import { SlDocs } from "react-icons/sl";
import toast, { Toaster } from 'react-hot-toast';
import { MdDeleteOutline } from "react-icons/md";
import { format } from "date-fns";
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';

const SingleChatPage = () => {

	const { chatId } = useParams();
	const [message, setMessage] = useState({
		sender: "",
		content: "",
		attachment: null,
	});

	const [chatData, setChatData] = useState([]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'attachment') {
			setMessage({
				...message,
				[name]: e.target.files[0],
			});
		} else {
			setMessage({
				...message,
				[name]: value,
			});
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission here
		setChatData((prevMessage) => [
			...prevMessage,
			{
				content: message.content,
				timestamp: format(new Date(), 'dd-MM-yyyy, hh:mm a'),
				attachment: message.attachment,
			}
		]);

		setMessage({
			sender: "",
			content: "",
			attachment: null,
		});
	}

	const handleCopy = (message) => {
		navigator.clipboard.writeText(message);
		toast.success("Message copied!")
	}

	return (
		<>
			<div className='relative top-3'>
				<Sidebar />
			</div>
			<main className={`flex flex-col justify-between h-screen`}>
				<Box as="div" className='bg-zinc-900 border-b border-zinc-700'>
					<Flex align="center" gap="3" className="p-2">
						<Avatar
							radius="full"
							size="4"
							fallback="GG"
						/>
						<Flex direction="column" className="flex-1">
							<h1 className="text-zinc-400 capitalize font-bold">{chatId}</h1>
							<p className="text-gray-400 text-sm">Last online: 1 hour ago</p>
						</Flex>
					</Flex>
				</Box>

				<ScrollArea type="always" scrollbars="vertical" className="flex-1 overflow-y-auto">
					<div className="flex flex-col gap-2 px-5 py-2">
						{chatData?.map((item, index) => (
							<div key={index} className={`flex justify-start cursor-pointer`}>
								<div className={`p-2 flex flex-col rounded-xl bg-zinc-800`}>
									<div>
										{item.attachment && item.attachment.type.startsWith('image') && (
											<div className='aspect-w-16 aspect-h-9'>
												<img src={URL.createObjectURL(item.attachment)} alt="Attachment" controls className="object-cover w-full h-52 rounded-xl" />
											</div>
										)}
										{item.attachment && item.attachment.type.startsWith('video') && (
											<div className='aspect-w-16 aspect-h-9'>
												<video src={URL.createObjectURL(item.attachment)} controls className="object-cover w-full h-52 rounded-xl" />
											</div>
										)}
									</div>
									<div className='mt-1 flex items-center justify-between gap-2'>
										<p className='w-full'>
											{item.content}
										</p>
										<DropdownMenu.Root className="">
											<DropdownMenu.Trigger>
												<Button variant="ghost" radius='full'>
													<DropdownMenu.TriggerIcon />
												</Button>
											</DropdownMenu.Trigger>
											<DropdownMenu.Content>
												<DropdownMenu.Item>
													<CiClock2 size={20} />  {item.timestamp}</DropdownMenu.Item>
												<DropdownMenu.Item onClick={() => handleCopy(item.content)}>
													<IoMdCopy size={20} /> Copy
												</DropdownMenu.Item>
												<DropdownMenu.Separator />
												<DropdownMenu.Item color="red">
													<MdDeleteOutline size={20} />
													Delete message
												</DropdownMenu.Item>
											</DropdownMenu.Content>
										</DropdownMenu.Root>
									</div>
								</div>
							</div>
						))}
					</div>
				</ScrollArea>

				<form onSubmit={handleSubmit}>
					<Flex justify="center" items="center" className="p-3 pb-5">
						<TextField.Root size="3" radius='medium' name='content' value={message.content} onChange={handleChange} placeholder='Type a message...' className="flex-grow rounded-lg  mx-2" >
							<TextField.Slot>
								<DropdownMenu.Root>
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
										<input type="file" name="attachment" id="file-input" className="hidden" onChange={handleChange} />
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							</TextField.Slot>
						</TextField.Root>
						<Button type='submit' disabled={message.content === ""} size="3" className="bg-blue-500 text-white rounded-full">
							<RiSendPlaneFill />
						</Button>
					</Flex>
				</form>
			</main>
		</>
	);
};

export default SingleChatPage;
