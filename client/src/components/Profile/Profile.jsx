import { AlertDialog, Button, Container, Dialog, Flex, Heading, Spinner, Text, TextField } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import useAuthStore from '../../store/authstore';
import useUserStore from '../../store/userstore';


const Profile = () => {
	const [user, setUser] = useState({});
	const [updatedProfile, setUpdatedProfile] = useState({
		fullName: '',
		username: '',
		bio: '',
		avatar: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [avatarLoading, setAvatarLoading] = useState(false);

	const { getUser } = useAuthStore();
	const { updateUserProfile } = useUserStore();

	const fetchUser = async () => {
		const userData = await getUser();
		console.log('userData', userData);
		setUser(userData);
		setUpdatedProfile({
			fullName: userData.fullName,
			username: userData.username,
			bio: userData.bio,
			avatar: ''
		});
	};

	useEffect(() => {
		fetchUser();
	}, []);

	const onChange = (e) => {
		const { name, value, files } = e.target;
		if (name === 'avatar' && files) {
			const file = files[0];
			if (file) {
				setUpdatedProfile({ ...updatedProfile, avatar: file });
			}
		} else {
			setUpdatedProfile({ ...updatedProfile, [name]: value });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setAvatarLoading(true);
		const formData = new FormData();
		formData.append('fullName', updatedProfile.fullName);
		formData.append('username', updatedProfile.username);
		formData.append('bio', updatedProfile.bio);
		if (updatedProfile.avatar) {
			formData.append('avatar', updatedProfile.avatar);
		}

		try {
			setIsLoading(true);
			const resp = await updateUserProfile(user._id, formData);
		} catch (error) {
			console.log('Error updating profile:', error);
		} finally {
			setIsLoading(false);
			setAvatarLoading(false);
			fetchUser();
		}
	};

	return (
		<>
			<div className="h-screen max-w-xl mx-auto py-8">
				<Container className="px-2 mx-auto">
					<h1 className="text-left px-8 lg:text-center font-bold my-5 text-xl">{user?.username}</h1>
					<div className="p-6">
						<div className="flex justify-between lg:justify-between items-start mb-10">
							<div>
								<div className="w-20 h-20 rounded-full overflow-hidden mb-2 relative">
									{avatarLoading ? (
										<div className="absolute inset-0 flex items-center justify-center">
											<Spinner size="4" />
										</div>
									) : (
										<img src={user?.avatar} alt="Avatar" className="object-cover w-full h-full" />
									)}
								</div>
								<h1 className="text-xl">{user?.fullName}</h1>
							</div>
							<div className="text-center">
								<h1 className="text-4xl font-bold">{user?.totalFriends}</h1>
								<p className="text-2xl">Friends</p>
							</div>
						</div>
						<p className="opacity-50">Bio</p>
						<p className="text-xl w-full">{user?.bio ? user?.bio : "No bio...."}</p>
					</div>

					{/* Edit profile modal */}
					<div className="flex justify-center items-center px-5 space-x-3">
						<Dialog.Root>
							<Dialog.Trigger asChild>
								<Button>
									<FaRegEdit /> Edit profile
								</Button>
							</Dialog.Trigger>
							<Dialog.Content maxWidth="450px">
								<Dialog.Title>Edit profile</Dialog.Title>
								<Dialog.Description size="2" mb="4">
									Make changes to your profile.
								</Dialog.Description>
								<form onSubmit={handleSubmit}>
									<Flex direction="column" gap="3">
										<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											<Text as="div" size="2" mb="1" weight="bold">Upload Profile Photo</Text>
											<TextField.Root
												type="file"
												name="avatar"
												onChange={onChange}
												className="block"
												id="avatar"
											/>
										</label>

										<label>
											<Text as="div" size="2" mb="1" weight="bold">Full Name</Text>
											<TextField.Root
												name="fullName"
												value={updatedProfile.fullName}
												onChange={onChange}
												placeholder="Enter your full name"
											/>
										</label>
										<label>
											<Text as="div" size="2" mb="1" weight="bold">Username</Text>
											<TextField.Root
												name="username"
												value={updatedProfile.username}
												onChange={onChange}
												placeholder="Enter your username"
											/>
										</label>
										<label>
											<Text as="div" size="2" mb="1" weight="bold">Bio</Text>
											<TextField.Root
												name="bio"
												value={updatedProfile.bio}
												onChange={onChange}
												placeholder="Enter your bio"
											/>
										</label>
									</Flex>
									<Flex gap="3" mt="4" justify="end">
										<Dialog.Close asChild>
											<Button variant="soft" color="gray">Cancel</Button>
										</Dialog.Close>
										<Dialog.Close asChild>
											<Button type="submit" variant="solid">
												Save
											</Button>
										</Dialog.Close>
									</Flex>
								</form>
							</Dialog.Content>
						</Dialog.Root>

						{/* Delete account */}
						<AlertDialog.Root>
							<AlertDialog.Trigger asChild>
								<Button color="red">
									<MdDeleteOutline size="18" /> Delete Account
								</Button>
							</AlertDialog.Trigger>
							<AlertDialog.Content maxWidth="450px">
								<AlertDialog.Title>Delete Account</AlertDialog.Title>
								<AlertDialog.Description size="2">
									Are you sure want to delete your account?
								</AlertDialog.Description>

								<Flex gap="3" mt="4" justify="end">
									<AlertDialog.Cancel asChild>
										<Button variant="soft" color="gray">Cancel</Button>
									</AlertDialog.Cancel>
									<AlertDialog.Action asChild>
										<Button variant="solid" color="red">Delete Account</Button>
									</AlertDialog.Action>
								</Flex>
							</AlertDialog.Content>
						</AlertDialog.Root>
					</div>
				</Container>

				<Flex align="center" justify="center" p="5">
					<SlCalender /><p className="px-3 opacity-50">{user?.createdAt ? user?.createdAt : "1-1-2000"}</p>
				</Flex>
			</div>
		</>
	);
}

export default Profile;
