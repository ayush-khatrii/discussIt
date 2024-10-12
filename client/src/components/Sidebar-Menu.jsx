import { TbMessageHeart } from "react-icons/tb"
import useAuthStore from "../store/authstore";
import useSideBarStore from "../store/sidebarStore";
import { useEffect } from "react";
import { Avatar, Tooltip } from "@radix-ui/themes";
import { LuLogOut } from "react-icons/lu";
import FriendRequests from "./FriendRequests";
import AddFriendComponent from "./AddFriendComponent";
import { Link } from "react-router-dom";
import { PiChatsFill } from "react-icons/pi";

const SidebarMenu = () => {
  const { getUser, user, logout } = useAuthStore();
  const { open } = useSideBarStore();

  useEffect(() => {
    getUser();
  }, []);
  const handleLogout = () => {
    logout();
    return <Navigate to="/login" />
  }



  return (
    <>
      <aside className={`flex flex-col relative z-50 items-center h-screen py-8 overflow-y-auto bg-white dark:bg-black  w-[60px]`}>
        <nav className="flex flex-col items-center flex-1 space-y-6">
          <a href="#" className="font-black border bg-zinc-100 text-zinc-800 px-2 py-1 rounded-full">
            Di
          </a>
          {/* <Tooltip content="All Chats">
            <Link to="/chats" className="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
              <PiChatsFill size="20" />
            </Link>
          </Tooltip> */}

          <a href="#" className="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
            <FriendRequests />
          </a>
          <a href="#" className="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
            <AddFriendComponent />
          </a>

        </nav>

        <div className="flex items-center flex-col space-y-6">
          <Tooltip content="Logout">
            <div className="cursor-pointer rotate-180" onClick={handleLogout}>
              <LuLogOut size={20} />
            </div>
          </Tooltip>

          <Link to={`/profile`}>

            <Avatar
              radius='full'
              size="3"
              fallback={
                `${user?.fullName.substring(0, 1)}${user?.fullName.split(" ")[1]?.substring(0, 1)}`
              }
              src={user?.avatar}
            />
          </Link>
        </div>
      </aside>
    </>
  )
}

export default SidebarMenu