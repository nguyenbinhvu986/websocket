import { createServer } from "http";
import { Server } from "socket.io";
import { registerSocketHandlers } from "./socketHandlers";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: ["http://localhost:3000", "http://192.168.1.127:3000"] },
});

io.on("connection", (socket) => {
  registerSocketHandlers(io, socket);
});

httpServer.listen(4000, () => {});
