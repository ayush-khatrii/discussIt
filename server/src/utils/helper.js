import { getSockets } from "../../app.js";

export const getOtherMember = (members, userId) =>
  members?.find((member) => member._id.toString() !== userId.toString());

export const emitEvent = (req, event, users, data) => {
  try {
    const io = req.app.get("io");
    const userArray = users ? (Array.isArray(users) ? users : [users]).filter(Boolean) : [];
    if (userArray.length === 0) {
      console.warn("No valid users to emit to");
      return;
    }
    const usersSocket = getSockets(userArray);
    if (usersSocket.length > 0) {
      io.to(usersSocket).emit(event, data);
    }
  } catch (error) {
    console.error("Error in emitEvent:", error);
  }
};
