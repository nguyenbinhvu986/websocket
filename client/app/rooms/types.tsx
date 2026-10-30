export type RoomState = {
  code: string;
  hostId: string;
  participants: { id: string; name: string }[];
};
