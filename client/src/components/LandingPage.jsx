import React, { useEffect, useState } from 'react'
import useAuthStore from '../store/authstore';
import { SidebarView } from './SidebarView';

const LandingPage = () => {
  const getUser = useAuthStore((state) => state.getUser);
  const [user, setUser] = useState([]);
  useEffect(() => {
    const getCurrentUser = async () => {
      const userData = await getUser();
      setUser(userData);
    }
    getCurrentUser();
  }, []);

  return (
    <div>
      <h1 className='lg:pt-10 p-5 text-center text-2xl lg:text-3xl mt-52'>
        Welcome back <b className='capitalize'>{user?.username} 👋</b>
        {/* tell user to  click on one of the chat to  get  started   */}
      </h1>
      <p className='text-center my-2'>
        Select chat to Discuss!
      </p>
    </div>
  )
}

export default LandingPage