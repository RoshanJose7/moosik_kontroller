import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";

function CreateRoomPage() {
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(2);

  function handleVotesChange(e) {
    setVotesToSkip(e.target.value);
  }

  function handleGuestCanPauseChange(e) {
    setGuestCanPause(e.target.value === "true" ? true : false);
  }

  async function handleCreateRoom() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guest_can_pause: guestCanPause,
        votes_to_skip: votesToSkip,
      }),
    };

    await fetch("/api/room/create/", requestOptions)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => console.error(e));
  }

  return (
    <Grid
      container
      direction="column"
      spacing={1}
      justify="space-evenly"
      alignItems="center"
    >
      <Grid item>
        <Typography component="h4" variant="h4">
          Create A Room
        </Typography>
      </Grid>
      <Grid item>
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of PlayBack State</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue="true"
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item>
        <FormControl component="fieldset">
          <TextField
            required={true}
            type="number"
            defaultValue={votesToSkip}
            inputProps={{ min: 1, style: { textAlign: "center" } }}
            onChange={handleVotesChange}
          />
          <FormHelperText>
            <div align="center">Votes Required to skip song</div>
          </FormHelperText>
        </FormControl>
      </Grid>

      <Grid item>
        <Button color="primary" variant="contained" onClick={handleCreateRoom}>
          Create a Room
        </Button>
        <Button
          style={{ marginLeft: "10px" }}
          color="secondary"
          variant="contained"
          to="/"
          component={Link}
        >
          Back
        </Button>
      </Grid>
    </Grid>
  );
}

export default CreateRoomPage;
