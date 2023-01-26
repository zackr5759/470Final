import { Box } from "@mui/system"
import { red } from "@mui/material/colors"
import "./Battleship.css"
import { Stack, Typography } from "@mui/material"

export const ReadyCheck = (props) => {
    const {check} = props
    let id = "Check1"
    if(check)
        id = "Check2"
    return(
        <Stack id="readyCheck">
                Enemy Ready?
            <Box id={id} sx={{width:60, height:55}}/>
        </Stack>
    )
}
