import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { socket, saveSession } from "../../../Socket/socket";

type Entered = { participantId: string; token: string; room: { code: string } };

export const useEnterRoom = (resultEvent: string) => {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    const onEntered = ({ participantId, token, room: { code } }: Entered) => {
      saveSession({ code, participantId, token });
      router.replace(`/rooms/${code}`);
    };
    socket.on(resultEvent, onEntered);
    socket.on("room:error", setError);
    return () => {
      socket.off(resultEvent, onEntered);
      socket.off("room:error", setError);
    };
  }, [resultEvent, router]);

  const enter = (requestEvent: string, payload: object) => {
    setError("");
    socket.connect();
    socket.emit(requestEvent, payload);
  };

  return { error, enter };
};
