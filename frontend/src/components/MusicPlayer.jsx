import React from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
// import PlayArrowIcon from "@material-ui/icons/PlayArrow"
// import SkipNext from "@material-ui/icons/SkipNext"
import { PlayArrow, SkipNext, Pause } from "@material-ui/icons";

function MusicPlayer({ image_url, title, artist, is_playing, time, duration }) {
  const SongProgress = (time / duration) * 100;

  return (
    <Card>
      <Grid container alignItems="center">
        <Grid item xs={4}>
          <img src={image_url} height="100%" width="100%" alt="Image" />
        </Grid>
        <Grid item xs={8}>
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            {artist}
          </Typography>
          <div>
            <IconButton>{is_playing ? <Pause /> : <PlayArrow />}</IconButton>
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
