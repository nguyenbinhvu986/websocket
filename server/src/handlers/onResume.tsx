import { resumeRoom, toRoomState } from "../roomStore";
import type { HandlerContext } from "../types";

type ResumePayload = { code: string; participantId: string; token: string };

export default function onResume({
  socket,
  sendError,
  broadcastState,
}: HandlerContext) {
  socket.on("room:resume", ({ code, participantId, token }: ResumePayload) => {
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
  });
}
