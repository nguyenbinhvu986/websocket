import { findBySocket } from "../roomStore";
import type { HandlerContext } from "../types";

export default function onDisconnect({ socket, leaveRoom }: HandlerContext) {
  socket.on("disconnect", () => {
    setTimeout(() => {
      const found = findBySocket(socket.id);
      if (found) leaveRoom(found.room, found.participant);
    }, 10000);
  });
}
