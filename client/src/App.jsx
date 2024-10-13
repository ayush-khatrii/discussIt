import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from "./components/Loader";
import useAuthStore from './store/authstore';
import { Toaster } from 'react-hot-toast';
import { SocketProvider } from './socket';
import Layout from './layout/layout';
import AuthLayout from './layout/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './HomePage';

const SignInPage = lazy(() => import('./components/signin/SignInPage'));
const SignUpPage = lazy(() => import('./components/signup/SignUpPage'));
const LandingPage = lazy(() => import('./components/LandingPage'));
const SingleChatPage = lazy(() => import('./components/chats/SingleChatPage'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const Friends = lazy(() => import('./components/friends/Friends'));
const FriendProfilePage = lazy(() => import('./components/friends/FriendProfilePage'));
const ErrorPage = lazy(() => import('./components/ErrorPage'));
const SingleGroupPage = lazy(() => import('./components/groups/SingleGroupPage'));
const SingleGroupInfo = lazy(() => import('./components/groups/SingleGroupInfo'));

const App = () => {
	return (
		<SocketProvider>
			<Toaster />
			<div className="app">
				<Suspense fallback={
					<div className='flex justify-center items-center h-screen'>
						<Loader />
					</div>
				}>
					<Routes>
						{/* Authenticated routes */}
						<Route element={<Layout />}>
							<Route path="/chats" element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />
							<Route path="/chats/:chatId" element={<ProtectedRoute><SingleChatPage /></ProtectedRoute>} />
							<Route path="/groups/:groupId" element={<ProtectedRoute><SingleGroupPage /></ProtectedRoute>} />
							<Route path="/groups/:groupId/info" element={<ProtectedRoute><SingleGroupInfo /></ProtectedRoute>} />
							<Route path="/friends" element={<ProtectedRoute><Friends /></ProtectedRoute>} />
							<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
							<Route path="/friend/:id" element={<ProtectedRoute><FriendProfilePage /></ProtectedRoute>} />
						</Route>

						{/* Non-authenticated routes */}
						<Route element={<AuthLayout />}>
							<Route path="/login" element={<SignInPage />} />
							<Route path="/signup" element={<SignUpPage />} />
						</Route>

						{/* "/" page  */}
						<Route path="/" element={<HomePage />} />
						{/* Error route */}
						<Route path="*" element={<ErrorPage />} />
					</Routes>
				</Suspense>
			</div>
		</SocketProvider>
	);
};

export default App;