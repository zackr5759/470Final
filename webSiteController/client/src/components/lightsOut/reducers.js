import {NUM_COLUMNS, NUM_ROWS, START_LIGHT_ODDS} from "./constants";
let offColor = '#78909C';
let onColor = '#FFEE58';
const  advanceColor = (color) => color === onColor ? offColor : onColor;
const advanceCount = (count) => count + 1;
function createInitialState(boardRows = NUM_ROWS, boardCol = NUM_COLUMNS) {

    let board = Array(boardRows).fill(Array(boardCol).fill({color: offColor, isOccupied: false}));
    board.map((row, rowIdx) => row.map( (col, colIdx) => {
        return {...board[rowIdx][colIdx], row: rowIdx, column: colIdx };
    }));

    let arrayOfClicks = [];
    for (let rowsInBoard = 0; rowsInBoard < boardRows; rowsInBoard++){
        let affectedRow = board[rowsInBoard].slice();
        for (let colInBoard = 0; colInBoard < boardCol; colInBoard++){
            if (Math.random() < START_LIGHT_ODDS){
                arrayOfClicks.push([rowsInBoard, colInBoard]);
                board = integrateClick(board, colInBoard, rowsInBoard, boardRows);

            }
        }

    }
    console.log(arrayOfClicks);
    return {
        board,
        haveAWinner: false,
        clickCount: 0,
        boardTime: 0,
        boardActive: true,
        boardAttributes: [boardRows, boardCol],
        winningClick: arrayOfClicks,
    };
}


function integrateClick(startBoard, colIdx, rowIdx, dimension){
    let boardDimension = dimension;
    let board = startBoard;
    let affectedRow = board[rowIdx].slice();

    affectedRow[colIdx] = {
        ...affectedRow[colIdx],
        color: advanceColor(affectedRow[colIdx]['color']),
        isOccupied: true
    };

    if (colIdx === (boardDimension - 1)){
        affectedRow[colIdx - 1] = {
            ...affectedRow[colIdx - 1],
            color: advanceColor(affectedRow[colIdx - 1]['color']),
            isOccupied: true
        };
    }
    else if (colIdx === 0){
        affectedRow[colIdx + 1] = {
            ...affectedRow[colIdx + 1],
            color: advanceColor(affectedRow[colIdx + 1]['color']),
            isOccupied: true
        };
    }
    else{
        affectedRow[colIdx - 1] = {
            ...affectedRow[colIdx - 1],
            color: advanceColor(affectedRow[colIdx - 1]['color']),
            isOccupied: true
        };

        affectedRow[colIdx + 1] = {
            ...affectedRow[colIdx + 1],
            color: advanceColor(affectedRow[colIdx + 1]['color']),
            isOccupied: true
        };

    }

    let affectedBotRow = 0;
    let affectedTopRow = 0;

    if (rowIdx === 0){
        affectedBotRow = board[rowIdx + 1].slice();
        affectedBotRow[colIdx] = {
            ...affectedBotRow[colIdx],
            color: advanceColor(affectedBotRow[colIdx]['color']),
            isOccupied: true
        };
    }
    else if (rowIdx === (boardDimension - 1)){
        affectedTopRow = board[rowIdx - 1].slice();
        affectedTopRow[colIdx] = {
            ...affectedTopRow[colIdx],
            color: advanceColor(affectedTopRow[colIdx]['color']),
            isOccupied: true
        };
    }
    else{
        affectedBotRow = board[rowIdx + 1].slice();
        affectedBotRow[colIdx] = {
            ...affectedBotRow[colIdx],
            color: advanceColor(affectedBotRow[colIdx]['color']),
            isOccupied: true
        };

        affectedTopRow = board[rowIdx - 1].slice();
        affectedTopRow[colIdx] = {
            ...affectedTopRow[colIdx],
            color: advanceColor(affectedTopRow[colIdx]['color']),
            isOccupied: true
        };


    }

    let newBoard = board.slice();
    newBoard[rowIdx] = affectedRow;

    if (affectedBotRow !== 0){
        newBoard[rowIdx + 1] = affectedBotRow;
    }
    if (affectedTopRow !== 0){
        newBoard[rowIdx - 1] = affectedTopRow;
    }

    return newBoard;

}






function integrateCascade(state, colIdx, rowIdx, cellColor){
    if (state.haveAWinner){
        return state;
    }
    let boardDimension = state.boardAttributes[0];
    let board = state.board;
    let affectedRow = board[rowIdx].slice();
    const buttonClicked = [rowIdx, colIdx];
    // const find = state.winningClick.find(cellClick => {
    //     console.log("cell click: ", cellClick, "   BUtton clicked: ", buttonClicked);
    //     return (cellClick[0] === buttonClicked[0] && cellClick[1] === buttonClicked[1]);
    // });
    let tempWinningClicks = state.winningClick;
    let cellExistence = JSON.stringify(tempWinningClicks).includes(JSON.stringify(buttonClicked));

    console.log("state clicks: ", state.winningClick, "  checking for: ", buttonClicked);
    console.log("cell exists: ", cellExistence);
    if (cellExistence){
        tempWinningClicks = tempWinningClicks.filter(item => ((item[0] !== buttonClicked[0] && item[1] !== buttonClicked[1]) || (item[0] !== buttonClicked[0] && item[1] === buttonClicked[1]) || (item[0] === buttonClicked[0] && item[1] !== buttonClicked[1])));
        // let fe = keyboard.tempWinningClicks.filter(k => k.every(e => e !== buttonClicked));
    }
    else{
        tempWinningClicks.push(buttonClicked);
    }
    console.log("post temp: ", tempWinningClicks);



    affectedRow[colIdx] = {
        ...affectedRow[colIdx],
        color: advanceColor(cellColor),
        isOccupied: true
    };
    if (colIdx === (boardDimension - 1)){
        affectedRow[colIdx - 1] = {
            ...affectedRow[colIdx - 1],
            color: advanceColor(affectedRow[colIdx - 1]['color']),
            isOccupied: true
        };
    }
    else if (colIdx === 0){
        affectedRow[colIdx + 1] = {
            ...affectedRow[colIdx + 1],
            color: advanceColor(affectedRow[colIdx + 1]['color']),
            isOccupied: true
        };
    }
    else{
        affectedRow[colIdx - 1] = {
            ...affectedRow[colIdx - 1],
            color: advanceColor(affectedRow[colIdx - 1]['color']),
            isOccupied: true
        };

        affectedRow[colIdx + 1] = {
            ...affectedRow[colIdx + 1],
            color: advanceColor(affectedRow[colIdx + 1]['color']),
            isOccupied: true
        };

    }

    let affectedBotRow = 0;
    let affectedTopRow = 0;

    if (rowIdx === 0){
        affectedBotRow = board[rowIdx + 1].slice();
        affectedBotRow[colIdx] = {
            ...affectedBotRow[colIdx],
            color: advanceColor(affectedBotRow[colIdx]['color']),
            isOccupied: true
        };
    }
    else if (rowIdx === (boardDimension - 1)){
        affectedTopRow = board[rowIdx - 1].slice();
        affectedTopRow[colIdx] = {
            ...affectedTopRow[colIdx],
            color: advanceColor(affectedTopRow[colIdx]['color']),
            isOccupied: true
        };
    }
    else{
        affectedBotRow = board[rowIdx + 1].slice();
        affectedBotRow[colIdx] = {
            ...affectedBotRow[colIdx],
            color: advanceColor(affectedBotRow[colIdx]['color']),
            isOccupied: true
        };

        affectedTopRow = board[rowIdx - 1].slice();
        affectedTopRow[colIdx] = {
            ...affectedTopRow[colIdx],
            color: advanceColor(affectedTopRow[colIdx]['color']),
            isOccupied: true
        };


    }

    let newBoard = board.slice();
    newBoard[rowIdx] = affectedRow;

    if (affectedBotRow !== 0){
        newBoard[rowIdx + 1] = affectedBotRow;
    }
    if (affectedTopRow !== 0){
        newBoard[rowIdx - 1] = affectedTopRow;
    }

    let haveWeWon = (boardState) => {
        let winTemp = true;
        for (let i = 0; i < boardDimension; i++){
            let currentRow = boardState[i].slice();
            let rowWin = currentRow.every(function(item){
                return item.color === offColor;
            });
            winTemp = (winTemp && rowWin);
        }
        return winTemp;
    }
    let hasWon = haveWeWon(newBoard);



    const activeColor = state.nextColor;
    const currentCount = state.clickCount;
    let newState = {
        ...state,
        board: newBoard,
        nextColor: advanceColor(activeColor),
        clickCount: advanceCount(currentCount),
        haveAWinner: hasWon,
        winningClick: tempWinningClicks
    };



    return newState;


}


function reducers(state, action) {
    if( state === undefined )
        return state;

    if( action.type === 'RESET' ) {
        const boardRow = state.boardAttributes[0];
        const boardCol = state.boardAttributes[1];
        return createInitialState(boardRow, boardCol);
    } else if( action.type === 'CELL_CLICKED') {
        if( state.haveAWinner )
            return state;
        return integrateCascade(state, action.colIdx, action.rowIdx, action.color);
    }
    else if (action.type === 'RESHAPE') {
        return createInitialState(action.rowSize,action.colSize)
    }
    else if (action.type === 'HINT'){
        if (state.haveAWinner){
            return state;
        }
        const hintCell = state.winningClick[0];
        const clickRow = hintCell[0];
        const clickCol = hintCell[1];
        return integrateCascade(state, clickCol, clickRow, state.board[clickRow][clickCol]['color']);
    }

    return state;

}

export {
    reducers,
    createInitialState
};