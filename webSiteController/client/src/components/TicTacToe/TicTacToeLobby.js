import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import CustomInput from "./../CustomInput";
import Game from "./ticTacToeGameController";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import "./JoinPentago.css"
function TicTacToeLobby(props) {
    const [rivalUsername, setRivalUsername] = useState("");
    const { client } = useChatContext();
    const {setGameSelected, setIsSelected} = props;
    const [channel, setChannel] = useState(null);
    const [player2, setPlayer2] = useState(null);
    const createChannel = async () => {
        const response = await client.queryUsers({ name: { $eq: rivalUsername } });

        if (response.users.length === 0) {
            props.setGameSelected(false);
            alert("User not found");
            return;
        }

        const newChannel = await client.channel("messaging", {
            members: [client.userID, response.users[0].id],
        });

        await newChannel.watch();
        setPlayer2(response.users[0].id);
        setChannel(newChannel);
    };
    return (
        <>
            {channel ? (
                <Channel channel={channel} Input={CustomInput}>
                    <Game channel={channel} setChannel={setChannel} setGameSelected= {setGameSelected}
                          player1={client._user['name']} player2={rivalUsername} clientID={client.userID}
                           setIsSelected={setIsSelected}/>
                </Channel>
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
                        Tic Tac Toe (2 Player):
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
                        Two players take turns to complete a row, a column, or a diagonal with either
                        three O's or three X's drawn on a 3 x 3 board.
                    </Typography>
                    <Button onClick={() => {createChannel(); props.setGameSelected(true)}}> Join Game</Button>
                    <TextField
                        placeholder="Username of rival..."
                        onChange={(event) => {
                            setRivalUsername(event.target.value);
                        }}
                    />

                </div>
            ) : null}
        </>
    );
}

export default TicTacToeLobby;