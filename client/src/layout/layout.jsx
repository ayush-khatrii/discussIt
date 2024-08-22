import React from 'react';
import { SidebarView } from '../components/SidebarView';
import { Outlet } from 'react-router-dom';
import useSideBarStore from '../store/sidebarStore';
import { IoMdMenu } from 'react-icons/io';
import SidebarMenu from '../components/Sidebar-Menu';

const Layout = () => {
  const { toggleSidebar, open } = useSideBarStore();

  return (
    <div className="flex h-screen overflow-x-hidden">
      <div className=''>
        <SidebarMenu />
      </div>
      <div className="">
        <SidebarView />
      </div>
      <div onClick={() => toggleSidebar(!open)} className='absolute flex p-2 rounded-full border-2  border-zinc-800 cursor-pointer z-50 right-8 top-5'>
        <IoMdMenu />
      </div>
      <div className="flex-1 bg-zinc-950">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
