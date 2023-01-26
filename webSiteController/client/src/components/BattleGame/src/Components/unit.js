import React from 'react'
import elfIdle from "./sprites/elf/Idle.png"
import elfAt from "./sprites/elf/Attack.png"
import elfDef from "./sprites/elf/Defend.png"
import humanIdle from "./sprites/human/Idle.png"
import humanAt from "./sprites/human/Attack.png"
import humanDef from "./sprites/human/Defend.png"
import hobbitIdle from "./sprites/hobbit/Idle.png"
import hobbitAt from "./sprites/hobbit/Attack.png"
import hobbitDef from "./sprites/hobbit/Defend.png"
import demonIdle from "./sprites/demon/Idle.png"
import demonAt from "./sprites/demon/Attack.png"
import demonDef from "./sprites/demon/Defend.png"
import demonDeath from "./sprites/demon/Death.png"
import skeleIdle from "./sprites/Skeleton/Idle.png"
import skeleAt from "./sprites/Skeleton/Attack.png"
import skeleDef from "./sprites/Skeleton/Defend.png"
import skeleDeath from "./sprites/Skeleton/Death.png"
import goblinIdle from "./sprites/Goblin/Idle.png"
import goblinAt from "./sprites/Goblin/Attack.png"
import goblinDef from "./sprites/Goblin/Defend.png"
import goblinDeath from "./sprites/Goblin/Death.png"
import mushroomIdle from "./sprites/Mushroom/Idle.png"
import mushroomAt from "./sprites/Mushroom/Attack.png"
import mushroomDef from "./sprites/Mushroom/Defend.png"
import mushroomDeath from "./sprites/Mushroom/Death.png"
import eyeIdle from "./sprites/Flyingeye/Idle.png"
import eyeAt from "./sprites/Flyingeye/Attack.png"
import eyeDef from "./sprites/Flyingeye/Defend.png"
import eyeDeath from "./sprites/Flyingeye/Death.png"
import {Spritesheet} from "./Spritesheet.js"

export const Unit = props => {
    const { name, anim, enemy} = props 
    let image, steps, loop, fps
    let width = 100
    let height= 100

    switch(name){
        case "Elf":
            switch(anim){
                case "Idle":
                    image = elfIdle
                    steps = 10 
                    loop = true
                    fps=12
                    break
                case "Attack":
                    image = elfAt
                    steps = 6
                    loop = true
                    fps=12
                    break
                case "Defend":
                    image = elfDef
                    steps = 3
                    loop = true
                    fps=8
                    break
                default:
                    break
            }
        break
        case "Human":
            switch(anim){
                case "Idle":
                    image = humanIdle
                    steps = 4
                    fps=10
                    loop = true
                    break
                case "Attack":
                    image = humanAt
                    steps = 4
                    loop = true
                    fps=11
                    break
                case "Defend":
                    image = humanDef
                    steps = 3
                    loop = true
                    fps=12
                    break
                default:
                    break
            }
        break
        case "Demon":
            switch(anim){
                case "Idle":
                    image = demonIdle
                    steps = 9
                    fps=12
                    loop = true
                    break
                case "Attack":
                    image = demonAt
                    steps = 22
                    fps=2
                    loop = false
                    break
                case "Defend":
                    image = demonDef
                    steps = 3
                    fps=12
                    loop = true
                    break
                case "Death":
                    image = demonDeath
                    steps = 8
                    fps=8
                    loop = false
                    break
                default:
                    break
                
            }
        break
        case "Hobbit":
            switch(anim){
                case "Idle":
                    image = hobbitIdle
                    steps = 4
                    fps=10
                    loop = true
                    break
                case "Attack":
                    image = hobbitAt
                    steps = 17
                    fps=12
                    loop = false
                    break

                case "Defend":
                    image = hobbitDef
                    steps = 4
                    fps=6
                    loop = true
                    break
                default:
                    break
                
            }
        break
        case "Skeleton":
            switch(anim){
                case "Idle":
                    image = skeleIdle
                    steps = 4
                    fps=12
                    loop = true
                    break
                case "Attack":
                    image = skeleAt
                    steps = 8
                    fps=8
                    loop = true
                    break
                case "Defend":
                    image = skeleDef
                    steps = 4
                    fps=8
                    loop = true
                    break
                case "Death":
                    image = skeleDeath
                    steps = 4
                    fps=13
                    loop = false
                    break
                default:
                    break
                
            }
        break
        case "Goblin":
            switch(anim){
                case "Idle":
                    image = goblinIdle
                    steps = 4
                    fps=12
                    loop = true
                    break
                case "Attack":
                    image = goblinAt
                    steps = 4
                    fps=8
                    loop = false
                    break
                case "Defend":
                    image = goblinDef
                    steps = 4
                    fps = 10
                    loop = true
                    break
                case "Death":
                    image = goblinDeath
                    steps = 4
                    fps = 13
                    loop = false
                    break
                default:
                    break
            }
        break
        case "Eye Bat":
            switch(anim){
                case "Idle":
                    image = eyeIdle
                    steps = 8
                    fps=12
                    loop = true
                    break
                case "Attack":
                    image = eyeAt
                    steps = 8
                    fps=10
                    loop = true
                    break

                case "Defend":
                    image = eyeDef
                    steps = 4
                    fps=8
                    loop = true
                    break
                case "Death":
                    image = eyeDeath
                    steps = 4
                    fps=8
                    loop = false
                    break
                default:
                    break
            }
        break
        case "Mushroom":
            switch(anim){
                case "Idle":
                    image = mushroomIdle
                    steps = 4
                    fps=12
                    loop = true
                    break
                case "Attack":
                    image = mushroomAt
                    steps = 8
                    fps=10
                    loop = false
                    break
                case "Defend":
                    image = mushroomDef
                    steps = 4
                    fps=12
                    loop = true
                    break
                case "Death":
                    image = mushroomDeath
                    steps = 4
                    fps=10
                    loop = false
                    break
                default:
                    break
            }
        break
    default:
        break
    }
    return (
        <Spritesheet
            image={image}
            width={width}
            height={height}
            steps={steps}
            fps={fps}
            loop={loop}
            enemy={enemy}
        />
    )
}