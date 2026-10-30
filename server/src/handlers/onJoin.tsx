import { findBySocket, joinRoom, toRoomState } from "../roomStore";
import type { HandlerContext } from "../types";

export default function onJoin({
  socket,
  sendError,
  broadcastState,
}: HandlerContext) {
  socket.on("room:join", ({ code, name }: { code: string; name: string }) => {
    if (typeof name !== "string" || !name.trim()) {
      return sendError("Tên không được để trống");
    }
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
}
