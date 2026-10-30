import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { socket, loadSession, clearSession } from "../../../Socket/socket";
import type { RoomState } from "../types";

type Joined = { participantId: string; room: RoomState };

export const useRoom = (code: string) => {
  const router = useRouter();
  const [room, setRoom] = useState<RoomState | null>(null);
  const [me, setMe] = useState("");

  useEffect(() => {
    const session = loadSession();
    if (!session || session.code !== code) {
      router.replace("/rooms");
      return;
    }

    const onJoined = ({ participantId, room }: Joined) => {
      setMe(participantId);
      setRoom(room);
    };
    const exit = () => {
      clearSession();
      router.replace("/rooms");
    };
    const resume = () => socket.emit("room:resume", session);

    socket.on("connect", resume);
    socket.on("room:joined", onJoined);
    socket.on("room:state", setRoom);
    socket.on("room:error", exit);
    socket.on("room:closed", exit);
    socket.on("room:kicked", exit);

    if (socket.connected) resume();
    else socket.connect();

    return () => {
      socket.off("connect", resume);
      socket.off("room:joined", onJoined);
      socket.off("room:state", setRoom);
      socket.off("room:error", exit);
      socket.off("room:closed", exit);
      socket.off("room:kicked", exit);
    };
  }, [code, router]);

  const leave = () => {
    socket.emit("room:leave");
    clearSession();
    router.replace("/rooms");
  };

  const kick = (targetParticipantId: string) =>
    socket.emit("room:kick", { targetParticipantId });

  return { room, me, leave, kick };
};
