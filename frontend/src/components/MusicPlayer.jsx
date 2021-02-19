import React from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import { PlayArrow, SkipNext, Pause } from "@material-ui/icons";

function MusicPlayer({ image_url, title, artist, is_playing, time, duration }) {
  const SongProgress = (time / duration) * 100;

  async function handlePause() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };

    await fetch("/spotify/pause/", requestOptions)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((e) => console.error(e));
  }

  async function handlePlay() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };

    await fetch("/spotify/play/", requestOptions)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((e) => console.error(e));
  }

  return (
    <Card>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <img src={image_url} height="100%" width="100%" alt="Album Cover" />
        </Grid>
        <Grid item xs={8}>
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            {artist}
          </Typography>
          <div>
            <IconButton
              onClick={() => {
                is_playing ? handlePause() : handlePlay();
              }}
            >
              {is_playing ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton>
              <SkipNext />
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <LinearProgress variant="determinate" value={SongProgress} />
    </Card>
  );
}

export default MusicPlayer;
