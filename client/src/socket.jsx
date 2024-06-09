import React, { createContext, useMemo, useContext } from 'react';
import { io } from 'socket.io-client';
import config from './constants/config';
const { SERVER_URL } = config;

const SocketContext = createContext();

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(SERVER_URL, { withCredentials: true }), []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
