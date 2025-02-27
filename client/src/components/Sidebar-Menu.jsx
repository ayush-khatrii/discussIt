import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSideBarStore from '../store/sidebarStore';
import useAuthStore from '../store/authstore';
import { ScrollArea, Avatar, Tooltip, TextField } from '@radix-ui/themes';
import ChatsPage from './chats/ChatPage';
import { LuLogOut } from "react-icons/lu";
import { MdSearch } from "react-icons/md";
import { IoAddOutline, IoNotificationsOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import toast from "react-hot-toast";
import FriendRequests from "./FriendRequests";
import AddFriendComponent from "./AddFriendComponent";
import CreateGroupChat from './CreateGroupChat';

const SidebarMenu = () => {
  const { open, toggleSidebar } = useSideBarStore();
  const { user, logout } = useAuthStore();
  const sidebarRef = useRef(null); // Reference to the sidebar

  const handleLogout = () => {
    logout();
    toast.success('Logout successful');
  };



  return (
    <>
      <aside
        className={`absolute top-0 left-0 z-40 w-64 h-screen transition-width duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'
          } sm:translate-x-0 bg-black border-r border-zinc-800`}
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col">
          <div className="px-3 py-4 border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center">
                <span className="self-center text-xl font-semibold whitespace-nowrap bg-white border-2 absolute border-zinc-800 px-1.5 py-0.5 text-black rounded-full">
                  Di
                </span>
              </Link>
              <div className="flex items-center space-x-2">
                <Tooltip content="New Chat">
                  <button className="p-1 text-zinc-400 rounded-full hover:bg-zinc-800">
                    <CreateGroupChat />
                  </button>
                </Tooltip>
                <Tooltip content="Add Friends">
                  <button className="p-1 text-zinc-400 rounded-full hover:bg-zinc-800">
                    <AddFriendComponent />
                  </button>
                </Tooltip>
                <Tooltip content="Friend Requests">
                  <button className="p-1 text-zinc-400 rounded-full hover:bg-zinc-800">
                    <FriendRequests />
                  </button>
                </Tooltip>
              </div>
            </div>
            <div className="mt-4 relative">
              <TextField.Root placeholder="Search chats">
                <TextField.Slot>
                  <MdSearch className="text-zinc-400" size={18} />
                </TextField.Slot>
              </TextField.Root>
            </div>
          </div>

          {/* Chat List */}
          <ScrollArea className="flex-grow">
            <ChatsPage />
          </ScrollArea>

          {/* Footer */}
          <div className="px-3 py-4 border-t border-zinc-800">
            <div className="flex items-center justify-between">
              <Link to="/profile" className="flex items-center">
                <Avatar
                  src={user?.avatar}
                  fallback={user?.fullName.substring(0, 2)}
                  radius="full"
                  size="3"
                  className="mr-2"
                />
                <span className="text-sm font-medium text-zinc-300">
                  {user?.fullName}
                </span>
              </Link>
              <Tooltip content="Logout">
                <button
                  onClick={handleLogout}
                  className="p-1 text-zinc-400 rounded-full hover:bg-zinc-800"
                >
                  <LuLogOut size={20} />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarMenu;