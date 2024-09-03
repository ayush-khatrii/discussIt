import { getSockets } from "../../app.js";

export const getOtherMember = (members, userId) =>
  members?.find((member) => member._id.toString() !== userId.toString());

export const emitEvent = (req, socket, event, data) => {
  const io = req.app.get("io");
  const usersSocket = getSockets(users);
  io.to(usersSocket).emit(event, data);
};