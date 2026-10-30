"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import ParticipantList from "../components/ParticipantList";
import { useRoom } from "./useRoom";

function RoomContent() {
  const { code } = useParams<{ code: string }>();
  const { room, me, leave, kick } = useRoom(code);

  if (!room) return null;

  return (
    <div className="min-h-screen bg-[#09090b] p-6 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="font-mono text-xs tracking-widest text-gray-500">
          MÃ PHÒNG
        </div>
        <h1 className="mt-2 text-5xl font-bold tracking-widest">{room.code}</h1>

        <ParticipantList
          participants={room.participants}
          hostId={room.hostId}
          me={me}
          onKick={kick}
        />

        <button
          onClick={leave}
          className="mt-6 rounded-xl border border-white/10 px-5 py-2.5 text-gray-400 hover:text-white"
        >
          {me === room.hostId ? "Xóa phòng" : "Rời phòng"}
        </button>
      </div>
    </div>
  );
}

export default function RoomPage() {
  return (
    <Suspense>
      <RoomContent />
    </Suspense>
  );
}
