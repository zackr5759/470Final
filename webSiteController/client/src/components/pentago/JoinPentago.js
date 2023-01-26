import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import CustomInput from "./../CustomInput";
import PentagoGame from "./PentagoGame";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import "./JoinPentago.css"
function JoinPentago(props) {
    const [rivalUsername, setRivalUsername] = useState("");
    const { client } = useChatContext();
    const [channel, setChannel] = useState(null);
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
        setChannel(newChannel);
    };
    return (
        <>
            {channel ? (
                <Channel channel={channel} Input={CustomInput}>
                    <PentagoGame channel={channel} setChannel={setChannel} setGameSelected ={props.setGameSelected}/>
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
                        Pentago (2 Player):
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
                        Pentago is an abstract strategy game for two players with four 3×3
                        grids arranged into a larger 6×6 grid. This game reimplements the well known Connect 4 with a twist: After placing a marble, the player has to twist one of the grids by 90°, thus changing the board after every turn.
                    </Typography>
                    <Button onClick={() => {createChannel(); props.setGameSelected(true)}}> Join Game</Button>
                    <TextField
                        placeholder="Username of pentago rival..."
                        onChange={(event) => {
                            setRivalUsername(event.target.value);
                        }}
                    />

                </div>
            ) : null}
        </>
    );
}

export default JoinPentago;