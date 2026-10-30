import type { Server, Socket } from "socket.io";
import { createContext } from "./context";
import onCreate from "./handlers/onCreate";
import onJoin from "./handlers/onJoin";
import onResume from "./handlers/onResume";
import onKick from "./handlers/onKick";
import onLeave from "./handlers/onLeave";
import onDisconnect from "./handlers/onDisconnect";

export const registerSocketHandlers = (io: Server, socket: Socket) => {
  const context = createContext(io, socket);
  [onCreate, onJoin, onResume, onKick, onLeave, onDisconnect].forEach(
    (register) => register(context),
  );
};
