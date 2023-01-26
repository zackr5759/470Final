import React from "react";
import { Typography, Grid } from "@mui/material";

function Header() {
  return (
    <Grid container sx={{ mb:2.5, mx:"auto", justifyContent: "center", bgcolor: "grey"}}>
      <Typography textAlign={"center"} variant="h2"  fontFamily={'Raleway'} color={"white"} gutterBottom>
        Three in a Row
      </Typography>
    </Grid>
  );
}

export default Header;