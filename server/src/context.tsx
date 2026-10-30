import type { Server, Socket } from "socket.io";
import { deleteRoom, removeParticipant, toRoomState } from "./roomStore";
import type { HandlerContext, Participant, Room } from "./types";

export const createContext = (io: Server, socket: Socket): HandlerContext => {
  const sendError = (message: string) => socket.emit("room:error", message);

  const broadcastState = (room: Room) =>
    io.to(room.code).emit("room:state", toRoomState(room));

  const closeRoom = ({ code }: Room) => {
    io.to(code).emit("room:closed");
    io.socketsLeave(code);
    deleteRoom(code);
  };

  const leaveRoom = (room: Room, { id }: Participant) => {
    if (id === room.hostId) {
      closeRoom(room);
      return;
    }
    removeParticipant(room, id);
    socket.leave(room.code);
    broadcastState(room);
  };

  return { io, socket, sendError, broadcastState, closeRoom, leaveRoom };
};
