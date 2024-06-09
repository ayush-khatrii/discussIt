import { create } from "zustand";
import config from "../constants/config";


const { SERVER_URL } = config;

const useFriendsStore = create((set) => ({
  friends: [],
  sendFriendRequest: async (userId) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/user/send-request`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId }),
      });
      const result = await response.json();
      if (response.ok) {
        // returning the response text only 
        return result.message;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      throw error;
    }
  },
  accepFriendRequest: async (requestId, accept) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/user/accept-request`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ requestId, accept }),
      });
      const result = await response.json();
      if (response.ok) {
        return result.message;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      throw error;
    }
  },
  getAllFriendRequests: async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/user/all-friend-requests`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        return result;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      throw error;
      console.log(error);
    }
  },
  searchUser: async (username) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/user/search?name=${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        return result.foundUser;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}));

export default useFriendsStore;