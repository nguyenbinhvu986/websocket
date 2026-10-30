"use client";

import { useState } from "react";
import { useEnterRoom } from "./useEnterRoom";

export default function JoinRoom() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const { error, enter } = useEnterRoom("room:joined");

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111114] p-6 text-white">
      <h2 className="text-xl font-semibold">Tham gia phòng</h2>
      <p className="text-sm text-gray-400">
        Không cần tài khoản, chỉ cần mã phòng và tên hiển thị.
      </p>

      <p className="mt-4 block text-sm">Nhập mã phòng</p>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        placeholder="VD: PHO247"
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3"
      />

      <p className="mt-4 block text-sm">Tên của bạn</p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tên hiển thị trong phòng"
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3"
      />

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      <button
        onClick={() => enter("room:join", { code, name })}
        disabled={!code.trim() || !name.trim()}
        className="mt-4 w-full rounded-xl bg-white p-3 font-semibold text-black disabled:bg-white/5 disabled:text-gray-500"
      >
        Vào phòng ngay
      </button>
    </div>
  );
}
