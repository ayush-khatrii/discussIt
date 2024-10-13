"use client"
import useAuthStore from '../../store/authstore';
import { Button, Card, Container, Flex, Text, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

const SignInPage = () => {

	const navigate = useNavigate();
	const login = useAuthStore((state) => state.login);
	const isLoading = useAuthStore((state) => state.isLoading);

	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showError, setShowError] = useState(false);
	const [inputType, setInputType] = useState('password');

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
			const resp = await login(formData.username, formData.password);
			if (resp) {
				setFormData({
					username: '',
					password: ''
				});
				toast.success('Login successful');
				return navigate('/chats', { replace: true });
			}

		} catch (error) {
			if (error.name === 'ValidationError') {
				const newError = {};
				error?.inner?.forEach(err => {
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
		username: yup.string().required("Username is required"),
		password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters long")
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
			<section className="h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
				<div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
				<Container size="1" mx="auto" className='z-10'>
					<div>
						<h1 className='text-3xl text-center font-bold mb-5'>Discuss-It</h1>
					</div>
					<div className='shadow-md rounded border border-zinc-700 p-3 bg-neutral-950 mx-5  '>
						<form onSubmit={handleSubmit}>
							<h1 className='text-xl font-bold mb-2 p-2'>Sign In</h1>
							<Flex gap="3" direction="column" p="3">
								<Text>Username</Text>
								<TextField.Root size="3" name="username" type="text" value={formData.username} onChange={handleChange} placeholder="Enter username" >
									<TextField.Slot>
										<FaUser size='15' />
									</TextField.Slot>
								</TextField.Root>
								{showError?.username && <p className="text-red-500 text-sm">{showError.username}</p>}
								<Text>Password</Text>
								<TextField.Root size="3" name="password" type={inputType} value={formData.password} onChange={handleChange} placeholder="Enter password" >
									<TextField.Slot>
										<div onClick={handleShowPassword} className='cursor-pointer'>
											{showPassword ? <IoEye size='20' /> : <IoEyeOff size='20' />}
										</div>
									</TextField.Slot>
								</TextField.Root>
								{showError?.password && <p className="text-red-500 text-sm">{showError.password}</p>}
								<div className='text-gray-200 my-2'>
									Don't have an account?
									<Link to="/signup" className='font-normal text-white mx-1 underline'>
										Sign Up Now
									</Link>
								</div>
								<Button type='submit' size="2" disabled={isLoading}>
									{isLoading ? "Loading..." : "Sign In"}
								</Button>
							</Flex>
						</form>
					</div>
				</Container>
			</section>
		</>
	)
}

export default SignInPage;
