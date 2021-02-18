import React, { useEffect, useState } from "react";

function Room({ match }) {
  const [roomDetails, setRoomDetails] = useState({
    roomCode: match.params.roomCode,
    votes_to_skip: 2,
    guest_can_pause: false,
    is_host: false,
  });

  useEffect(() => {
    getRoomDetails();
  }, []);

  async function getRoomDetails() {
    await fetch("/api/get-room" + "?code=" + roomDetails.roomCode)
      .then((res) => res.json())
      .then((data) =>
        setRoomDetails({
          roomCode: data.code,
          votes_to_skip: data.votes_to_skip,
          guest_can_pause: data.guest_can_pause,
          is_host: data.is_host,
        })
      )
      .catch((e) => console.error({ eror: e }));
  }

  return (
    <div>
      <h3>Code : {roomDetails.roomCode}</h3>
      <p>votes_to_skip : {roomDetails.votes_to_skip}</p>
      <p>guest_can_pause : {roomDetails.guest_can_pause.toString()}</p>
      <p>is_host : {roomDetails.is_host.toString()}</p>
    </div>
  );
}

export default Room;
