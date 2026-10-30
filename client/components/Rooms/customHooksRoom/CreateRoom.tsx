"use client";
import { useState } from "react";
import { useEnterRoom } from "./useEnterRoom";
export default function CreateRoomForm() {
  const [name, setName] = useState("");
  const { error, enter } = useEnterRoom("room:created");

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111114] p-6 text-white">
      <h2 className="text-xl font-semibold">Tạo phòng</h2>
      <p className="text-sm text-gray-400">
        Bạn sẽ nhận mã phòng để mời bạn bè vào chơi.
      </p>
      <p className="mt-4 block text-sm">Tên của bạn</p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tên hiển thị trong phòng"
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3"
      />
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      <button
        onClick={() => enter("room:create", { name })}
        disabled={!name.trim()}
        className="mt-4 w-full rounded-xl bg-white p-3 font-semibold text-black disabled:bg-white/5 disabled:text-gray-500"
      >
        Tạo phòng ngay
      </button>
    </div>
  );
}
