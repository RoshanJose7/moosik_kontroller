import React from "react";
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

function RoomJoinPage() {
  const defaultVotes = 2;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Join A Room
        </Typography>
      </Grid>
    </Grid>
  );
}

export default RoomJoinPage;
