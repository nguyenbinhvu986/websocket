import Link from "next/link";
import Navbar from "./component/common/Navbar";

const stats = [
  { value: "128", label: "Đặc sản 3 miền" },
  { value: "15 Giây", label: "Thời gian vote" },
  { value: "Party", label: "Lên tới 50 bạn" },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 bg-[#09090b] p-6 text-white">
      <Navbar />
      <h1 className="text-4xl font-bold">Chọn trò chơi</h1>
      <p className="max-w-2xl text-center text-lg text-gray-400">
        Trải nghiệm các mini-game đối kháng âm nhạc và ẩm thực cùng bạn bè qua
        phòng realtime không cần tài khoản. Nhảy vào một trận đấu ngay lập tức!
      </p>
      <Link href="/rooms" className="w-full max-w-3xl">
        <div className="w-full rounded-2xl border border-white/10 bg-[#111114] p-6">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm">
              128 Món Việt
            </span>
            <span className="font-mono text-xs tracking-widest text-gray-500">
              BRACKET ẨM THỰC
            </span>
          </div>

          <h2 className="mt-6 text-3xl font-bold">Food Cup — Món ăn Việt</h2>
          <p className="mt-3 text-lg text-gray-400">
            Bình chọn món ngon Việt Nam qua bảng đấu knock-out gay cấn. Phở, Bún
            Chả hay Bánh Mì sẽ thống trị ngôi vương quốc dân?
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3"
              >
                <div className="font-semibold">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-gray-500">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Phòng mở sẵn: <b className="text-white">0</b> phòng
            </div>
            <button className="flex items-center gap-2 rounded-xl border border-violet-300/30 bg-violet-300/10 px-5 py-2.5 font-medium text-violet-300 hover:bg-violet-300/20">
              Chơi ngay
            </button>
          </div>
        </div>
      </Link>
    </main>
  );
}
