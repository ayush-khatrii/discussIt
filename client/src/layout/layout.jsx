import React, { useEffect } from 'react';
import { SidebarView } from '../components/SidebarView';
import { Outlet } from 'react-router-dom';
import useSideBarStore from '../store/sidebarStore';
import { IoMdMenu } from 'react-icons/io';
import SidebarMenu from '../components/Sidebar-Menu';
import useAuthStore from '../store/authstore';

const Layout = () => {
  const { toggleSidebar, open } = useSideBarStore();
  const { isLoggedIn, getUser } = useAuthStore();
  useEffect(() => {
    const getCurrentUser = async () => {
      await getUser();
    };
    getCurrentUser();
  }, []);
  return (
    <div className="flex h-screen overflow-x-hidden">
      {
        isLoggedIn &&
        <>
          <SidebarMenu />
          <div className=''>
          </div>
          <div className="">
            <SidebarView />
          </div>

          <div onClick={() => toggleSidebar(!open)} className='absolute flex p-2 rounded-full border-2  border-zinc-800 cursor-pointer z-50 right-8 top-5'>
            <IoMdMenu />
          </div>
        </>
      }
      <div className="flex-1 bg-zinc-950">
        <Outlet />
      </div>
    </div >
  );
};

export default Layout;