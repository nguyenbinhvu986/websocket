import { findBySocket, removeParticipant } from "../roomStore";
import type { HandlerContext } from "../types";

export default function onKick({
  io,
  socket,
  sendError,
  broadcastState,
}: HandlerContext) {
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
}
