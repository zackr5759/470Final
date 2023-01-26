import {NUM_ROWS} from "./constantsPentago";
import doWeHaveAWinner from "./doWeHaveAWinner";

const  advanceColor = (color) => color === 'black' ? 'white' : 'black';

function createInitialState() {
    // The board is a 2D array of Objects. Each Object holds the state of the "cell" that it represents.
    // Each of the elements of firstAvailableIndex contains an index for each column of the 2D array.
    // The value at the index specifies which row in that column a disk can be deposited.

    let board = Array(NUM_ROWS).fill(Array(6).fill({color: 'gray', isOccupied: false}));
    board.map((row, rowIdx) => row.map( (col, colIdx) => {
        return {...board[rowIdx][colIdx], row: rowIdx, column: colIdx }
    }));


    return {
        board,
        hasRotated: false,
        quadrantToRotate: -1,
        haveAWinner: false,
        nextColor: 'black',
        timeToRotate: false,
        playerColor: '',

    };
}

async function sendState(newState, channel){
    await channel.sendEvent({
        type: "game-move",
        data: {newState},
    })
};

function quadrantOffsets(quadrant){

    let iOffset, jOffset;
    switch(quadrant){
        case 0:
            iOffset = 0;
            jOffset = 0;
            break;
        case 1:
            iOffset = 0;
            jOffset = 3;
            break;
        case 2:
            iOffset = 3;
            jOffset = 0;
            break;
        case 3:
            iOffset = 3;
            jOffset = 3;
            break;
        default:
            console.log("quadrant did not recieve a quadrant value")
    }
    return [iOffset, jOffset];
}

function quadrantsIdentical(quadOne, quadTwo){
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++)
            if(quadOne[i][j].color !== quadTwo[i][j].color)
                return false;
    return true
}

function anyQuadrantsSymmetrical(inboard){
    let symmetry = false;
    let board = JSON.parse(JSON.stringify(inboard));
    let tempBoard = Array(3);
    let tempBoardR = Array(3);

    let offsets;
    let iOffset, jOffset;

    for(let i = 0; i < 4; i++){

        offsets = quadrantOffsets(i);
        iOffset = offsets[0];
        jOffset = offsets[1];

        tempBoard[0] = board[0+iOffset].slice(0+jOffset,3+jOffset);
        tempBoard[1] = board[1+iOffset].slice(0+jOffset,3+jOffset);
        tempBoard[2] = board[2+iOffset].slice(0+jOffset,3+jOffset);

        tempBoardR[0] = board[0+iOffset].slice(0+jOffset,3+jOffset);
        tempBoardR[1] = board[1+iOffset].slice(0+jOffset,3+jOffset);
        tempBoardR[2] = board[2+iOffset].slice(0+jOffset,3+jOffset);
        rotateClockwise(tempBoardR)

        if(quadrantsIdentical(tempBoard, tempBoardR)){
            symmetry = true;
        }
    }
    return symmetry

}

function integrateClick(state, colIdx, rowGroup, channel) {
    let nextTurn = (state.player === "black" ? "white" : "black");

    let board = state.board;
    let affectedRow = board[rowGroup].slice();
    affectedRow[colIdx] = {
        ...affectedRow[colIdx],
        color: state.nextColor,
        isOccupied: true
    };
    let newBoard = board.slice();
    newBoard[rowGroup] = affectedRow;
    const activeColor = state.nextColor;


    if (state.playerColor === ''){
        state.playerColor = state.nextColor
    }

    let newState = {
        ...state,
        board: newBoard,
        timeToRotate: true,
        turn: nextTurn
    };



    if( doWeHaveAWinner(rowGroup, colIdx, activeColor, board) ) {
        newState = {
            ...newState,
            haveAWinner: true,
            winnerColor: activeColor
        };
    }

    if(!anyQuadrantsSymmetrical(newBoard))
        document.getElementById('skipButton').style.visibility = 'hidden';

    else
        document.getElementById('skipButton').style.visibility = 'visible';

    
    sendState(newState, channel);

    return newState;
}

function rotateCounterClockwise(arrayToRotate){
    var arraySize = arrayToRotate.length;
    for (var i = 0; i < arraySize / 2; i++) {
        for (var j = i; j < arraySize - i - 1; j++) {
            var tmp = arrayToRotate[i][j];
            arrayToRotate[i][j] = arrayToRotate[j][arraySize-i-1];
            arrayToRotate[j][arraySize-i-1] = arrayToRotate[arraySize-i-1][arraySize-j-1];
            arrayToRotate[arraySize-i-1][arraySize-j-1] = arrayToRotate[arraySize-j-1][i];
            arrayToRotate[arraySize-j-1][i] = tmp;
        }
    }
    return arrayToRotate;
}

function rotateClockwise(arrayToRotate) {
    var arraySize = arrayToRotate.length;
    for (var i=0; i<arraySize/2; i++) {
        for (var j = i; j < arraySize - i - 1; j++) {
            var tmp = arrayToRotate[i][j];
            arrayToRotate[i][j] = arrayToRotate[arraySize-j-1][i];
            arrayToRotate[arraySize-j-1][i] = arrayToRotate[arraySize-i-1][arraySize-j-1];
            arrayToRotate[arraySize-i-1][arraySize-j-1] =arrayToRotate[j][arraySize-i-1];
            arrayToRotate[j][arraySize-i-1] = tmp;
        }
    }
    return arrayToRotate;
}

function integrateRotation(state, direction, channel) {
    var rowIndexColumnIndex = [];
    var rowManual = [];
    switch(state.quadrantToRotate){
        case "Top Left":
            rowIndexColumnIndex = [0, 3, 0, 3];
            rowManual = [0, 1, 2];
            break;
        case "Top Right":
            rowIndexColumnIndex = [0, 3, 3, 6];
            rowManual = [0, 1, 2];
            break;
        case "Bottom Left":
            rowIndexColumnIndex = [3, 6, 0, 3];
            rowManual = [3, 4, 5];
            break;
        case "Bottom Right":
            rowIndexColumnIndex = [3, 6, 3, 6];
            rowManual = [3, 4, 5];
            break;
        default:
            return Error;
    }

    let board = state.board;
    var quadrantValues = [];
    var row1 = board[rowManual[0]].slice(rowIndexColumnIndex[2], rowIndexColumnIndex[3]);
    var row2 = board[rowManual[1]].slice(rowIndexColumnIndex[2], rowIndexColumnIndex[3]);
    var row3 = board[rowManual[2]].slice(rowIndexColumnIndex[2], rowIndexColumnIndex[3]);
    quadrantValues.push(row1, row2, row3);

    if (direction === "Left"){
        quadrantValues = rotateCounterClockwise(quadrantValues);
    }

    if (direction === "Right"){
        // transposeGrid rotates by 90 degrees
        quadrantValues = rotateClockwise(quadrantValues);
    }

    let affectedRow1 = board[rowManual[0]].slice();
    let affectedRow2 = board[rowManual[1]].slice();
    let affectedRow3 = board[rowManual[2]].slice();
    let tempValue = 0;

    for (var y = rowIndexColumnIndex[2]; y < rowIndexColumnIndex[3]; y++){
        affectedRow1[y] = {
            color: quadrantValues[0][tempValue].color,
            isOccupied: quadrantValues[0][tempValue].isOccupied
        };
        affectedRow2[y] = {
            color: quadrantValues[1][tempValue].color,
            isOccupied: quadrantValues[0][tempValue].isOccupied
        };

        affectedRow3[y] = {
            color: quadrantValues[2][tempValue].color,
            isOccupied: quadrantValues[0][tempValue].isOccupied
        };
        tempValue += 1;
    }

    let newBoard = board.slice();
    newBoard[rowManual[0]] = affectedRow1;
    newBoard[rowManual[1]] = affectedRow2;
    newBoard[rowManual[2]] = affectedRow3;

    const activeColor = state.nextColor;


    let newState = {
        ...state,
        board: newBoard,
        timeToRotate: false,
        quadrantToRotate: -1,
        nextColor: advanceColor(activeColor),
    };

    let winnerState = [false, false];
    for (let rowCheck = rowIndexColumnIndex[0]; rowCheck < rowIndexColumnIndex[1]; rowCheck++){
        for (let columnCheck = rowIndexColumnIndex[2]; columnCheck < rowIndexColumnIndex[3]; columnCheck++){

            if (newState.board[rowCheck][columnCheck].color !== 'gray'){
                if( doWeHaveAWinner(rowCheck, columnCheck, newState.board[rowCheck][columnCheck].color, newState.board) ) {
                    if (activeColor === 'black'){
                        winnerState[0] = true;
                    }
                    else{
                        winnerState[1] = true;
                    }
                    newState = {
                        ...newState,
                        haveAWinner: true,
                        winnerColor: newState.board[rowCheck][columnCheck].color
                    };
                }
            }
        }
    }
    if ((winnerState[0] && winnerState[1])){
        newState = {
            ...newState,
            winnerColor: activeColor
        };
    }
    sendState(newState, channel);
    return newState;
}


function integrateRotationChoice(state, quadrantChoice) {
    let newState = {
        ...state,
        quadrantToRotate: quadrantChoice,
    };
    return newState;
}

function integrateSkip(state, channel){
    let newState = {
        ...state,
        timeToRotate:false,
        nextColor:advanceColor(state.nextColor)
    }
  
    sendState(newState, channel);
    return newState
}


function playerCheck(state, type){
    if(type === 'click'){
        if (state.playerColor === '' || state.playerColor === state.nextColor)
            return true
        return false
    }
    if(type === 'rotate'){
        if (state.playerColor === state.nextColor)
            return true
        else return false
    }
    
}

function reducers(state, action) {

    if( state === undefined )
        return state;


    if( action.type === 'RESET' ) {
        document.getElementById('skipButton').style.visibility = 'visible';

        let channel = action.channel
        let newState = createInitialState();
        //If this sentResetState was put inside createInitialState, the game board would reset on exit and rejoin to the lobby
        //This might be a good idea because the games currently are desynced until a move is played on exit and rejoin
        sendState(newState, channel);
        return newState
    } else if( action.type === 'CELL_CLICKED') {
        if (!playerCheck(state, 'click'))
            return state
        if( state.haveAWinner )
            return state;
        if(state.board[action.rowGroup][action.colIdx].color !== 'gray')  // column is full
            return state;
        if(state.timeToRotate === true){
            return state;
        }
        return integrateClick(state, action.colIdx, action.rowGroup, action.channel);
    }
    else if (action.type === 'BUTTON_CLICKED' && state.timeToRotate) {
        return integrateRotationChoice(state, action.quadrant);
    }
    else if(action.type === 'ROTATION_CLICKED' && (state.quadrantToRotate !== -1) && state.timeToRotate){
        if(!playerCheck(state, 'rotate'))
            return state
        if (state.playerColor !== '' && state.playerColor !== state.nextColor)
            return state
        if(state.haveAWinner)
            return state
        return integrateRotation(state, action.direction, action.channel);
    }
    else if(action.type === 'SKIP_ROTATION' && state.timeToRotate){
        if(!playerCheck(state, 'rotate'))
            return state
        if(state.haveAWinner)
            return state
        return integrateSkip(state, action.channel)
    }
    else if(action.type === 'UPDATE'){
        let temp = action.newState

        //update game move
        let newState = {
            board:temp.board,
            hasRotated: temp.hasRotated,
            quadrantToRotate: temp.quadrantToRotate,
            haveAWinner: temp.haveAWinner,
            nextColor: temp.nextColor,
            timeToRotate: temp.timeToRotate,
            playerColor:state.playerColor
        }
        //update win
        if(temp.haveAWinner){
            newState = {
                ...newState,
                winnerColor:temp.winnerColor,
                playerColor:''
            }
        }
        return newState
    }

    else if(action.type === 'DO_NOTHING'){
        return state;
    }

    return state;

}

export {
    reducers,
    createInitialState
};