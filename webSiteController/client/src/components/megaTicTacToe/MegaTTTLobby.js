import React, { useState } from "react";
import {Fragment} from "react";
import MTTBoard from "./MegaTTTBoard";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';


import { Window, MessageList, MessageInput } from "stream-chat-react";
import Grid from "@mui/material/Grid";
import Image from "../../img/blackGrad.png";
function GameLobby({ channel, setChannel, setGameSelected, player1, player2, clientID, setIsSelected}) {
    const [firstConnected, setFirstConnected] = useState(null);
    const [playersJoined, setPlayersJoined] = useState(
        channel.state.watcher_count === 2
    );
    const handleFirst = () => {
        setFirstConnected(player1);
    }
    const [result, setResult] = useState({ winner: "none", state: "none" });

    channel.on("user.watching.start", (event) => {
        setPlayersJoined(event.watcher_count === 2);
    });
    if (!playersJoined) {
        if (firstConnected === null){
            handleFirst(clientID);
        }
        return <Fragment>
            <Grid align="center" sx={{justifyContent: 'center', mt: 4, mb: 4, ml: 18}}>
                <Stack direction="row">
                    <Typography variant='h4' textAlign='center'> Waiting for the other player to join...  </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                </Stack>
            </Grid>
        </Fragment>
    }

    return (
        <Fragment>
            <Box  aria-label="Box For Background" sx={{ backgroundImage: `url(${Image})`, width:"99vw", height:"90vh", backgroundSize:"cover", display: 'block', overflow: "hidden", m: 0,}}>
                <MTTBoard result={result} setResult={setResult} player1={player1} player2={player2}
                       firstConnected={firstConnected} setGameSelected={setGameSelected}
                       setIsSelected={setIsSelected} setChannel={setChannel}/>
            </Box>
    </Fragment>
    );
}

export default GameLobby;