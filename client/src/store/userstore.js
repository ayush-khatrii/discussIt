import { create } from "zustand";
import config from "../constants/config";


const { SERVER_URL } = config;

const useUserStore = create((set) => ({
  userProfile: null,
  fetchUserProfile: async (userId) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/user/user-profile/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      console.log("User store ::::::", result);
      if (response.ok) {
        return result;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      throw error;
    }
  }
}));

export default useUserStore;