import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ToggleButtonNotEmpty from "./components/userSignInToggle";
import Button from '@mui/material/Button';
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { useState} from "react";
import JoinPentago from "./components/pentago/JoinPentago";
import LightsOutPlaceHolder from "./components/lightsOut/LightsOutPlaceHolder";
import BattleGamePlaceHolder from "./components/BattleGame/src/BattleGamePlaceholder";
import TicTacToeLobby from "./components/TicTacToe/TicTacToeLobby";
import PlaceHolderGame from "./components/PlaceHolder";
import MegaTTTPlaceHolder from "./components/megaTicTacToe/MegaTTTPlaceHolder";
import BattleShipPlaceHolder from "./components/BattleShip/BattleShipPlaceHolder";
import LoteriaGame from "./components/Loteria/LoteriaPlaceHolder";
import GuessingGame from "./components/GuessingGame/GuessingGamePlaceHolder";

import React, {Fragment} from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {CssBaseline, Divider} from "@mui/material";
import ResponsiveAppBar from "./components/AppBar";

import Paper from '@mui/material/Paper';

import Image from './img/img.png';



const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
  const api_key = "ujt9j62cn6xx";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);

  const [gameSelected, setGameSelected] = useState(false);
  const [isSelected, setIsSelected] = useState(null);



  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

  if (token) {
    client
        .connectUser(
            {
              id: cookies.get("userId"),
              name: cookies.get("username"),
              firstName: cookies.get("firstName"),
              lastName: cookies.get("lastName"),
              hashedPassword: cookies.get("hashedPassword"),
            },
            token
        )
        .then((user) => {
          setIsAuth(true);
        });

  }




  return (
      <ThemeProvider theme={darkTheme}>
          <CssBaseline />
      <Fragment>

          <ResponsiveAppBar accountLogOut = {logOut} displayProfile = {isAuth}
                            setGameSelected={setGameSelected}
                            setIsSelected={setIsSelected}/>
        {isAuth ? (
            <Stack direction="column"  sx = {{xs: 'flex', alignItems: 'center', justifyContent: 'center'}}>

                <Box  sx={{  width: '100%'}}>
                    <Chat client={client}>
                        <JoinPentago gameSelected={gameSelected} setGameSelected={setGameSelected}
                                 isSelected={isSelected} setIsSelected={setIsSelected}/>
                    </Chat>
                </Box>


                <Box sx = {{width: '100%'}}>
                    <LightsOutPlaceHolder gameSelected={gameSelected} setGameSelected={setGameSelected}
                                            isSelected={isSelected} setIsSelected={setIsSelected}/>
                </Box>

                <Box sx = {{width: '100%'}}>
                    <BattleGamePlaceHolder gameSelected={gameSelected} setGameSelected={setGameSelected}
                                            isSelected={isSelected} setIsSelected={setIsSelected}/>
                </Box>






                <Box sx = {{width: '100%'}}>
                    <Chat client={client}>
                        <BattleShipPlaceHolder gameSelected={gameSelected} setGameSelected={setGameSelected}
                                        isSelected={isSelected} setIsSelected={setIsSelected}/>
                    </Chat>
                </Box>

                <Box sx = {{width: '100%'}}>

                    <Chat client={client}>
                    <TicTacToeLobby gameSelected={gameSelected} setGameSelected={setGameSelected}
                                    isSelected={isSelected} setIsSelected={setIsSelected}/>
                    </Chat>
                </Box>

                <Box sx = {{width: '100%'}}>

                    <Chat client={client}>
                        <MegaTTTPlaceHolder gameSelected={gameSelected} setGameSelected={setGameSelected}
                                        isSelected={isSelected} setIsSelected={setIsSelected}/>
                    </Chat>
                </Box>




                {/*<Box sx = {{width: '100%'}}>*/}

                {/*    <LoteriaGame gameSelected={gameSelected} setGameSelected={setGameSelected}*/}
                {/*                     isSelected={isSelected} setIsSelected={setIsSelected}/>*/}
                {/*</Box>*/}


                {/*<Box sx = {{width: '100%'}}>*/}
                {/*    <GuessingGame gameSelected={gameSelected} setGameSelected={setGameSelected}*/}
                {/*                     isSelected={isSelected} setIsSelected={setIsSelected}/>*/}
                {/*</Box>*/}



                </Stack>
        ) : (
            <Box aria-label="Box For Background" sx={{ backgroundImage: `url(${Image})`, width:"99vw", height:"97vh", backgroundSize:"cover", display: 'block', overflow: "hidden", m: 0,}}>
                <Grid  aria-label="Grid Container" container sx={{position:'absolute', border: '1', width:'100%', height:'90%', justifyContent: 'center', alignItems:'center'}}>
                    <Grid item xs={8} sx={{
                        }}>
                        <ToggleButtonNotEmpty setIsAuth={setIsAuth} />
                    </Grid>

                </Grid>
            </Box>

        )
        }
      </Fragment>
      </ThemeProvider>
  );
}

export default App;