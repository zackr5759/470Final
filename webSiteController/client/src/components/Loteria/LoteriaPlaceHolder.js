import React, { useState } from "react";
import App from "./Loteria.js";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function LoteriaGame(props) {
  const handleClick = (event) => {
    props.setGameSelected();
    props.setIsSelected(event);
  };
  return (
    <>
      {props.isSelected === "Loteria" ? (
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
            Loteria (4 Players):
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
            Each player has a different board, featuring pictures of the
            different cards in the deck. A card is dealt from the deck, and any
            player that has the picture of that card on their board checks it
            off. The pattern to win (a column or a row) is determined at the
            beginning of each game. Once one player makes that pattern, they hit
            the “Loteria” button and win the game.
          </Typography>

          <Button onClick={() => handleClick("Loteria")}> Start Game</Button>
        </div>
      ) : null}
    </>
  );
}

export default LoteriaGame;
