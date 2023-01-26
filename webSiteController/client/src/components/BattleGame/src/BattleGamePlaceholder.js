import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {App as BattleGame} from "./App.js"


function Battlegame(props) {
    const handleClick = event => {
            props.setGameSelected();
            props.setIsSelected(event);
    };
    return (
        <>
            {(props.isSelected === 'battlegame') ? (
                <BattleGame setGameSelected={props.setGameSelected}
                           setIsSelected={props.setIsSelected}/>
            ) : props.gameSelected === false ? (
                <div className="joinGame">
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,

                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Battle Game (1 Player):
                    </Typography>

                    <Typography
                        paragraph={true}
                        variant="body2"

                        component="a"
                        gutterBottom
                        display="block"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,

                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        The game consists of random enemies in waves with 5 stages. Put together a party of units to clear the game.
                    </Typography>

                    <Button onClick={() => handleClick('battlegame')}> Start Game</Button>
                </div>
            )
            : null
            }
        </>
    );
}

export default Battlegame;