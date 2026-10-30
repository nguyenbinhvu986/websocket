const tabs = [
  { id: "create", label: "Tạo phòng mới" },
  { id: "join", label: "Tham gia phòng" },
];

type RoomTabsProps = {
  tab: string;
  onChange: (id: string) => void;
};

export default function RoomTabs({ tab, onChange }: RoomTabsProps) {
  return (
    <div className="mt-6 flex gap-4">
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
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
  );
}
