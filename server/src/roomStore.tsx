import { randomUUID } from "crypto";
import type { Participant, Room, RoomState } from "./types";

const rooms = new Map<string, Room>();

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const generateCode = () => {
  let code = "";
  do {
    code = Array.from(
      { length: 4 },
      () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)],
    ).join("");
  } while (rooms.has(code));
  return code;
};

const getRoom = (code: string) => rooms.get(String(code).trim().toUpperCase());

const createParticipant = (name: string, socketId: string): Participant => ({
  id: randomUUID(),
  name: name.trim(),
  token: randomUUID(),
  socketId,
});

export const createRoom = (name: string, socketId: string) => {
  const participant = createParticipant(name, socketId);
  const room: Room = {
    code: generateCode(),
    hostId: participant.id,
    participants: [participant],
  };
  rooms.set(room.code, room);
  return { room, participant };
};

export const joinRoom = (code: string, name: string, socketId: string) => {
  const room = getRoom(code);
  if (!room) return null;
  const participant = createParticipant(name, socketId);
  room.participants.push(participant);
  return { room, participant };
};

export const resumeRoom = (
  code: string,
  participantId: string,
  token: string,
  socketId: string,
) => {
  const room = getRoom(code);
  const participant = room?.participants.find(({ id }) => id === participantId);
  if (!room || !participant || participant.token !== token) return null;
  participant.socketId = socketId;
  return { room, participant };
};

export const findBySocket = (socketId: string) => {
  for (const room of rooms.values()) {
    const participant = room.participants.find(
      (item) => item.socketId === socketId,
    );
    if (participant) return { room, participant };
  }
  return null;
};

export const removeParticipant = (room: Room, participantId: string) => {
  room.participants = room.participants.filter(
    ({ id }) => id !== participantId,
  );
};

export const deleteRoom = (code: string) => {
  rooms.delete(code);
};

export const toRoomState = ({
  code,
  hostId,
  participants,
}: Room): RoomState => ({
  code,
  hostId,
  participants: participants.map(({ id, name }) => ({ id, name })),
});
