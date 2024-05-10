import { create } from "zustand";


const useChatStore = create((set) => ({
  chats: [],
  selectedChat: null,
  setChats: (chats) => set({ chats }),
  setSelectedChat: (selectedChat) => set({ selectedChat }),
  // fetch users chats 
  fetchChats: async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/chat`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        set({ chats: data });
      }
    } catch (error) {
      console.error(error);
    }
  },
}));
export default useChatStore