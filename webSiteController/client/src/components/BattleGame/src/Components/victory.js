import "./component.css"
import { reset } from "../actions"
import { Button, Stack, Typography } from "@mui/material"

export const Victory = (props) => {
    const {dispatch} = props;
    return (
        <Stack className="start">
            <Typography color="black" variant="h2" style={{marginBottom:200}}>
                Victory
            </Typography>
            <Button variant="contained" onClick={()=>dispatch(reset())}>Play Again?</Button>
        </Stack>
    )
}