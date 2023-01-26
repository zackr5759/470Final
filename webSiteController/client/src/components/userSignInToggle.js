import * as React from 'react';
import {Fragment} from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import LoginIcon from '@mui/icons-material/Login';
import AddIcon from '@mui/icons-material/Add';

import Login from "./Login";
import SignUp from "./SignUp";
import Typography from "@mui/material/Typography";

export default function ToggleButtonNotEmpty({ setIsAuth }) {
    const [alignment, setAlignment] = React.useState("login");

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };


    return (
        <Fragment>

        <Stack direction="row" sx = {{ alignItems: 'center', justifyContent: 'center', width:"100%"}}>
            <ToggleButtonGroup
                sx={{ width: '420px',}}
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"

            >
                <ToggleButton value="login" aria-label="login"  sx={{color:'black', width:"50%", backgroundColor: "rgb(245,255,255,0.55)",}}>
                    <Typography>
                        Login
                    </Typography>
                </ToggleButton>

                <ToggleButton value="signup" aria-label="sign up" sx={{color:'black', width:"50%", fontFamily: 'monospace',
                    fontWeight: 500, backgroundColor: "rgb(245,255,255,0.55)",}}>
                    <Typography>
                        Signup
                    </Typography>
                </ToggleButton>

            </ToggleButtonGroup>

        </Stack>
            <Box sx = {{ }}>
            {alignment === "login" && <Login setIsAuth={setIsAuth}/>}
            {alignment === "signup" && <SignUp setIsAuth={setIsAuth} />}
            </Box>
        </Fragment>
    );
}
