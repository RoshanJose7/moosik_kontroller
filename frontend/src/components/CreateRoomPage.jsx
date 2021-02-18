import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import {
  Button,
  Grid,
  Collapse,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";

const defaultProps = {
  votesToSkip: 2,
  guestCanPause: true,
  update: false,
  roomCode: null,
  updateCallback: () => {},
};

function CreateRoomPage(props = defaultProps) {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(2);

  useEffect(() => {
    if (props.update) {
      setGuestCanPause(props.guestCanPause);
      setVotesToSkip(props.votesToSkip);
    }
  }, []);

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
      .then((data) => {
        history.push("/room/" + data.code);
      })
      .catch((e) => console.error(e));
  }

  async function handleUpdateRoom() {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guest_can_pause: guestCanPause,
        votes_to_skip: votesToSkip,
        code: props.roomCode,
      }),
    };

    await fetch("/api/update-room/", requestOptions)
      .then((res) => {
        if (res.ok) {
          setSuccess("Room Updated!!!");
        } else {
          setError("Error Updating Room!!!");
        }

        props.updateCallback();
      })
      .catch((e) => console.error(e));
  }

  function RenderCreateButtons() {
    return (
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
    );
  }

  function RenderUpdateButtons() {
    return (
      <Grid item>
        <Button color="primary" variant="contained" onClick={handleUpdateRoom}>
          Update Room
        </Button>
      </Grid>
    );
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
        <Collapse in={error || success}>
          {success ? (
            <Alert
              severity="success"
              onClose={() => {
                setSuccess(null);
              }}
            >
              {success}
            </Alert>
          ) : (
            <Alert
              severity="error"
              onClose={() => {
                setError(null);
              }}
            >
              {error}
            </Alert>
          )}
        </Collapse>
      </Grid>
      <Grid item>
        <Typography component="h4" variant="h4">
          {props.update ? "Update Room" : "Create A Room"}
        </Typography>
      </Grid>
      <Grid item>
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of PlayBack State</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue={guestCanPause.toString()}
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

      {props.update ? <RenderUpdateButtons /> : <RenderCreateButtons />}
    </Grid>
  );
}

export default CreateRoomPage;
