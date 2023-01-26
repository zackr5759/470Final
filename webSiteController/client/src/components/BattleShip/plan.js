import "./Battleship.css"
import { Button, Stack, Typography } from '@mui/material';
import { Cell }  from "./Cell.js"
import { rotation, start } from "./actions";
import { ReadyCheck } from "./ReadyCheck";
import { Spritesheet } from "./Spritesheet";
import water from "./water.png"


export const Plan = (props) => {
    const {state, dispatch, channel} = props

    const labels = ['A','B','C','D','E','F','G','H','I','J']

    let direction = ""
    switch(state.rotation){
        case 0:
            direction = "right"
            break
        case 1:
            direction = "down"
            break
        case 2:
            direction = "left"
            break
        case 3:
            direction = "up"
            break

    }

    return (
        <Stack id="test">
            <Stack id="board">
                {
                //for some reason the very first sprite rendered on the page flickers so we render an invisible one first 
                }
                <Spritesheet id="hiddenSprite"
                            image={water} 
                            width={60} 
                            height={60} 
                            steps={20} 
                            fps={10} 
                            loop={true}/>
                <Typography variant="h4"> Battleship</Typography>
                <Typography variant="h5"> {state.shipsSet}/5 ships placed</Typography>
                {state.mode === 'plan' ? 
                                <Typography variant="h6"> Placed ships will currently extend {direction}</Typography> :
                                <Typography variant="h6"> Battle will start when enemy is ready!</Typography>
                
                }
                <table>
                    <tbody>
                    <tr>
                            <th className="invisible">0</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>9</th>
                            <th>10</th>
                    </tr>
                    {
                        state.board.map((row, rIdx) =>
                            <tr key={rIdx}>
                                <td>
                                    {labels[rIdx]}
                                </td>
                                {
                                    row.map((cell, cIdx) =>
                                    <td key={(cIdx)}>
                                        <Cell row={rIdx}
                                            col={cIdx}
                                            ship={cell.y}
                                            rotation={cell.z}
                                            dispatch={dispatch}
                                            hover="plan"/>
                                    </td>
                                    )
                                }
                            </tr>
                            )
                    }
                    </tbody>
                </table>
                <ReadyCheck check={state.enemyReady}/>
                <Button id="rotate" onClick={() => { dispatch(rotation())}}>Change Rotation</Button>
                {state.shipsSet === 5 && <Button id="startButton" onClick={() => { dispatch(start(state.board, channel))}}>Start Battle!</Button>}
            </Stack>
        </Stack>
    )
}
