import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Grid, Typography } from "@material-ui/core";

import { useMyContext } from "../Context.jsx";
import CreateRoomPage from "./CreateRoomPage.jsx";
import MusicPlayer from "./MusicPlayer.jsx";

function Room({ match }) {
  const history = useHistory();
  const { clearRoomCode } = useMyContext();
  const [roomDetails, setRoomDetails] = useState({
    roomCode: match.params.roomCode,
    votes_to_skip: 2,
    guest_can_pause: false,
    is_host: false,
    showSettings: false,
    spotifyAutheticated: false,
    song: {},
  });

  useEffect(() => {
    getRoomDetails();
    getCurrentSong();
  }, []);

  useEffect(() => {
    const interval = setInterval(getCurrentSong, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  async function getRoomDetails() {
    await fetch("/api/get-room" + "?code=" + roomDetails.roomCode)
      .then((res) => {
        if (!res.ok) {
          console.error("Invalid Room Id");
          return history.push("/");
        }

        return res.json();
      })
      .then((data) => {
        setRoomDetails({
          roomCode: data.code,
          votes_to_skip: data.votes_to_skip,
          guest_can_pause: data.guest_can_pause,
          is_host: data.is_host,
        });
        if (data.is_host) {
          authenticateSpotify();
        }
      })
      .catch((e) => console.error({ error: e }));
  }

  async function getCurrentSong() {
    await fetch("/spotify/current-song/")
      .then((res) => {
        if (!res.ok) {
          return {};
        }

        return res.json();
      })
      .then((data) => {
        setRoomDetails((prevState) => {
          return { ...prevState, song: data };
        });
      });
  }

  async function handleLeaveRoom() {
    clearRoomCode();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    await fetch("/api/leave-room/", requestOptions)
      .then(() => history.push("/"))
      .catch((e) => console.error({ error: e }));
  }

  async function authenticateSpotify() {
    await fetch("/spotify/is-authenticated/")
      .then((res) => res.json())
      .then(async (data) => {
        setRoomDetails((prevState) => {
          return { ...prevState, spotifyAutheticated: data.status };
        });

        if (!data.status) {
          await fetch("/spotify/get-auth-url/")
            .then((res) => res.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  }

  function updateShowSettings(value) {
    setRoomDetails((prevState) => {
      return { ...prevState, showSettings: value };
    });
  }

  function RenderSettingsButton() {
    return (
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  }

  function RenderSettings() {
    return (
      <Grid
        container
        direction="column"
        spacing={1}
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <CreateRoomPage
            update={true}
            votesToSkip={roomDetails.votes_to_skip}
            guestCanPause={roomDetails.guest_can_pause}
            roomCode={roomDetails.roomCode}
            updateCallback={getRoomDetails}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => updateShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  }

  if (roomDetails.showSettings) {
    return <RenderSettings />;
  }

  return (
    <Grid
      container
      direction="column"
      spacing={1}
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h5" component="h5">
          Code : {roomDetails.roomCode}
        </Typography>
      </Grid>
      {console.log(roomDetails.song)}
      <MusicPlayer {...roomDetails.song} />
      {roomDetails.is_host ? <RenderSettingsButton /> : null}
      <Grid item>
        <Button variant="contained" color="secondary" onClick={handleLeaveRoom}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}

export default Room;
