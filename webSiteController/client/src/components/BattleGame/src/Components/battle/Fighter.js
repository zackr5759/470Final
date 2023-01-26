import { UnitCard } from "../unitCard"
import { Stack } from "@mui/material"
import "./battle.css"

export const Fighter = (props) => {
    const{unit, dispatch} = props
    return(
        <Stack className="currFighter">
            <UnitCard unit={unit} location="fight" dispatch={dispatch} enemy={false}></UnitCard>
        </Stack>
    )
}