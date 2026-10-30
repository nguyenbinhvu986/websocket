"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CreateRoomForm from "./CreateRoom";
import JoinRoomForm from "./JoinRoom";
import RoomTabs from "./components/RoomTabs";
import CurrentRoomCard from "./components/CurrentRoom";
import { loadSession, type Session } from "./socket";

export default function Rooms() {
  const [tab, setTab] = useState("create");
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(loadSession());
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] p-6 text-white">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-gray-400 hover:text-white">
          ← Quay lại Trang chủ
        </Link>

        <div className="mt-8 font-mono text-xs tracking-widest text-gray-500">
          ĐẤU TRƯỜNG ẨM THỰC KNOCK-OUT
        </div>
        <h2 className="mt-2 text-5xl font-bold">Food Cup</h2>
        <p className="mt-4 text-gray-400">
          Bảng đấu knock-out 128 món ăn Việt. Bình chọn trực tiếp từng cặp món
          theo thời gian thực — Phở, Bún Chả hay Bánh Mì sẽ thống trị ngôi vương
          quốc món Việt của phòng bạn?
        </p>

        {session ? (
          <CurrentRoomCard code={session.code} />
        ) : (
          <>
            <RoomTabs tab={tab} onChange={setTab} />
            <div className="mt-6">
              {tab === "create" && <CreateRoomForm />}
              {tab === "join" && <JoinRoomForm />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
