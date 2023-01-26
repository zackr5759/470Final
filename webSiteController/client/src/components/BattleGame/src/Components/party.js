import { UnitCard } from "./unitCard";
import "./component.css"
import { Typography } from "@mui/material";

export const Party = (props) => {
    const {dispatch, units, gold} = props;
    return(
        <table className="party">
            <tbody>
                <tr>
                    <td>
                        <Typography color="white" style={{textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}>
                            Gold: {gold}
                        </Typography>
                    </td>
                </tr>
                <tr>
                {
                    units.map((unit, idx) => 
                        <td key={idx}>
                            <UnitCard dispatch={dispatch} unit={unit} location={'party'}/>
                        </td>
                )  
                }  
                </tr>
            </tbody>
        </table> 
    )
}