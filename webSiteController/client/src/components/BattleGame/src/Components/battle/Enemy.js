import { Stack } from "@mui/material"
import { UnitCard } from "../unitCard"
import "./battle.css"

export const Enemy = (props) => {
    const{enemy, dispatch} = props
    return(
        <Stack className="enemy">
            <UnitCard unit={enemy} location="enemy" dispatch={dispatch} enemy={true}></UnitCard>
        </Stack>
    )
}