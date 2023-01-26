import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import CustomInput from "./../CustomInput";
import BattleShipGameLobby from ".//BattleShipGameLobby";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography";
import "../TicTacToe/JoinPentago.css"
function MegaTTTPlaceHolder(props) {
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
                <Box sx={{border:'4px solid'}}>
                <Channel channel={channel} Input={CustomInput}>
                    <BattleShipGameLobby channel={channel} setChannel={setChannel} setGameSelected= {setGameSelected}
                               player1={client._user['name']} player2={rivalUsername} clientID={client.userID}
                               setIsSelected={setIsSelected}/>
                </Channel>
                </Box>
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
                        Battle Ship (2 Player):
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
                        Two players create a board with ships in chosen positions on a board grid. After board setup
                        players take turns guessing the location of the other player's ship.

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

export default MegaTTTPlaceHolder;