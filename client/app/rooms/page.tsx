"use client";

import { useState } from "react";
import Link from "next/link";
import CreateRoomForm from "./CreateRoom";
import JoinRoomForm from "./JoinRoom";

const tabs = [
  { id: "create", label: "Tạo phòng mới" },
  { id: "join", label: "Tham gia phòng" },
];

export default function Rooms() {
  const [tab, setTab] = useState("create");

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

        <div className="mt-6 flex gap-4">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`rounded-xl px-5 py-2.5 font-medium ${
                tab === id
                  ? "bg-white text-black"
                  : "border border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "create" && <CreateRoomForm />}
          {tab === "join" && <JoinRoomForm />}
        </div>
      </div>
    </div>
  );
}
