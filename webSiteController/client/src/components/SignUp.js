import React, {Fragment, useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import Divider from '@mui/material/Divider';
import {TextField} from "@mui/material";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";

function SignUp({ setIsAuth }) {
    const cookies = new Cookies();
    const [user, setUser] = useState(null);

    const signUp = () => {
        Axios.post("http://localhost:3001/signup", user).then((res) => {
            const { token, userId, firstName, lastName, username, hashedPassword } =
                res.data;
            cookies.set("token", token);
            cookies.set("userId", userId);
            cookies.set("username", username);
            cookies.set("firstName", firstName);
            cookies.set("lastName", lastName);
            cookies.set("hashedPassword", hashedPassword);
            setIsAuth(true);
        });
    };
    return (
            <Fragment>
                <Stack  sx = {{xs: 'flex', alignItems: 'center', justifyContent: 'center', width:'100%' }}>

            <TextField
                placeholder="First Name"
                sx={{width:"420px", border: '1px solid', input: {color: 'black',
                        backgroundColor: "rgb(245,255,255,0.45)",}}}
                onChange={(event) => {
                    setUser({ ...user, firstName: event.target.value });
                }}
            />
            <TextField
                placeholder="Last Name"
                sx={{width:"420px", border: '1px solid', input: {color: 'black',
                        backgroundColor: "rgb(245,255,255,0.45)",}}}
                onChange={(event) => {
                    setUser({ ...user, lastName: event.target.value });
                }}
            />
            <TextField
                placeholder="Username"
                sx={{width:"420px", border: '1px solid', input: {color: 'black',
                        backgroundColor: "rgb(245,255,255,0.45)",}}}
                onChange={(event) => {
                    setUser({ ...user, username: event.target.value });
                }}
            />
            <TextField
                placeholder="Password"
                type="password"
                sx={{width:"420px", border: '1px solid', input: {color: 'black',
                        backgroundColor: "rgb(245,255,255,0.45)",}}}
                onChange={(event) => {
                    setUser({ ...user, password: event.target.value });
                }}
            />
            <Button color={'primary'} sx={{width:"420px", backgroundColor:"rgb(179,255,255,0.85)", color:"black"}} onClick={signUp}> Sign Up</Button>
                </Stack>
            </Fragment>
    );
}

export default SignUp;