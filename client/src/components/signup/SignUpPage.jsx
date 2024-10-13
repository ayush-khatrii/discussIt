import { useState } from 'react';
import { Button, Flex, Radio, Text, TextArea, TextField } from '@radix-ui/themes';
import * as yup from 'yup';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import useAuthStore from '../../store/authstore';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		fullName: '',
		username: '',
		password: '',
		gender: '',
		bio: ''
	});

	const navigate = useNavigate();

	const { signup } = useAuthStore()

	const [showError, setShowError] = useState();
	const [inputType, setInputType] = useState('password');
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await validationSchema.validate(formData, { abortEarly: false });
			await signup(formData.fullName, formData.password, formData.username, formData.gender, formData.bio);
			toast.success('Account Created successfully!');
			navigate("/chats");

		} catch (error) {
			if (error.name === 'ValidationError') {
				const newError = {};
				error.inner.forEach(err => {
					newError[err.path] = err.message
				});
				setShowError(newError);
			}
			else {
				toast.error(error.message);
			}
		}
	};

	// Form validation
	const validationSchema = yup.object({
		fullName: yup.string().required("Full Name is required"),
		username: yup.string().required("Username is required").matches(/[._]/, "Username must contain at least one dot or underscore"),
		password: yup.string().required("Password is  required!").min(8, "Password must be at least 8 characters long")
			.matches(/[A-Z]/, "Password must contain at least one uppercase letter")
			.matches(/[a-z]/, "Password must contain at least one lowercase letter")
			.matches(/[0-9]/, "Password contssword must contain at least one number")
			.matches(/[!@#$%^&*()_,.<>{}|:]/, "Password must c at least one special character"),
		gender: yup.string().required("Gender is required"),
	});

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
		if (inputType == 'password') {
			setInputType('text');
		} else {
			setInputType('password');
		}
	}


	return (
		<>
			<div className="min-h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
				<div className="absolute inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
				<div className="z-50 p-5 w-full md:w-7/12 lg:w-5/12">
					<div>
						<h1 className="text-3xl text-center font-bold mb-5">Discuss-It</h1>
					</div>
					<div className="shadow-md rounded border border-zinc-900 p-5 bg-neutral-950 mx-5">
						<h1 className="text-xl font-bold mt-2 mb-3">Create Account</h1>
						<form onSubmit={handleSubmit} method='POST'>
							<Flex gap="3" direction="column">
								<Text as="label">Full Name</Text>
								{showError?.fullName && <p className="text-red-500 text-sm">{showError.fullName}</p>}
								<TextField.Root
									value={formData.fullName}
									onChange={handleChange}
									name="fullName"
									size="3"
									type="text"
									placeholder="Enter your full name"
								/>
								<Text as="label">Username</Text>
								{showError?.username && <p className="text-red-500 text-sm">{showError.username}</p>}
								<TextField.Root
									value={formData.username}
									onChange={handleChange}
									name="username"
									size="3"
									type="text"
									placeholder="Enter username"
								/>
								<Text as="label">Password</Text>
								{showError?.password && <p className="text-red-500 text-sm">{showError.password}</p>}
								<TextField.Root
									value={formData.password}
									onChange={handleChange}
									name="password"
									size="3"
									type={inputType}
									placeholder="Enter password"
								>
									<TextField.Slot>
										<div onClick={handleShowPassword} className='cursor-pointer'>
											{showPassword ? <IoEye size='16' /> : <IoEyeOff size='16' />}
										</div>
									</TextField.Slot>
								</TextField.Root>
								<Text as="label">Bio</Text>
								{/* for bio */}
								<TextField.Root
									value={formData.bio}
									onChange={handleChange}
									name="bio"
									size="3"
									placeholder="Enter bio"
								></TextField.Root>
								<Text as="label">Gender</Text>
								{showError?.gender && <p className="text-red-500 text-sm">{showError.gender}</p>}
								<Flex align="start" direction="column" gap="3">
									<Text as="label" size="2">
										<Radio
											name="gender"
											value="male"
											checked={formData.gender === 'male'}
											onChange={handleChange}
											mx="2"
										/>
										Male
									</Text>
									<Text as="label" size="2">
										<Radio
											name="gender"
											value="female"
											checked={formData.gender === 'female'}
											onChange={handleChange}
											mx="2"
										/>
										Female
									</Text>
								</Flex>
								<div className="text-gray-200 my-2">
									Have an account?{' '}
									<Link to="/login" className="font-normal text-white mx-1 underline">
										Sign In Now
									</Link>
								</div>
								<Button type="submit" size="3">
									Create Account
								</Button>
							</Flex>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default SignUpPage;