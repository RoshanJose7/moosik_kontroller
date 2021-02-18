import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Grid, Typography, TextField } from "@material-ui/core";

function RoomJoinPage() {
  const history = useHistory();
  const [details, setDetails] = useState({
    roomCode: "",
    error: "",
  });

  function handleChange(e) {
    setDetails({ roomCode: e.target.value });
  }

  async function roomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: details.roomCode,
      }),
    };

    await fetch("/api/join-room/", requestOptions)
      .then((res) => {
        if (res.ok) {
          history.push(`/room/${details.roomCode}`);
        } else {
          setDetails({
            error: "Room not Found",
            roomCode: "",
          });
        }
      })
      .catch((e) => console.error({ error: e }));
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
        <Typography component="h4" variant="h4">
          Join a Room
        </Typography>

        <TextField
          style={{ marginTop: "20px" }}
          error={details.error}
          label="code"
          placeholder="Enter a Room Code"
          value={details.roomCode}
          helperText={details.error}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>

      <Grid item style={{ marginTop: "30px" }}>
        <Button variant="contained" color="primary" onClick={roomButtonPressed}>
          Enter Room
        </Button>

        <Button
          style={{ marginLeft: "10px" }}
          variant="contained"
          color="secondary"
          to="/"
          component={Link}
        >
          Go Home
        </Button>
      </Grid>
    </Grid>
  );
}

export default RoomJoinPage;
