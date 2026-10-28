export type Participant = {
  id: string;
  name: string;
  token: string;
  socketId: string;
};

export type Room = {
  code: string;
  hostId: string;
  participants: Participant[];
};

export type RoomState = {
  code: string;
  hostId: string;
  participants: { id: string; name: string }[];
};
