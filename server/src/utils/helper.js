import { usersocketIDs } from "../socket/socket.js";

export const getSockets = (users) => {
    const sockets = users.map((user) => usersocketIDs.get(user._id.toString()));
    return sockets
}