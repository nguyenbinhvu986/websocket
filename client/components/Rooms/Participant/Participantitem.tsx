type ParticipantItemProps = {
  name: string;
  isHost: boolean;
  isMe: boolean;
  canKick: boolean;
  onKick: () => void;
};

export default function ParticipantItem({
  name,
  isHost,
  isMe,
  canKick,
  onKick,
}: ParticipantItemProps) {
  return (
    <li className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
      <span>
        {name}
        {isHost && " 👑"}
        {isMe && " (bạn)"}
      </span>
      {canKick && (
        <button
          onClick={onKick}
          className="rounded-lg border border-red-400/30 px-3 py-1 text-sm text-red-400 hover:bg-red-400/10"
        >
          Kick
        </button>
      )}
    </li>
  );
}
