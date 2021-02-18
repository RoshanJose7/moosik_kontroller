import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, IconButton } from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import { Link } from "react-router-dom";

const pages = {
  JOIN: "pages.join",
  CREATE: "pages.create",
};

function Info() {
  const [page, setPage] = useState(pages.JOIN);

  function JoinInfo() {}

  function CreateInfo() {}

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
          WHat is Moosik Kontrol?
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">
          {page === pages.JOIN ? <JoinInfo /> : <CreateInfo />}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton
          onClick={() => {
            page === pages.CREATE ? setPage(pages.JOIN) : setPage(pages.CREATE);
          }}
        >
          {page === pages.CREATE ? <NavigateBefore /> : <NavigateNext />}
        </IconButton>
      </Grid>
      <Grid item>
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}

export default Info;
