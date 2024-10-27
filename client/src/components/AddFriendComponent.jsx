import { useCallback, useEffect, useState } from "react";
import useFriendsStore from "../store/friendsStore";
import { Avatar, Badge, Button, Dialog, Flex, ScrollArea, TextField, Tooltip } from "@radix-ui/themes";
import { IoCheckmark, IoSearchOutline } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSocket } from "../socket";

const AddFriendComponent = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const { searchUser, sendFriendRequest } = useFriendsStore();
	const [searchedUsers, setSearchedUsers] = useState([]);
	// Send Friend Request
	const handleSendFriendRequest = async (userId) => {
		await sendFriendRequest(userId);
	};

	// Search User
	const handleSearchUser = async () => {
		try {
			const allUsers = await searchUser(searchQuery);
			console.log('response', allUsers);
			// setSearchedUsers(prevUser => ({
			// 	...prevUser,
			// 	[allUsers]: prevUser?.requestStatus,
			// }));
			setSearchedUsers(allUsers)
		} catch (error) {
			toast.error(error.message);
			console.log(error);
		}
	};

	return (
		<>
			<div className=''>
				<Dialog.Root>
					<Tooltip content="Add Friends">
						<Dialog.Trigger>
							<div className="cursor-pointer">
								<FaUserPlus size="18" />
							</div>
						</Dialog.Trigger>
					</Tooltip>
					<Dialog.Content maxWidth="450px">
						<Dialog.Title> Add friends by sending a friend request</Dialog.Title>
						<Flex direction="column" gap="3" my="4" pb="4">
							<TextField.Root
								placeholder="type..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}>
								<TextField.Slot>
									<IoSearchOutline height="16" width="16" />
								</TextField.Slot>
								<Button radius='none' onClick={handleSearchUser}>Search</Button>
							</TextField.Root>
						</Flex>
						<ScrollArea size="1" type="always" scrollbars="vertical" style={{ height: searchedUsers?.length > 0 ? 300 : 50 }}>
							{searchedUsers?.length > 0 &&
								searchedUsers.map((item, index) => (
									<Flex mr="5" key={index} align="center" mb="3" justify="between">
										<div className='flex items-center gap-3'>
											<Avatar
												radius='full'
												src={item.avatar?.avatar_url}
											/>
											<div>
												<h1 className='font-medium'>{item?.fullName}</h1>
												<span className='text-zinc-400'>{item.username}</span>
											</div>
										</div>
										<div className='space-x-2'>
											{
												item?.requestStatus === 'accepted' ?
													(<Button variant="surface" disabled color='green'><IoCheckmark /> Following</Button>)
													:
													item?.requestStatus === "pending" &&
													(<Button variant="surface" disabled color='blue'><IoCheckmark color='gray' />Sent</Button>)

											}
											{
												item?.requestStatus === 'unknown' &&
												(<Button variant='outline' onClick={() => handleSendFriendRequest(item._id)}>Add</Button>)
											}
										</div>
									</Flex>
								))}
							{searchedUsers?.length === 0 && <p className='text-center'>Search user to send friend request</p>}
						</ScrollArea>
						<Flex as="div" gap="3" mt="4" justify="end">
							<Dialog.Close>
								<Button variant="soft" color="gray">
									Cancel
								</Button>
							</Dialog.Close>
						</Flex>
					</Dialog.Content>
				</Dialog.Root>
			</div>
		</>
	)
}

export default AddFriendComponent