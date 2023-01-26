import React, {Fragment, useReducer, useEffect, useState} from 'react';
import { click_on_cell_action, reset_action, board_reshape, game_hint } from './actions';
import { reducers, createInitialState } from './reducers';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";
import Stack from '@mui/material/Stack'
import ButtonGroup from "@mui/material/ButtonGroup";
import {styled} from "@mui/material";
import { keyframes } from '@emotion/react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {CssBaseline, Divider} from "@mui/material";
import {green} from "@mui/material/colors";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

// const flicker =keyframes` from, 0%,8%, 22%, 25%, 53%, 57%, 100%, to {
//     textShadow: "0 0 4px #fff,\n" +
//     "0 0 15px #fff,\n" +
//     "0 0 19px #fff,\n" +
//     "0 0 40px #0fa,\n" +
//     "0 0 80px #0fa,\n" +
//     "0 0 90px #0fa,\n" +
//     "0 0 100px #0fa,\n" +
//    " 0 0 150px #0fa;"
// }
//     20%, 24%, 55% {
//       textShadowshadow: none;
//     }})
// `

let config = {
    num_rows: 6,
    num_columns: 6,
    h_gap:4,
    cell_width: 50,
    cell_height: 50
}


function Cell(props) {
    const { dispatch, cell, colIdx, rowIdx} = props;

    return (
        <Box sx={{
            width: config.cell_width,
            height: config.cell_height,
            backgroundColor: cell['color'],
            border: 1,
            borderColor: 'black',
            borderRadius: '2',
            boxShadow: "1px 2px 5px gray, 4px 4px 16px blue"

            // textShadow: "0 0 7px #fff,\n" +
            //     // "    0 0 15px #fff,\n" +
            //     "    0 0 24px #fff,\n" +
            //     "    0 0 42px #0fa,\n" +
            //     "    0 0 52px #0fa,\n" +

        }}
             onClick={() => dispatch(click_on_cell_action(colIdx, rowIdx, cell['color']))}
        />
    );
}

function Row(props) {
    const {cell, dispatch } = props;
    // console.log("In row: ", props);
    return (
        <Grid container
              conlumns={props.row.length}
              sx={{
                  display: 'flex',
                  direction: 'flex-row',
                  alignContent: 'space-between',
                  justifyContent: 'space-between'
              }}

        >
            {
                props.row.map((cell, idx) =>
                    <Grid item
                          key={idx}
                    >
                        <Cell key={idx}
                              cell={cell}
                              colIdx={idx}
                              rowIdx={props.rowIdx}
                              dispatch={dispatch}
                        />
                    </Grid>)
            }
        </Grid>
    )
}

function TopMessage(props) {

    const {haveAWinner, winnerColor, resetClick} = props;

    const Title = () =>  "Lights Out";
    const firstMessage = () => haveAWinner ? `You Won. Game Over` : ``;
    return (
        <Stack width='100%' sx={{mt:-8}}>
            <Typography variant='h4' textAlign='center' sx={{fontWeight: "bold",
                // animation: `${flicker} 1s ease`,
                textShadow: "0 0 7px #fff,\n" +
                    // "    0 0 15px #fff,\n" +
                    "    0 0 24px #fff,\n" +
                    "    0 0 32px #0fa,\n" +
                    "    0 0 42px #0fa,\n" +
                    "    0 0 52px #0fa;"}}>
                {
                    Title()

                }
            </Typography>
            <Typography variant='h6' textAlign='center'>
                {
                    firstMessage()

                }
            </Typography>

            <Grid align="center" sx={{justifyContent: 'center', }}>
                <Button
                        sx={{mt: 3, boxShadow: "1px 1px 5px green", maxWidth: '30px', maxHeight: '60px',
                            minWidth: '60px', minHeight: '30px', color: 'green',

                            // textShadow: "0 0 7px #d32f2f,\n" +
                            // "    0 0 10px #e53935,\n" +
                            // "    0 0 21px #f44336,\n" +
                            // "    0 0 42px #ef5350,\n" +
                            // "    0 0 52px #e57373,\n" +
                            // "    0 0 72px #ef9a9a;",
                            textTransform: 'none',
                        }}
                        onClick={() => {
                            props.dispatch(reset_action())
                            props.resetClick()
                        }
                        }><Typography style={{ textTransform: 'none' }}>Reset</Typography>
                </Button>
            </Grid>

        </Stack>
    )
}

function ChangeBoardState(props) {

    return (
        <Fragment>
            <ButtonGroup>
            <Button sx={{fontWeight: "bold", color: 'black', boxShadow: "1px 1px 5px gray", padding : 2, backgroundColor: "#A5FFC9",}} onClick={() => {props.dispatch(board_reshape(5, 5))
                                    props.resetClick()}}>
                5x5
            </Button>
            <Button sx={{fontWeight: "bold", color: 'black', boxShadow: "1px 1px 5px gray", backgroundColor: "#fdff85",}} onClick={() => {props.dispatch(board_reshape(6, 6))
                                    props.resetClick()}}>
                6x6
            </Button>
            <Button sx={{fontWeight: "bold", color: 'black', boxShadow: "1px 1px 5px gray", backgroundColor: "#FF7979",}} onClick={() => {props.dispatch(board_reshape(10, 10))
                                    props.resetClick()}}>
                10x10
            </Button>
        </ButtonGroup>
        </Fragment>

    )
}


export default function LightsOut(props) {

    const [state, dispatch] = useReducer(reducers, undefined, createInitialState);
    const {clickCount, boardTime, boardActive, haveAWinner, board, boardAttributes} = state;

    const calcWidth = () => boardAttributes[1] * config.cell_width +
        (boardAttributes[1] - 1) * config.h_gap
    console.log("calcwidth: ", calcWidth());
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(true);

    function toggle() {
        setIsActive(!isActive);
    }

    function reset() {
        setSeconds(0);
        setIsActive(true);
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);


    useEffect( () => {
        if (haveAWinner){
            toggle();
        }
    }, [haveAWinner]);


    // useEffect( () => {
    //     config['num_rows'] = state.boardAttributes[0];
    //     config['num_columns'] = state.boardAttributes[1];
    // }, [state.boardAttributes]);



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
                      mt: 10
                  }}
            >

                    <TopMessage
                                haveAWinner={haveAWinner}
                                dispatch={dispatch}
                                resetClick = {reset}
                    />

                    <Box sx={{boxShadow: "0px 0px 7px pink, 0 0 10px #fff, 0 0 12px #fff", border: "2px solid", mt: 2, borderColor: 'white'}}>
                        <Grid item sx={{mb: 1}}>
                {
                    board.map((row, rowIdx) => (
                        <Grid item
                              key={rowIdx}
                              width='100%'
                              sx={{mb: -1}}
                              xs={1}
                        >
                            <Row key={rowIdx}
                                 row={row}
                                 rowIdx={rowIdx}
                                 dispatch={dispatch}
                            />
                        </Grid>))
                }
                </Grid>
                    </Box>
            </Grid>
        <Grid                   sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 3
        }}>
            <Grid>
                <Typography variant='h7' textAlign='center' sx={{
                    // animation: `${flicker} 1s ease`,
                    whiteSpace: "pre-wrap",
                    textShadow: "0 0 7px #fff,\n" +
                        "    0 0 22px #0fa;"
                }}>
                    Clicks: {state.clickCount}  Time: {Math.floor(seconds / 60)} minutes {seconds % 60} seconds


                </Typography>
            </Grid>





            {/*<Grid sx = {{ml : 1}}>  Time passed: {Math.floor(seconds / 60)} minute {seconds % 60} seconds</Grid>*/}

        </Grid>
            <Grid sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 1}} >
                <ChangeBoardState
                    dispatch={dispatch}
                    resetClick = {reset}
                />
            </Grid>

            <Grid sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 2,
                mb: 2,
            }}>
                <Button  sx = {{boxShadow: "1px 1px 5px yellow", color: "yellow"}} onClick={() => {dispatch(game_hint())}}>
                    Hint
                </Button>



            </Grid>
            <Grid sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 2,
                mb: 2,
                }}>
                <Button  sx = {{boxShadow: "1px 1px 5px red", color: "red"}} onClick={() => {props.setGameSelected(false);
                                        props.setIsSelected(null)}}>
                    Leave Game
                </Button>
            </Grid>
        </Fragment>
    </ThemeProvider>
    );
}

