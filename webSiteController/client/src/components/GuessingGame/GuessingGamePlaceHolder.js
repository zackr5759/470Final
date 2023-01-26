import React, { useState } from "react";
import App from "./GuessingGame.js";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function GuessingGame(props) {
  const handleClick = (event) => {
    props.setGameSelected();
    props.setIsSelected(event);
  };
  return (
    <>
      {props.isSelected === "Guessing game" ? (
        <App
          setGameSelected={props.setGameSelected}
          setIsSelected={props.setIsSelected}
        />
      ) : props.gameSelected === false ? (
        <div className="joinGame">
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,

              color: "inherit",
              textDecoration: "none",
            }}
          >
            Three in a Row (1 Player):
          </Typography>

          <Typography
            paragraph={true}
            variant="body2"
            component="a"
            gutterBottom
            display="block"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,

              color: "inherit",
              textDecoration: "none",
            }}
          >
            The player is initially shown three numbers between 10-to-60. These
            numbers, then, are randomly shuffled and the player’s goal is to
            correctly guess their new order. A new set of numbers is generated
            after each guess. Winning condition: obtain a guessing streak of 3.
          </Typography>

          <Button onClick={() => handleClick("Guessing game")}>
            {" "}
            Start Game
          </Button>
        </div>
      ) : null}
    </>
  );
}

export default GuessingGame;
