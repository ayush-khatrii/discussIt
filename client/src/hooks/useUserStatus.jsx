// useSocket.js
import { useEffect, useState } from 'react';

const useUserStatus = (socket) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (socket) {

      // Emit to update users when connected
      socket.emit("update_users");

      const handleOnlineUsersStatus = (updatedOnlineUsers) => {
        setOnlineUsers(updatedOnlineUsers);
      };

      socket.on("update_users", handleOnlineUsersStatus);

      // Request initial online status immediately after connection
      socket.emit("get_initial_status");

      return () => {
        socket.off("update_users", handleOnlineUsersStatus);
      };
    }
  }, [socket]);

  return onlineUsers;
};

export default useUserStatus;
