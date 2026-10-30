import { createRoom, findBySocket, toRoomState } from "../roomStore";
import type { HandlerContext } from "../types";

export default function onCreate({ socket, sendError }: HandlerContext) {
  socket.on("room:create", ({ name }: { name: string }) => {
    if (typeof name !== "string" || !name.trim()) {
      return sendError("Dữ liệu không hợp lệ");
    }
    if (findBySocket(socket.id)) return sendError("Bạn đang ở trong một phòng");

    const { room, participant } = createRoom(name, socket.id);
    socket.join(room.code);
    socket.emit("room:created", {
      participantId: participant.id,
      token: participant.token,
      room: toRoomState(room),
    });
  });
}
