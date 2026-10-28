import type { Server, Socket } from "socket.io";
import {
  createRoom,
  deleteRoom,
  findBySocket,
  joinRoom,
  removeParticipant,
  resumeRoom,
  toRoomState,
} from "./roomStore";
import type { Participant, Room } from "./types";

const isBlank = (value: unknown) => typeof value !== "string" || !value.trim();

export const registerSocketHandlers = (io: Server, socket: Socket) => {
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

  socket.on("room:create", ({ name }: { name: string }) => {
    if (isBlank(name)) return sendError("Dữ liệu không hợp lệ");
    if (findBySocket(socket.id)) return sendError("Bạn đang ở trong một phòng");

    const { room, participant } = createRoom(name, socket.id);
    socket.join(room.code);
    socket.emit("room:created", {
      participantId: participant.id,
      token: participant.token,
      room: toRoomState(room),
    });
  });
  socket.on("room:join", ({ code, name }: { code: string; name: string }) => {
    if (isBlank(name)) return sendError("Tên không được để trống");
    if (findBySocket(socket.id)) return sendError("Bạn đang ở trong một phòng");

    const result = joinRoom(code, name, socket.id);
    if (!result) return sendError("Phòng không tồn tại");

    const { room, participant } = result;
    socket.join(room.code);
    socket.emit("room:joined", {
      participantId: participant.id,
      token: participant.token,
      room: toRoomState(room),
    });
    broadcastState(room);
  });

  socket.on(
    "room:resume",
    ({
      code,
      participantId,
      token,
    }: {
      code: string;
      participantId: string;
      token: string;
    }) => {
      const result = resumeRoom(code, participantId, token, socket.id);
      if (!result) return sendError("Không thể vào lại phòng");

      const { room, participant } = result;
      socket.join(room.code);
      socket.emit("room:joined", {
        participantId: participant.id,
        token: participant.token,
        room: toRoomState(room),
      });
      broadcastState(room);
    },
  );
  socket.on(
    "room:kick",
    ({ targetParticipantId }: { targetParticipantId: string }) => {
      const found = findBySocket(socket.id);
      if (!found) return sendError("Bạn chưa ở trong phòng");

      const { room, participant } = found;
      if (participant.id !== room.hostId) {
        return sendError("Chỉ chủ phòng mới được kick");
      }

      const target = room.participants.find(
        ({ id }) => id === targetParticipantId,
      );
      if (!target || target.id === room.hostId) {
        return sendError("Không tìm thấy người chơi");
      }

      io.to(target.socketId).emit("room:kicked");
      io.in(target.socketId).socketsLeave(room.code);
      removeParticipant(room, target.id);
      broadcastState(room);
    },
  );
  socket.on("room:leave", () => {
    const found = findBySocket(socket.id);
    if (found) leaveRoom(found.room, found.participant);
  });
  socket.on("room:close", () => {
    const found = findBySocket(socket.id);
    if (!found) return sendError("Bạn chưa ở trong phòng");
    if (found.participant.id !== found.room.hostId) {
      return sendError("Chỉ chủ phòng mới được xóa phòng");
    }
    closeRoom(found.room);
  });
  socket.on("disconnect", () => {
    setTimeout(() => {
      const found = findBySocket(socket.id);
      if (found) leaveRoom(found.room, found.participant);
    }, 10000);
  });
};
