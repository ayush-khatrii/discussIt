import React, { Suspense, lazy, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('./components/Home/HomePage'));
const ChatPage = lazy(() => import('./components/chats/ChatPage'));
const SignInPage = lazy(() => import('./components/signin/SignInPage'));
const SignUpPage = lazy(() => import('./components/signup/SignUpPage'));
const SingleChatPage = lazy(() => import('./components/chats/SingleChatPage'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const Friends = lazy(() => import('./components/friends/Friends'));
const FriendProfilePage = lazy(() => import('./components/friends/FriendProfilePage'));
const ErrorPage = lazy(() => import('./components/ErrorPage'));
const GroupsPage = lazy(() => import('./components/groups/GroupsPage'));
const SingleGroupPage = lazy(() => import('./components/groups/SingleGroupPage'));
const SingleGroupInfo = lazy(() => import('./components/groups/SingleGroupInfo'));

import Loader from "./components/Loader";
import useAuthStore from './store/authstore';
import { Toaster } from 'react-hot-toast';
import { SocketProvider, useSocket } from './socket';
import { io } from 'socket.io-client';
import config from './constants/config';

const App = () => {
	const { isLoggedIn, getUser } = useAuthStore();

	useEffect(() => {
		const getCurrentUser = async () => {
			await getUser();
		};
		getCurrentUser();
	}, []);


	return (
		<>
			<SocketProvider>
				<Toaster />
				<div className="app">
					<Suspense fallback={
						<div className='flex justify-center items-center h-screen'>
							<Loader />
						</div>
					}>
						<Routes>
							<Route path="/" element={isLoggedIn ? <ChatPage /> : <HomePage />} />
							<Route path="/chats" element={isLoggedIn ? <ChatPage /> : <SignInPage />} />
							<Route path="/groups" element={isLoggedIn ? <GroupsPage /> : <SignInPage />} />
							<Route path="/chats/:chatId" element={isLoggedIn ? <SingleChatPage /> : <SignInPage />} />
							<Route path="/groups/:groupId" element={isLoggedIn ? <SingleGroupPage /> : <SignInPage />} />
							<Route path="/groups/:groupId/info" element={isLoggedIn ? <SingleGroupInfo /> : <SignInPage />} />
							<Route path="/friends" element={isLoggedIn ? <Friends /> : <SignInPage />} />
							<Route path="/profile" element={isLoggedIn ? <Profile /> : <SignInPage />} />
							<Route path="/friend/:id" element={isLoggedIn ? <FriendProfilePage /> : <SignInPage />} />
							<Route path="/signup" element={<SignUpPage />} />
							<Route path="/login" element={<SignInPage />} />
							{/* error route */}
							<Route path="*" element={<ErrorPage />} />
						</Routes>
					</Suspense>
				</div>
			</SocketProvider>
		</>
	);
};

export default App;
