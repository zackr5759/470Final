import "./App.css";
import Header from "./components/Header";
import { useState } from "react";
import WinningMessage from "./components/WinningMessage";
import CardComponent from "./components/Card";
import { NextCard } from "./components/Card";
import { Typography, Grid, Button, Table, Box, Stack } from "@mui/material";
import WinningCondition from "./components/WinningCondition";

const genereateArr = () => {
  let tempSet = new Set();
  while (tempSet.size !== 16) {
    let randIndx = Math.floor(Math.random() * 54);
    tempSet.add(randIndx);
  }
  let res = [...tempSet];
  console.log(res);
  return res;
};

const arr1 = genereateArr();
const arr2 = genereateArr();
const arr3 = genereateArr();
const arr4 = genereateArr();

function App() {
  const [winningPlayer, setWinningPlayer] = useState();
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (player) => {
    setWinningPlayer(player);
    setGameOver(true);
  };

  return (
    <>
      <Header />
      <NextCard />
      <WinningCondition />
      <Grid display="flex" pb={2}>
        <Stack mx={"auto"}>
          <h3>Player 1</h3>
          <Box sx={{ mx: "auto", bgcolor: "#b29c7c" }}>
            <CardComponent arr={arr1} />
          </Box>
          <Button
            sx={{
              color: "white",
              my: 2.5,
              mx: "auto",
              bgcolor: "green",
              width: 100,
            }}
            onClick={() => handleClick(1)}
          >
            Loteria
          </Button>
        </Stack>
        <Stack mx={"auto"}>
          <h3>Player 2</h3>
          <Box sx={{ mx: "auto", bgcolor: "#b29c7c" }}>
            <CardComponent arr={arr2} />
          </Box>
          <Button
            sx={{
              color: "white",
              my: 2.5,
              mx: "auto",
              bgcolor: "green",
              width: 100,
            }}
            onClick={() => handleClick(2)}
          >
            Loteria
          </Button>
        </Stack>
        <Stack mx={"auto"}>
          <h3>Player 3</h3>
          <Box sx={{ mx: "auto", bgcolor: "#b29c7c" }}>
            <CardComponent arr={arr3} />
          </Box>
          <Button
            sx={{
              color: "white",
              my: 2.5,
              mx: "auto",
              bgcolor: "green",
              width: 100,
            }}
            onClick={() => handleClick(3)}
          >
            Loteria
          </Button>
        </Stack>
        <Stack mx={"auto"}>
          <h3>Player 4</h3>
          <Box sx={{ mx: "auto", bgcolor: "#b29c7c" }}>
            <CardComponent arr={arr4} />
          </Box>
          <Button
            sx={{
              color: "white",
              my: 2.5,
              mx: "auto",
              bgcolor: "green",
              width: 100,
            }}
            onClick={() => handleClick(4)}
          >
            Loteria
          </Button>
        </Stack>
      </Grid>
      {gameOver && <WinningMessage player={winningPlayer} />}
    </>
  );
}

export default App;
