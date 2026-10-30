import Link from "next/link";

type CurrentRoomCardProps = {
  code: string;
};

export default function CurrentRoomCard({ code }: CurrentRoomCardProps) {
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-[#111114] p-6">
      <h2 className="text-xl font-semibold">Bạn đang ở trong phòng {code}</h2>
      <p className="mt-1 text-sm text-gray-400">
        Quay lại phòng để tiếp tục chơi.
      </p>
      <Link
        href={`/rooms/${code}`}
        className="mt-4 block w-full rounded-xl bg-white p-3 text-center font-semibold text-black"
      >
        Quay lại phòng
      </Link>
    </div>
  );
}
