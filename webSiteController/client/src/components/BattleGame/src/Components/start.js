import "./component.css"
import { shop_mode } from "../actions"
import { Button, Stack, Typography } from "@mui/material"
import "../font.ttf"

export const Start = (props) => {
    const {dispatch} = props;
    return (
        <Stack className="start">
            <Typography color="black" variant="h2" style={{marginBottom:200}}>
                Unit Battler
            </Typography>
            <Button variant="contained" onClick={()=>dispatch(shop_mode())}>Start Game</Button>
        </Stack>
    )
}