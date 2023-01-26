import React from "react";
import { Typography, Grid, Stack, Button } from "@mui/material";

function WinningMessage(props) {
  return (
    <Stack container sx={{ mb: 2.5, mx: "auto", justifyContent: "center" }}>
      <Typography
        textAlign={"center"}
        variant="h5"
        fontFamily={"Raleway"}
        color={"white"}
        gutterBottom
      >
        Player {props.player} called Loteria.
      </Typography>
      <Button
        sx={{
          mx: "auto",
          width: 150,
          justifyContent: "center",
        }}
      >
        Play Again
      </Button>
    </Stack>
  );
}

export default WinningMessage;
