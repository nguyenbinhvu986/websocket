import type { Server, Socket } from "socket.io";

export type Participant = {
  id: string;
  name: string;
  token: string;
  socketId: string;
};

export type Room = {
  code: string;
  hostId: string;
  participants: Participant[];
};

export type RoomState = {
  code: string;
  hostId: string;
  participants: { id: string; name: string }[];
};

export type HandlerContext = {
  io: Server;
  socket: Socket;
  sendError: (message: string) => void;
  broadcastState: (room: Room) => void;
  closeRoom: (room: Room) => void;
  leaveRoom: (room: Room, participant: Participant) => void;
};
