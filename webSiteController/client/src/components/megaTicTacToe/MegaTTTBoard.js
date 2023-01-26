import React, {Fragment, useReducer, useState, useEffect} from 'react';
import { useChannelStateContext, useChatContext } from "stream-chat-react";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";
import Stack from '@mui/material/Stack'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createMuiTheme} from "@mui/material";
import { reducers, createInitialState } from './reducersMTTT';

import {CssBaseline} from "@mui/material";
import {click_on_cell_action, update_Board, updateEnemyBoard, checkBoardState, reset_board} from "./actionsMTT";
import {reset_action} from "../TicTacToe/actionsTicTacToe";

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

    const { cell, colIdx, rowGroup, dispatch, turn, player, client, channel, cookieIDName, state} = props;
    return (
        <Fragment>

                <Box aria-label="Tiny Cell container"
                    // justifyContent="center" alignItems="center" display="flex"
                    sx={{
                    // width: config.cell_width,
                    // height: config.cell_height,
                    width: "100%",
                    height: "100%",

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

                    ...(  (cell['playerMarking'] === null) && (props.megaRowKey === state.forcedPlay[0]) && (props.megaColKey === state.forcedPlay[1]) &&
                        {
                            backgroundColor: 'pink',
                        }
                    ),

                    borderColor: '#443a4c',


                }}
                       onClick={() => dispatch(click_on_cell_action(colIdx, rowGroup, turn, player, client, channel, cookieIDName, props.megaRowKey, props.megaColKey))}
                >
                    <Typography sx={{fontFamily: 'Train One', fontWeight: 700, fontSize: '2.5rem',
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
        </Fragment>
    );
}

function Row(props) {
    const {row, rowKey, dispatch, turn, player, client, channel, cookieIDName} = props;
    return (
        <Stack
              aria-label="This is a row"
              // columns={3}
              direction={"row"}
              sx={{
                  height: '100%',
                  width: '100%',

              }}

        >

            {
                props.row.map((cell, idx, rowIdx) =>
                    <Stack aria-label="Grid item in row map" direction={"row"}
                          key={idx} sx={{width:'100%', height:'100%',
                        // mt: -1,
                        direction: 'flex-row',
                        whiteSpace: 'nowrap',
                        // overflow: 'hidden',
                    }}
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
                              megaRowKey={props.megaRowIdx}
                              megaColKey={props.megaColIdx}
                              state={props.state}
                        />
                    </Stack>)
            }
        </Stack>
    )
}

function MegaCol(props){
    const {megaCol, rowKey, dispatch, turn, player, client, channel, cookieIDName} = props;
    const renderMiniBoard = props.state.grandBoard[props.megaRowKey][props.megaColKey]['isOccupied'];
    const playerMarker = props.state.grandBoard[props.megaRowKey][props.megaColKey]['playerMarking']
    return (
        <Stack direction={"column"}  width='100%'
               sx = {{height:"100%", width:"100%", border: '2px solid', borderColor:'pink'}}>
            {!renderMiniBoard && megaCol.map((row, rowIdx) => (
                    <Grid
                          aria-label="THis is grid item in MegaCol"
                          key={rowIdx}


                          sx={{width:'100%', height:"100%"}}
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
                             player1={props.player1}
                             player2={props.player2}
                             megaRowIdx={props.megaRowKey}
                             megaColIdx={props.megaColKey}
                             state={props.state}
                        />
                    </Grid>))
            }
            {renderMiniBoard && <Grid
                aria-label="THis is grid item in MegaCol"


                sx={{width:'100%', height:"100%", display: 'flex',
                    direction: 'flex-column',
                    justifyContent: 'center',
                    alignItems: 'center',}}
                ><Typography  sx={{fontFamily: 'Train One', fontWeight: 700, fontSize: '4.5rem',
                ...(props.state.grandBoard['playerMarking'] === 'X' && {
                    color: '#845c85',
                }),
                ...(props.state.grandBoard['playerMarking'] === 'O' && {
                    color: '#845c85',
                }),
            }}>
                {playerMarker}

            </Typography>

            </Grid>}


        </Stack>

    );
}

function MegaRow(props){

    const {megaBoardRow, megaRowKey, dispatch, turn, player, client, channel, cookieIDName} = props;
    // const renderGridWin = props.state.grandBoard[props.megaRowKey][props.megaColKey].isOccupied;
    // const gridWinSymbol = props.state.grandBoard[props.megaRowKey][props.megaColKey].playerMarking;
    // console.log("This is renderGridWin at: ", renderGridWin);
    return (
        <Stack aria-label="Mega Row Stack" direction={"row"} columns={3}
               sx = {{width:'100%', height:"100%",
                   borderColor: 'pink'} }>
            {megaBoardRow.map((megaRow, megaRowIdx) =>
                <Grid item aria-label="Mega Row Grid Item"
                      key={megaRowIdx} sx={{width:"100%", height:"100%", border: '1px solid'}}
                >

                    <MegaCol key={megaRowIdx}
                             megaCol={megaRow}
                             dispatch={dispatch}
                             turn={turn}
                             player={player}
                             client={client}
                             channel={channel}
                             cookieIDName={cookieIDName}
                             player1={props.player1}
                             player2={props.player2}
                             megaRowKey={megaRowKey}
                             megaColKey={megaRowIdx}
                             state={props.state}
                    />

                </Grid>
            )}

           {/*<Grid item width='100%' sx={{mb: 1}} xs={1}>*/}
           {/*     <Box>*/}
           {/*         hiiiii*/}
           {/*     </Box>*/}
           {/* </Grid>*/}

        </Stack>
    );
}
function TopMessage(props){
    let playingName = (props.turn === 'player1' ? props.player1 : props.player2);

    const turnMessage = `${playingName} plays next`;
    const winMessage = (props.haveAWinner === false ? false : props.winningPlayer === 'C' ? "Cat's Game" : props.winningPlayer === 'X' ? `${props.player1} has won the game` : `${props.player2} has won the game` );
    const infoMessage = (winMessage ? winMessage : turnMessage);
    return    <Grid>

        <Box>
            <Typography sx={{fontFamily: 'Train One', fontWeight: 700, fontSize: '3.5rem',}}
            >
                Mega Tic Tac Toe
            </Typography>
            <Box aria-label='holding game message' sx={{alignItems: 'center', justifyContent:'center'}}>
            <Grid sx={{justifyContent: 'center', alignItems: 'center',
                        width: '50%', ml:16}}>
                <Typography sx={{fontFamily: 'Train One', fontWeight: 700, fontSize: '1.5rem', borderBottom: '2px solid'}}>
                    {infoMessage}
                </Typography>
            </Grid>
        </Box>
            <Grid sx={{ display: 'flex',
                direction: 'flex-column',
                justifyContent: 'center',
                mt: 2,
                mb: 1,
            }}>
                <Button width='100%'
                        sx={{
                            visibility: props.haveAWinner ? 'visible' : 'hidden',
                            color:'pink',
                            boxShadow: "1px 1px 5px gray",
                            width: '15px',
                            fontFamily: 'sans-serif',
                        }}
                        onClick={() => props.dispatch(reset_action(props.channel))}>Reset?
                </Button>
            </Grid>
        </Box>
    </Grid>
}




export default function MTTBoard(props) {
    const [result, setResult] = useState(null);
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
            setPlayer1Name(player2);
            setPlayer2Name(player1);

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
                if (event.data.newState.identity === state.identity) {
                    console.log("Using update_Board")
                    dispatch(update_Board(event.data.newState));
                }
            }
            if (event.type === "enemy-move" && event.user.id !== client.userID){
                console.log("Received enemy move as: ", event.data);
                dispatch(updateEnemyBoard(event.data.gameMove));
            }
            if (event.type === "reset" && event.user.id !== client.userID){
                console.log("Reset action");
                dispatch(reset_board())
            }
        });
    }, [])
    console.log("You are player: ", player);
    console.log("Player 1:", player1Name, " this is player 2: ", player2Name);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Fragment>
                <Grid sx={{justifyContent:'center', alignItems:'center'}}>
            <Stack aria-label="Game Stack" column={1} sx={{width: "100%", height:"100%",
                display: 'flex',
                direction: 'flex-column',
                justifyContent: 'center',
                alignItems: 'center',

            }}>
                <TopMessage haveAWinner={haveAWinner} winningPlayer={winningPlayer} turn={turn}
                            player1={player1Name} player2={player2Name} dispatch={dispatch}
                />
                {
                    board.map((megaRow, megaRowIdx) => (
                        <Grid item
                              key={megaRowIdx}

                              sx={{height:"200px", width:"637px"}}
                              xs={1}
                        >
                            <MegaRow key={megaRowIdx}
                                     megaBoardRow={megaRow}
                                     megaRowKey={megaRowIdx}
                                     dispatch={dispatch}
                                     turn={turn}
                                     player={player}
                                     client={client}
                                     channel={channel}
                                     cookieIDName={cookieIDName}
                                     player1={player1}
                                     player2={player2}
                                     state={state}
                                />
                        </Grid>
                    ))
                }
            </Stack>
                </Grid>
            </Fragment>
        </ThemeProvider>
    );
}
