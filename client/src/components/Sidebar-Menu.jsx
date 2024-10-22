// import { TbMessageHeart } from "react-icons/tb"
// import useAuthStore from "../store/authstore";
// import useSideBarStore from "../store/sidebarStore";
// import { useEffect } from "react";
// import { Avatar, Tooltip } from "@radix-ui/themes";
// import { LuLogOut } from "react-icons/lu";
// import FriendRequests from "./FriendRequests";
// import AddFriendComponent from "./AddFriendComponent";
// import { Link, useNavigate } from "react-router-dom";
// import { PiChatsFill } from "react-icons/pi";
// import useChatStore from "../store/chatstore";
// const SidebarMenu = () => {
//   const { getUser, user, logout } = useAuthStore();

//   const navigate = useNavigate();

//   useEffect(() => {
//     getUser();
//   }, []);
//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//     toast.success("Logout successful");
//   }



//   return (
//     <>
//       <aside className={`flex flex-col relative z-50 items-center h-screen py-8 overflow-y-auto bg-white dark:bg-black  w-[60px]`}>
//         <nav className="flex flex-col items-center flex-1 space-y-6">
//           <a href="#" className="font-black border bg-zinc-100 text-zinc-800 px-2 py-1 rounded-full">
//             Di
//           </a>
//           {/* <Tooltip content="All Chats">
//             <Link to="/chats" className="p-1.5 text-zinc-700 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-zinc-200 dark:hover:bg-zinc-800 hover:bg-zinc-100">
//               <PiChatsFill size="20" />
//             </Link>
//           </Tooltip> */}

//           <a href="#" className="p-1.5 text-zinc-700 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-zinc-200 dark:hover:bg-zinc-800 hover:bg-zinc-100">
//             <FriendRequests />
//           </a>
//           <a href="#" className="p-1.5 text-zinc-700 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-zinc-200 dark:hover:bg-zinc-800 hover:bg-zinc-100">
//             <AddFriendComponent />
//           </a>

//         </nav>

//         <div className="flex items-center flex-col space-y-6">
//           <Tooltip content="Logout">
//             <div className="cursor-pointer rotate-180" onClick={handleLogout}>
//               <LuLogOut size={20} />
//             </div>
//           </Tooltip>

//           <Link to={`/profile`}>
//             <Avatar
//               radius='full'
//               size="3"
//               fallback={
//                 `${user?.fullName.substring(0, 1)}${user?.fullName.split(" ")[1]?.substring(0, 1)}`
//               }
//               src={user?.avatar}
//             />
//           </Link>
//         </div>
//       </aside>
//     </>
//   )
// }

// export default SidebarMenu
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
import { RiUserAddLine } from "react-icons/ri";
import toast from "react-hot-toast";

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
        className={`absolute top-0 left-0 z-40 w-64 h-screen ${open ? 'translate-x-0' : '-translate-x-full'
          } sm:translate-x-0 bg-black border-r border-zinc-800`}
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col">
          <div className="px-3 py-4 border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center">
                <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                  ChatApp
                </span>
              </Link>
              <div className="flex items-center space-x-2">
                <Tooltip content="New Chat">
                  <button className="p-1 text-zinc-400 rounded-full hover:bg-zinc-800">
                    <IoAddOutline size={20} />
                  </button>
                </Tooltip>
                <Tooltip content="Add Friends">
                  <button className="p-1 text-zinc-400 rounded-full hover:bg-zinc-800">
                    <RiUserAddLine size={20} />
                  </button>
                </Tooltip>
                <Tooltip content="Friend Requests">
                  <button className="p-1 text-zinc-400 rounded-full hover:bg-zinc-800">
                    <FaUserFriends size={20} />
                  </button>
                </Tooltip>
                <Tooltip content="Notifications">
                  <button className="p-1 text-zinc-400 rounded-full hover:bg-zinc-800">
                    <IoNotificationsOutline size={20} />
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
