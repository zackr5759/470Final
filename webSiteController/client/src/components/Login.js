import React, {Fragment, useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {TextField} from "@mui/material";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
function Login({ setIsAuth }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const cookies = new Cookies();
    const login = () => {
        Axios.post("http://localhost:3001/login", {
            username,
            password,
        }).then((res) => {
            const { firstName, lastName, username, token, userId } = res.data;
            cookies.set("token", token);
            cookies.set("userId", userId);
            cookies.set("username", username);
            cookies.set("firstName", firstName);
            cookies.set("lastName", lastName);
            console.log("in here", res.data);
            if (res.data['message'] !== 'User not found'){
                setIsAuth(true);
            }

        });
    };
    return (
        <Fragment>
            <Stack direction="column"  sx = {{ alignItems: 'center', justifyContent: 'center',width:"100%" }}>

            <TextField
                variant="outlined"
                placeholder="Username"
                sx={{width:"420px", border: '1px solid', textColor: 'yellow',
                    font:'15', backgroundColor: "rgb(245,255,255,0.49)",
                    input: {color: 'black', } }}
                onChange={(event) => {
                    setUsername(event.target.value);
                }}
            />
            <TextField
                placeholder="Password"
                type="password"
                sx={{width:"420px", border: '1px solid', input: {color: 'black',
                        backgroundColor: "rgb(245,255,255,0.49)",}}}
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />

            <Button color={'primary'} sx={{width:"420px", backgroundColor:"rgb(179,255,255,0.85)", color:"black"}} onClick={login}> Submit</Button>
            </Stack>
        </Fragment>
    );
}

export default Login;