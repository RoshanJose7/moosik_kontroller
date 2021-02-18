import React, { useEffect } from "react";
import { Button, Grid, ButtonGroup, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useMyContext } from "../Context.jsx";

function HomePage() {
  const history = useHistory();
  const { roomCode, getUserRoom } = useMyContext();

  useEffect(() => {
    getUserRoom();
  }, []);

  useEffect(() => {
    if (roomCode) {
      history.push(`/room/${roomCode}`);
    }
  }, [roomCode]);

  return (
    <Grid
      container
      direction="column"
      spacing={3}
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h3" component="h3" align="center">
          Moosik Kontroller
        </Typography>
      </Grid>
      <Grid item>
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button color="primary" to="/join" component={Link}>
            Join a Room
          </Button>
          <Button color="secondary" to="/create" component={Link}>
            Create a Room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}

export default HomePage;
