import { Party } from "../party"
import { BattleBar } from "./BattleBar"
import { Enemy } from "./Enemy"
import { Fighter } from "./Fighter"
import { UnitSelection } from "./UnitSelection"
import "./battle.css"
import { Log } from "./log"
import { Stack } from "@mui/material"
import { Floor } from "./floor"
import { advance_enemy, advance_stage, attack, defend, fighter_death } from "../../actions"
import { useState } from "react"
import { Unit } from "../unit"
import { grey } from '@mui/material/colors';
import elfIdle from "../sprites/elf/Idle.png"
import { Spritesheet } from "../Spritesheet"

export const Battle = (props) => {
    const{state, dispatch} = props

    let unit = state.currFighter
    let id = "battle" + `${state.stage}`
    let check = unit.name !== "unitName"
    const [fAnim, setfAnim] = useState(state.fAnimation)
    const [eAnim, seteAnim] = useState(state.eAnimation)
    const [ID, setID] = useState("logButtons")


    const primary = grey[900]; // #f44336

    function changeAnims(f, e, time){
        setID("logButtonsH")
        setTimeout(() => {
            if(e === "Attack" && state.enemy.currHP <= 0){
                f = "Idle"
                e = "Death"
            }
          }, 100)
        setTimeout(() => {
            if(e === "Idle")
                setID("logButtons")
            setfAnim(f)
            seteAnim(e)
          }, 750*time)
    }

    function advanceEnemy(time){
        setTimeout(() => {
            if (state.currFighter.currHP <= 0)
                return dispatch(fighter_death())
            if(state.enemy.currHP > 0){
                return
            }
            else if (state.enemies >= 5)
                return dispatch(advance_stage())
            else{
                return dispatch(advance_enemy())
             }
        }, 800*time-1)
    }
    

    return(
        <Stack id={id} className="battle">
            <Spritesheet className="invisible"
            image={elfIdle}
            width={100}
            height={100}
            steps={5}
            fps={5}
            loop={true}
            enemy={true}
            />
            <BattleBar stage={state.stage} enemies={state.enemies}/>
            <Enemy dispatch={dispatch} enemy={state.enemy} animation={eAnim}/>
            <Fighter unit={state.currFighter} dispatch={dispatch} animation={fAnim}/>
            <div className="fightScene">
                <Stack className="eSprite">
                    <Unit dispatch={dispatch} name={state.enemy.name} anim={eAnim}/>
                </Stack>
                <Stack className="fSprite">
                    {unit.name !== "unitName" && <Unit dispatch={dispatch} name={unit.name} anim={fAnim}/>}
                </Stack>
                <Floor/>
            </div>
            <Party dispatch={dispatch} units={state.units} gold={state.gold}></Party>
            <UnitSelection curr={state.currFighter.name} units={state.units} dispatch={dispatch}/>
            <Log log={state.fightText}/>
            <Stack id={ID}>
                {      
                    check && <button className="options" onClick={()=>{dispatch(attack())
                                                                      changeAnims("Attack","Defend",0)
                                                                      changeAnims("Defend","Attack",1)
                                                                      changeAnims("Idle","Idle",2)
                                                                      advanceEnemy(2)        
                                                                                        }}> Attack </button>
                }
                {
                    check && <button className="options" onClick={()=>{dispatch(defend())
                                                                      changeAnims("Defend","Attack",0)
                                                                      changeAnims("Idle","Idle",1)
                                                                      advanceEnemy(1)
                                                                                        }}> Defend </button>
                }
            </Stack>
        </Stack>
    )
}