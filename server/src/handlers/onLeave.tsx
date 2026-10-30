import { findBySocket } from "../roomStore";
import type { HandlerContext } from "../types";

export default function onLeave({ socket, leaveRoom }: HandlerContext) {
  socket.on("room:leave", () => {
    const found = findBySocket(socket.id);
    if (found) leaveRoom(found.room, found.participant);
  });
}
