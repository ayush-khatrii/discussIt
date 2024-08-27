import { create } from "zustand";
import config from "../constants/config";
import toast from "react-hot-toast";


const { SERVER_URL } = config;

const useFriendsStore = create((set) => ({
  friends: [],
  allFriendRequests: [],
  sentRequests: [],
  sendFriendRequest: async (userId) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/user/send-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        return data;

      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error('Failed to send friend request. Please try again later.');
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
        set({ allFriendRequests: result.friendRequests });
        return result;
      } else {
        toast.error(result.message);
        throw new Error(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      throw error;
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
        return result.userWithRequestStatus;
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