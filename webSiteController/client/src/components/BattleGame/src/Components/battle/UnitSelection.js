import { Stack, Typography } from "@mui/material"
import "../component.css"
import { set_fighter } from "../../actions"
export const UnitSelection = (props) => {
    const{curr, units, dispatch} = props
    return(
        <Stack className="selector">
            {curr === "unitName" ?
                <Typography color="white" variant="h4">
                    Select Your Fighter Below
                </Typography> :
                <Typography color="white" variant="h4">
                    Fight!
                </Typography>
            }

            {curr === "unitName" && 
                <div className="party">
                    {units[0].name === "unitName" ? <button className="hidden2">1</button>: 
                                                    <button className="hidden" onClick={()=>dispatch(set_fighter(0))}>1</button>}
                    {units[1].name === "unitName" ? <button className="hidden2">2</button>: 
                                                    <button className="hidden" onClick={()=>dispatch(set_fighter(1))}>1</button>}
                    {units[2].name === "unitName" ? <button className="hidden2">3</button>: 
                                                    <button className="hidden" onClick={()=>dispatch(set_fighter(2))}>1</button>}
                </div>
            }
        </Stack>
    )
}