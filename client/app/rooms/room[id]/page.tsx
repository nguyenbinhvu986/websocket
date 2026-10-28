"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { socket, loadSession, clearSession } from "../socket";

type RoomState = {
  code: string;
  hostId: string;
  participants: { id: string; name: string }[];
};
type Joined = { participantId: string; room: RoomState };

export default function RoomPage() {
  const { code } = useParams<{ code: string }>();
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

  const handleLeave = () => {
    socket.emit("room:leave");
    clearSession();
    router.replace("/rooms");
  };

  const handleKick = (targetParticipantId: string) =>
    socket.emit("room:kick", { targetParticipantId });

  if (!room) return null;

  const isHost = me === room.hostId;

  return (
    <div className="min-h-screen bg-[#09090b] p-6 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="font-mono text-xs tracking-widest text-gray-500">
          MÃ PHÒNG
        </div>
        <h1 className="mt-2 text-5xl font-bold tracking-widest">{room.code}</h1>

        <h2 className="mt-8 text-xl font-semibold">
          Người chơi ({room.participants.length})
        </h2>
        <ul className="mt-3 space-y-2">
          {room.participants.map(({ id, name }) => (
            <li
              key={id}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3"
            >
              <span>
                {name}
                {id === room.hostId && " 👑"}
                {id === me && " (bạn)"}
              </span>
              {isHost && id !== me && (
                <button
                  onClick={() => handleKick(id)}
                  className="rounded-lg border border-red-400/30 px-3 py-1 text-sm text-red-400 hover:bg-red-400/10"
                >
                  Kick
                </button>
              )}
            </li>
          ))}
        </ul>

        <button
          onClick={handleLeave}
          className="mt-6 rounded-xl border border-white/10 px-5 py-2.5 text-gray-400 hover:text-white"
        >
          {isHost ? "Xóa phòng" : "Rời phòng"}
        </button>
      </div>
    </div>
  );
}
