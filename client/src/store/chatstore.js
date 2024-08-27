import { create } from "zustand";
import config from "../constants/config";


const { SERVER_URL } = config;

const useChatStore = create((set) => ({
  chats: [],
  currentChat: null,
  setChats: (chats) => set({ chats }),
  setCurrentChat: (chat) => set({ currentChat: chat }),
  getMyChats: async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/chats/my-chats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();
      if (response.ok) {
        set({ chats: result.transformedChats });
      }
    } catch (error) {
      console.error(error);
    }
  },
  getChatDetails: async (chatId) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/chats/${chatId}?populate=true`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const chatData = await response.json();
      if (response.ok) {
        return chatData;
      }
    } catch (error) {
      console.log(error);
    }
  },
  getChatMessages: async (chatId, page) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/chats/${chatId}/messages?page=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const messages = await response.json();
      return messages;
    } catch (error) {
      console.log(error);
    }
  },
  deleteMessage: async (messageId) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/chats/delete/messages/${messageId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }
}));

export default useChatStore