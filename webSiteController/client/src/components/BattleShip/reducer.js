import { ActionsIcon } from "stream-chat-react";

let SHIP_SIZES = [2,3,3,4,5]

function createInitialState() {
    let board = Array(10).fill(Array(10).fill({y:"", z:0}));
    let targets = Array(10).fill(Array(10).fill({ hit:false, fired:false}));

    return {
        mode: 'plan',
        board:board,
        shipsSet:0,
        haveWinner:false,
        winnerName:"",
        rotation:0,
        enemyBoard:board,
        enemyReady:false,
        targetBoard:targets,
        playerName:"",
        enemyName:"",
        currPlayer:"",
        fightText:"",
        hitTotal:0,
        hits1:0,
        hits2:0,
        hits3:0,
        hits4:0,
        hits5:0,
        sunk:[false,false,false,false,false]
    };
}

function rotationMods(state){
    let rotation = state.rotation
    let rowMod, colMod
    switch(rotation){
        case 0:
            rowMod = 0
            colMod = 1
            break
        case 1:
            rowMod = 1
            colMod = 0
            break
        case 2:
            rowMod = 0
            colMod = -1
            break
        case 3:
            rowMod = -1
            colMod = 0
            break
    }
    return [rowMod, colMod]
}


function validPlacement(state, row, col){
    let mods = rotationMods(state)
    let rowMod = mods[0], colMod = mods[1]

    let board = state.board.slice()
    for(let i = 0; i < SHIP_SIZES[state.shipsSet]; i++){
        if(row+(i*rowMod) < 0 || row+(i*rowMod) > 9 || col+(i*colMod) < 0 || col+(i*colMod) > 9)
            return false
        let newRow = board[row+(i*rowMod)].slice()
        if(newRow[col+(i*colMod)].y !== "") 
            return false
    }
    return true
}

function placeShip(state, row, col){
    let mods = rotationMods(state)
    let rowMod = mods[0], colMod = mods[1]

    let board = state.board.slice()

    for(let i = 0; i < SHIP_SIZES[state.shipsSet]; i++){
        let newRow = board[row+(i*rowMod)].slice()
        newRow[col+(i*colMod)] = {
            y:`Ship${state.shipsSet+1}_${i+1}`,
            z:state.rotation
        }
        board[row+(i*rowMod)] = newRow
    }

    let ships = state.shipsSet+1
    return {
        ...state,
        board:board,
        shipsSet:ships,
        shipsleft:state.shipsLeft+1,
        cursor:state.cursor+1
        
    }
}

function checkShips(state, text){
    if(state.hits1 === SHIP_SIZES[0] && !state.sunk[0]){
        document.getElementById('one').style.backgroundColor = 'red';
        state.sunk[0] = true
        return `destroyer sunk by ${state.playerName}`
    }
    if(state.hits2 === SHIP_SIZES[1] && !state.sunk[1]){
        document.getElementById('two').style.backgroundColor = 'red';
        state.sunk[1] = true
        return `cruiser sunk by ${state.playerName}`
    }
    if(state.hits3 === SHIP_SIZES[2] && !state.sunk[2]){
        document.getElementById('three').style.backgroundColor = 'red';
        state.sunk[2] = true
        return `submarine sunk by ${state.playerName}`
    }
    if(state.hits4 === SHIP_SIZES[3] && !state.sunk[3]){
        document.getElementById('four').style.backgroundColor = 'red';
        state.sunk[3] = true
        return `battleship sunk by ${state.playerName}`
    }
    if(state.hits5 === SHIP_SIZES[4] && !state.sunk[4]){
        document.getElementById('five').style.backgroundColor = 'red';
        state.sunk[4] = true
        return `carrier sunk by ${state.playerName}`
    }
    return text
}

function attack(state, row, col, channel){
    let target = state.enemyBoard.slice()
    let targetRow = target[row].slice()
    //hit or miss = invalid move
    if(targetRow[col].y === "xmark" || targetRow[col].y === "checkmark")
        return state
    //no type = miss
    if(targetRow[col].y === ""){
        targetRow[col] = {
            y:"xmark",
            x:0
        }
        target[row] = targetRow
        let text = `${state.playerName} has missed`
        sendAttack(target, text, state.haveWinner, channel)
        return {
            ...state,
            enemyBoard:target,
            currPlayer:state.enemyName,
            fightText:text
        }
    }
    //otherwise it's a hit, we can grab the ship number from its type with targetRow[col].y[4]
    else{
        let shipNum = parseInt(targetRow[col].y[4])
        let text = ""
        switch(shipNum){
            case 1:
                state.hits1 += 1
                text = `destroyer hit by ${state.playerName}`
                break
            case 2:
                state.hits2 += 1
                text = `cruiser hit by ${state.playerName}`
                break
            case 3:
                state.hits3 += 1
                text = `submarine hit by ${state.playerName}`
                break
            case 4:
                state.hits4 += 1
                text = `battleship hit by ${state.playerName}`
                break
            case 5:
                state.hits5 += 1
                text = `carrier hit by ${state.playerName}`
                break
        }
        text = checkShips(state, text)
        targetRow[col] = {
            y:"checkmark",
            x:0
        }
        target[row] = targetRow
        if(state.hitTotal+1 === 17){
            state.haveWinner = true
            state.winnerName = state.playerName
        }
        sendAttack(target, text, state.hitTotal === 16, channel)
        return {
            ...state,
            enemyBoard:target,
            hitTotal:state.hitTotal+1,
            fightText:text,
            currPlayer:state.enemyName
        }

    }

    
}

async function sendReset(channel){
    await channel.sendEvent({
        type: "reset"
    })
};

async function sendBoard(board, channel){
    await channel.sendEvent({
        type: "board",
        board:board
    })
};

async function sendAttack(board, text, win, channel){
    await channel.sendEvent({
        type: "attack",
        board:board,
        text:text,
        win:win
    })
};


function reducers(state, action) {
    if( state === undefined )
        return state;

    

    if( action.type === 'RESTART' ) {
        sendReset(action.channel)
        let newState = createInitialState()
        return {
            ...newState,
            playerName:state.playerName,
            currPlayer:state.playerName
        }
    }

    if( action.type === 'RESET' ) {
        let newState =  createInitialState()
        return {
            ...newState,
            playerName:state.playerName,
            currPlayer:state.enemyName
        }
    }
    if(state.haveWinner)
        return state

    if( action.type === 'SET' ) {
        return {
            ...state,
            playerName:action.myName,
            enemyName:action.enemyName,
            currPlayer:action.first
        }
    }

    if(action.type === "PLACE"){
        if(state.shipsSet >= 5)
            return state
        if(!validPlacement(state, action.row, action.col))
            return state
        return placeShip(state, action.row, action.col)
    }

    if( action.type === 'ROTATE' ) {
        if(state.rotation === 3)
            state.rotation = -1
        return {
            ...state,
            rotation:state.rotation+1
        }
    }

    if( action.type === 'START' ) {
        sendBoard(action.board, action.channel)
        return {
            ...state,
            mode:"battle"
        }
    }

    if( action.type === 'SET_eBOARD' ) {
        return {
            ...state,
            enemyReady:true,
            enemyBoard:action.board
        }
    }

    if( action.type === 'HIT' ) {
        if(action.win){
            return {
                ...state,
                board:action.board,
                currPlayer:state.playerName,
                fightText:action.text,
                haveWinner:true,
                winnerName:state.enemyName
            }
        }
        return {
            ...state,
            board:action.board,
            currPlayer:state.playerName,
            fightText:action.text
        }
    }

    if( action.type === 'ATTACK' ) {
        if(state.currPlayer !== state.playerName)
            return state
        return attack(state, action.row, action.col, action.channel)
    }
}

export {
    reducers,
    createInitialState,
}