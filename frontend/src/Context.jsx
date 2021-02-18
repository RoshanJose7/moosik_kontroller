import React, { createContext, useContext, useState } from "react";

export const MyContext = createContext({
  roomCode: null,
  getUserRoom: () => {},
  clearRoomCode: () => {},
});

export function useMyContext() {
  return useContext(MyContext);
}

export const MyContextProvider = ({ children }) => {
  const [roomCode, setRoomCode] = useState(null);

  async function getUserRoom() {
    await fetch("/api/user-in-room/")
      .then((res) => res.json())
      .then((data) => setRoomCode(data.code))
      .catch((e) => console.log({ error: e }));
  }

  function clearRoomCode() {
    setRoomCode(null);
  }

  const auth = {
    roomCode,
    getUserRoom,
    clearRoomCode,
  };

  return <MyContext.Provider value={auth}>{children}</MyContext.Provider>;
};
