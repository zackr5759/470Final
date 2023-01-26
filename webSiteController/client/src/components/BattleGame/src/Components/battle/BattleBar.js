import { Stack, Typography } from "@mui/material"
import "../component.css"
export const BattleBar = (props) => {
    const{stage, enemies} = props
    return(
        <Stack className="infoBar">
            <Typography color="white" variant="h4">
                Stage: {stage}/4
            </Typography>
            <Typography color="white" variant="h6">
                Enemy: {enemies}/5
            </Typography>
        </Stack>
    )
}