import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useSideBarStore from '../store/sidebarStore';
import SidebarMenu from '../components/Sidebar-Menu';
import useAuthStore from '../store/authstore';
import { IoMenu } from "react-icons/io5";

const Layout = () => {
  const { open, toggleSidebar } = useSideBarStore();
  const { isLoggedIn, getUser } = useAuthStore();

  useEffect(() => {
    const getCurrentUser = async () => {
      await getUser();
    };
    getCurrentUser();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950">

      <div className={`flex-1 ${open ? 'sm:ml-64' : ''} transition-all duration-300 ease-in-out`}>
        <div onClick={() => toggleSidebar(!open)} className='absolute flex p-2 rounded-full border-2  border-zinc-800 cursor-pointer z-50 right-8 top-5'>
          <IoMenu />
        </div>
        <div className="flex-1 bg-zinc-950">

          <div className='z-0'>
            {isLoggedIn && (
              <>
                {
                  open &&
                  <SidebarMenu />
                }
              </>
            )}
          </div>
          <div className=''>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;