import { io } from "socket.io-client";

export const socket = io("http://localhost:4000", { autoConnect: false });

export type Session = { code: string; participantId: string; token: string };

export const saveSession = (session: Session) =>
  sessionStorage.setItem("session", JSON.stringify(session));

export const loadSession = (): Session | null => {
  const raw = sessionStorage.getItem("session");
  return raw ? JSON.parse(raw) : null;
};

export const clearSession = () => sessionStorage.removeItem("session");
