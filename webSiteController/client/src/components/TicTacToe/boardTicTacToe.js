import React, {Fragment, useReducer, useState, useEffect} from 'react';
import { useChannelStateContext, useChatContext } from "stream-chat-react";


import { click_on_cell_action, reset_action, update_Board } from './actionsTicTacToe';
import { reducers, createInitialState } from './reducersTicTacToe';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";
import Stack from '@mui/material/Stack'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createMuiTheme} from "@mui/material";

import {CssBaseline} from "@mui/material";
import {green} from "@mui/material/colors";
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Train One',
            'cursive',
        ].join(','),
    },});

const config = {
    num_rows: 3,
    num_columns: 3,
    h_gap:1,
    cell_width: 100,
    cell_height: 100
}


function Cell(props) {
    const { cell, colIdx, rowGroup, dispatch, turn, player, client, channel, cookieIDName} = props;

    return (
        <Fragment>
            <Box sx={{}}>
                <Box   justifyContent="center" alignItems="center" display="flex" sx={{
                    width: config.cell_width,
                    height: config.cell_height,


                    ...(colIdx === 0 && rowGroup === 0 && {
                        borderRight: '4px solid',
                        borderBottom: '4px solid',
                    }),

                    ...(colIdx === 1 && rowGroup === 0 && {
                        borderLeft: '4px solid',
                        borderRight: '4px solid',
                        borderBottom: '4px solid',
                    }),

                    ...(colIdx === 2 && rowGroup === 0 && {
                        borderLeft: '4px solid',
                        borderBottom: '4px solid',
                    }),


                    ...(colIdx === 0 && rowGroup === 1 && {
                        borderBottom: '4px solid',
                        borderRight: '4px solid',
                        borderTop: '4px solid',
                    }),


                    ...(colIdx === 1 && rowGroup === 1 && {
                        border: '4px solid',
                    }),

                    ...(colIdx === 2 && rowGroup === 1 && {
                        borderLeft: '4px solid',
                        borderBottom: '4px solid',
                        borderTop: '4px solid',
                    }),



                    ...(colIdx === 0 && rowGroup === 2 && {
                        borderRight: '4px solid',
                        borderTop: '4px solid',
                    }),

                    ...(colIdx === 1 && rowGroup === 2 && {
                        borderLeft: '4px solid',
                        borderRight: '4px solid',
                        borderTop: '4px solid',
                    }),

                    ...(colIdx === 2 && rowGroup === 2 && {
                        borderLeft: '4px solid',
                        borderTop: '4px solid',

                    }),
                    borderColor: '#443a4c',
                }}
                     onClick={() => dispatch(click_on_cell_action(colIdx, rowGroup, turn, player, client, channel, cookieIDName))}
                >
                    <Typography sx={{fontFamily: 'Train One', fontWeight: 700, fontSize: '4rem',
                                    ...(cell['playerMarking'] === 'X' && {
                                        color: '#845c85',
                                    }),
                                    ...(cell['playerMarking'] === 'O' && {
                                        color: '#845c85',
                                    }),
                                    }}>
                        {cell['playerMarking']}
                    </Typography>

                    </Box>
            </Box>
        </Fragment>
    );
}

function Row(props) {
    const {row, rowKey, dispatch, turn, player, client, channel, cookieIDName} = props;
    return (
        <Grid container
              conlumns={config.num_columns}
              sx={{
                  direction: 'flex-row',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  mt: -1
              }}

        >
            {
                props.row.map((cell, idx, rowIdx) =>
                    <Grid item
                          key={idx}
                    >
                        <Cell key={idx}
                              cell={cell}
                              colIdx={idx}
                              rowGroup={props.rowKey}
                              dispatch={dispatch}
                              turn={turn}
                              player={player}
                              client={client}
                              channel={channel}
                              cookieIDName={cookieIDName}
                        />
                    </Grid>)
            }
        </Grid>
    )
}




function GameInfo(props) {

    let {player1, player2, player1Score, player2Score} = props;
    const player1Message = `${player1} (X): ${player1Score}`;
    const player2Message = `${player2} (O): ${player2Score}`;
    return (
        <Fragment>
        <Stack direction="row" spacing={5} sx={{mt: 3}}>
            <Box sx ={{ border: '3px solid', borderColor: '#8e0000', borderRadius: '10%'}} >
                <Typography sx={{fontSize:"1.2rem", fontWeight: 650, padding: 0.5, fontFamily: 'sans-serif', color: '#bcc0b7'}}>
                    {player1Message}
                </Typography>
            </Box>
            <Box sx ={{ border: '3px solid', borderColor: '#8e0000', borderRadius: '10%'}}>
                <Typography sx={{fontSize:"1.2rem", padding: 0.5, fontWeight: 650, fontFamily: 'sans-serif', color: '#bcc0b7'}}>
                    {player2Message}
                </Typography>
            </Box>
        </Stack>
        </Fragment>
        )

}
function TopMessage(props) {

    const {haveAWinner, winningPlayer, playerTurn, player1, player2} = props;
    let winnersName = '';
    let playingName = (playerTurn === 'player1' ? player1 : player2);
    if (haveAWinner){
        winnersName = (winningPlayer === 'player1' ? player1 : winningPlayer == 'player2' ? player2 : 'tie');
    }

    const firstMessage = () => (haveAWinner && winnersName !== 'tie') ? `${winnersName} wins.` : (haveAWinner) ? `Tie Game.` : `${playingName} plays next`;

    return (
        <Stack width='100%' sx={{mt: 2}}>
            <Typography variant='h6' textAlign='center' sx={{fontFamily: 'sans-serif', fontSize: '28px', fontWeight: 900, borderBottom: '3px solid', borderColor: '#8e0000', color: '#bcc0b7'}}>
                {
                    firstMessage()
                }
            </Typography>
            <Grid sx={{ display: 'flex',
                direction: 'flex-column',
                justifyContent: 'center',
                mt: 2,
                mb: 1,
            }}>
            <Button width='100%'
                    sx={{
                        visibility: haveAWinner ? 'visible' : 'hidden',
                        color:'pink',
                        boxShadow: "1px 1px 5px gray",
                        width: '15px',
                        fontFamily: 'sans-serif',
                    }}
                    onClick={() => props.dispatch(reset_action(props.channel))}>Reset?
            </Button>
        </Grid>

        </Stack>
    )
};



export default function Board(props) {
    const {player1, player2, firstConnected, clientID, setGameSelected, setIsSelected, isNotMegaTTT, idkey} = props;
    const cookieIDName = document.cookie
        .split('; ')
        .find((row) => row.startsWith('username='))
        ?.split('=')[1];

    const [player, setPlayer] = useState(null);
    const [player1Name, setPlayer1Name] = useState(null);
    const [player2Name, setPlayer2Name] = useState(null);
    const { channel } = useChannelStateContext();
    const { client } = useChatContext();

    const [state, dispatch] = useReducer(reducers, idkey, createInitialState);
    const {winningPlayer, haveAWinner, board, turn, player1Score, player2Score} = state;

    const calcWidth = () => config.num_columns * config.cell_width +
        (config.num_columns - 1) * config.h_gap;


    useEffect(() => {

        if (firstConnected === null){
            setPlayer('player2');
            setPlayer2Name(player1);
            setPlayer1Name(player2);
        }
        else if (cookieIDName === firstConnected){
            setPlayer('player1');
            setPlayer1Name(player1);
            setPlayer2Name(player2);

        }
    }, [])

    useEffect(() => {
        channel.on((event) => {
            if (event.type === "game-move" && event.user.id !== client.userID) {
                console.log("event data: ", event.data);
                if (event.data.newState.identity === state.identity)
                    dispatch(update_Board(event.data.newState));
            }
        });
    }, [])


    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Fragment>





                <Grid container margin='auto'
                      columns={1}
                      sx={{
                          width: calcWidth(),
                          display: 'flex',
                          direction: 'flex-column',
                          justifyContent: 'center',
                          mt: 1
                      }}
                >
                    {isNotMegaTTT &&
                    <Grid item sx={{mb: 3}}>
                        <TopMessage playerTurn={turn}
                                    winningPlayer={winningPlayer}
                                    haveAWinner={haveAWinner}
                                    dispatch={dispatch}
                                    channel={channel}
                                    player1={player1Name}
                                    player2={player2Name}

                        />
                    </Grid>
                    }
                    {
                        board.map((row, rowIdx) => (
                            <Grid item
                                  key={rowIdx}
                                  width='100%'
                                  sx={{mb: 1}}
                                  xs={1}
                            >
                                <Row key={rowIdx}
                                     row={row}
                                     rowKey={rowIdx}
                                     dispatch={dispatch}
                                     turn={turn}
                                     player={player}
                                     client={client}
                                     channel={channel}
                                     cookieIDName={cookieIDName}
                                     player1={player1}
                                     player2={player2}
                                />
                            </Grid>))
                    }
                    {isNotMegaTTT &&
                    <Grid>


                        <GameInfo player1={player1Name} player2={player2Name}
                                    player1Score={player1Score} player2Score={player2Score}
                            />
                    </Grid>}


                </Grid>

                {isNotMegaTTT &&
                <Grid sx={{
                    display: 'flex',
                    direction: 'flex-column',
                    justifyContent: 'center',
                    mt: 3,
                    fontFamily: 'sans-serif',}}>
                    <Button sx = {{boxShadow: "1px 1px 5px gray", color:'pink'}} onClick={async () => {
                        await channel.stopWatching();
                        props.setChannel(null);
                        props.setGameSelected(false);
                        props.setIsSelected(null)}}>
                        <Typography>
                            Leave Game
                        </Typography>

                    </Button>
                </Grid>
                }
            </Fragment>
        </ThemeProvider>
    );
}
