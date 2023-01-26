import React from "react";
import { Typography, Grid } from "@mui/material";

function Header() {
  return (
    <Grid container sx={{ mb:2.5, mx:"auto", justifyContent: "center", backgroundColor: 'black',}}>
      <Typography textAlign={"center"} variant="h2"  fontFamily={'Raleway'} color={"#b29c7c"} gutterBottom>
        Loteria
      </Typography>
    </Grid>
  );
}

export default Header;
