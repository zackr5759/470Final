import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';

import Typography from "@mui/material/Typography";


function PlaceHolderGame(props) {
    return (
        <>
            {props.isSelected === 'placeHolder' ? (
                    <Grid sx={{mt: 2, justifyContent: 'center', display: { xs: 'none', md: 'flex' }}}>
                        <Button onClick={() => {props.setGameSelected(false); props.setIsSelected(null)}}> Leave Game </Button>
                    </Grid>
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
                            textShadow: 1,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Placeholder (? Players):
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
                        Placeholder is an abstract strategy game for ? players with a game board revolving around ?.
                        This game reimplements the well known ? with a whole new spin: After ?, the player has to make a move, thus
                        changing the game state.
                    </Typography>
                    <Button onClick={() => {props.setIsSelected('placeHolder'); props.setGameSelected(true)}}> Start Game</Button>
                </div>
            ) : null }
        </>
    );
}

export default PlaceHolderGame;