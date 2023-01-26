import { Typography } from "@mui/material"
import { Stack } from "@mui/system"
import "../component.css"

export const Log = (props) => {
    const {log} = props

    return (
        <Stack id="log">
            {
                log.map((message, idx) => 
                    <Typography key={idx}>
                        {message}
                    </Typography>
            )  
            } 
        </Stack>
    )
}