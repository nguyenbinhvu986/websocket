import ParticipantItem from "./Participantitem";
import type { RoomState } from "../types";

type ParticipantListProps = {
  participants: RoomState["participants"];
  hostId: string;
  me: string;
  onKick: (id: string) => void;
};

export default function ParticipantList({
  participants,
  hostId,
  me,
  onKick,
}: ParticipantListProps) {
  return (
    <>
      <h2 className="mt-8 text-xl font-semibold">
        Người chơi ({participants.length})
      </h2>
      <ul className="mt-3 space-y-2">
        {participants.map(({ id, name }) => (
          <ParticipantItem
            key={id}
            name={name}
            isHost={id === hostId}
            isMe={id === me}
            canKick={me === hostId && id !== me}
            onKick={() => onKick(id)}
          />
        ))}
      </ul>
    </>
  );
}
