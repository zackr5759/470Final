import {NUM_ROWS, NUM_COLUMNS} from "./constantsMTT";
import doWeHaveAWinnerThatIncludes from "./doWeHaveAWinnerMTT";

const advanceTurn = (turn) => turn === 'player1' ? 'player2' : 'player1';

function createInitialState(player1Points, player2Points, winningPlayer) {
    // The board is a 2D array of Objects. Each Object holds the state of the "cell" that it represents.
    // Each of the elements of firstAvailableIndex contains an index for each column of the 2D array.
    // The value at the index specifies which row in that column a disk can be deposited.

    let score1 = 0;
    let score2 = 0;
    let playerToStart = 'player1';
    if (player1Points !== undefined && player2Points !== undefined && winningPlayer !== undefined){
        score1 = player1Points;
        score2 = player2Points;
        playerToStart = (winningPlayer === 'player1' ? 'player2' : winningPlayer === 'player1' ? 'player1' : 'player1');
    }
    let board = Array(NUM_ROWS).fill(Array(NUM_COLUMNS).fill(Array(NUM_ROWS).fill(Array(NUM_COLUMNS).fill({color: 'gray', isOccupied: false, playerMarking: null}))));
    board = board.map((megaColumn, megaColumnIdx) => board.map((megaRow, megaRowIdx) => megaRow.map((row, rowIdx) => row.map((col, colIdx) => {
        return {...board[megaColumnIdx][megaRowIdx][rowIdx][colIdx], row: rowIdx, column: colIdx, megaRow: megaRowIdx, megaColumn: megaColumnIdx}
        }))));

    let freshBoard = Array(NUM_ROWS).fill(Array(NUM_COLUMNS).fill({color: 'gray', isOccupied: false, playerMarking: null, playerMoves: 0}));
    freshBoard = freshBoard.map((row, rowIdx) => row.map( (col, colIdx) => {
        return {...freshBoard[rowIdx][colIdx], row: rowIdx, column: colIdx }}));

    return {
        board,
        haveAWinner: false,
        winningPlayer: null,
        turn: playerToStart,
        player1Score: score1,
        player2Score: score2,
        grandBoard: freshBoard,
        forcedPlay: false,
        playerMoves: 0,


    };
}

async function sendState(newState, channel){
    let roughObjSize = JSON.stringify(newState).length;
    await channel.sendEvent({
        type: "game-move",
        data: {newState},
    })
};
async function sendReset(channel){
    await channel.sendEvent({
        type: "reset",
        data: {},
    })
};

async function sendGameMove(gameMove, channel){
    await channel.sendEvent({
        type: "enemy-move",
        data: {gameMove},
    })
};


function clientIntegrateClick(state, row, col, megaRow, megaCol, marking, playerSymbol){
    let nextTurn = advanceTurn(state.turn);
    let board = state.board;
    const movesTaken = state.grandBoard[megaRow][megaCol].playerMoves + 1
    let affectedRow = board[megaRow][megaCol][row].slice();
    affectedRow[col] = {
        ...affectedRow[col],
        color: marking,
        isOccupied: true,
        playerMarking: playerSymbol,
    };
    let newBoard = board.slice();
    newBoard[megaRow][megaCol][row] = affectedRow;

    const newMoves = state.movesTaken + 1;
    let forcedToPlayIn = [row, col];
    if (state.grandBoard[row][col].isOccupied === true){
        forcedToPlayIn = false;
        console.log("The mini board has been won");
    }

    let newGrandBoard = state.grandBoard.slice()

    newGrandBoard[megaRow][megaCol].playerMoves = movesTaken;
    let newState = {
        ...state,
        board: newBoard,
        turn: nextTurn,
        movesTaken: newMoves,
        forcedPlay: forcedToPlayIn,
        grandBoard: newGrandBoard,
    };



    const tinyBoard = board[megaRow][megaCol].slice()
    if( doWeHaveAWinnerThatIncludes(row, col, playerSymbol, tinyBoard) ) {
        let tempGrandCell = newGrandBoard[megaRow][megaCol];
        tempGrandCell ={
          color: 'gray',
          isOccupied: true,
          playerMarking: playerSymbol,
        };


        newGrandBoard[megaRow][megaCol] = tempGrandCell;

        let player1Points = ('X' === playerSymbol ? 1 : 0);
        let player2Points = ('O' === playerSymbol ? 1 : 0);
        player1Points += newState.player1Score;
        player2Points += newState.player2Score;
        const newPlayerMoves = newState.playerMoves + 1;
        newState = {
            ...newState,
            // haveAWinner: true,
            // winningPlayer: state.turn,
            player1Score: player1Points,
            player2Score: player2Points,
            grandBoard: newGrandBoard,
            forcedPlay: false,
            playerMoves: newPlayerMoves,
        };
        if (doWeHaveAWinnerThatIncludes(megaRow,megaCol, playerSymbol, newState.grandBoard)) {
            console.log("----------GAME OVER WOOO------");
            const newMovesTaken = newState.movesTaken + 1;
            newState = {
                ...newState,
                haveAWinner: true,
                winningPlayer: playerSymbol,
                movesTaken: newMovesTaken,
            };
        }
    }
    if (movesTaken === 9 && newGrandBoard[megaRow][megaCol].isOccupied === false){
        console.log("It was a tie in this mini board");
        const newPlayerMoves = newState.playerMoves + 1;

        newGrandBoard[megaRow][megaCol] = {
            ...newGrandBoard[megaRow][megaCol],
            isOccupied: true,
            playerMarking: 'C',
        }
        newState = {
            ...newState,
            grandBoard: newGrandBoard,
            forcedPlay: false,
            playerMoves: newPlayerMoves,

        }
        if(newState.playerMoves === 9){
            console.log("This is game tie condition");
            newState = {
                ...newState,
                haveAWinner: true,
                winningPlayer: 'C',
            }
        }


    }

    return newState;
}

function integrateClick(state, colIdx, rowGroup, channel, turn, megaCol, megaRow, marker, playerSym ) {
    const marking = (turn === 'player1' ? 'black' : 'white');
    const playerSymbol = (turn === 'player1' ? 'X' : 'O');
    const gameMove = {
        row: rowGroup,
        col: colIdx,
        megaRow: megaRow,
        megaCol: megaCol,
        marking: marking,
        playerSymbol: playerSymbol,
    }

    let nextTurn = advanceTurn(turn);
    let tempGrandCell = state.grandBoard[megaRow][megaCol]
    const newMovesTaken = tempGrandCell.playerMoves + 1;
    console.log("new moves taken after click: ", newMovesTaken);

    let stateBoard = state.board;
    let affectedRow = stateBoard[megaRow][megaCol][rowGroup].slice();
    affectedRow[colIdx] = {
        ...affectedRow[colIdx],
        color: marking,
        isOccupied: true,
        playerMarking: playerSymbol,
    };

    stateBoard[megaRow][megaCol][rowGroup] = affectedRow

    let forcedToPlayIn = [rowGroup, colIdx];
    if (state.grandBoard[rowGroup][colIdx].isOccupied === true){
        forcedToPlayIn = false;

    }

    let newGrandBoard = state.grandBoard.slice()
    newGrandBoard[megaRow][megaCol].playerMoves = newMovesTaken;
    let newState = {
        ...state,
        board: stateBoard,
        turn: nextTurn,
        forcedPlay: forcedToPlayIn,
        grandBoard: newGrandBoard,
    };


    const tinyBoard = stateBoard[megaRow][megaCol].slice()
    if( doWeHaveAWinnerThatIncludes(rowGroup, colIdx, playerSymbol, tinyBoard) ) {

        tempGrandCell = {
            ...tempGrandCell,
            isOccupied: true,
            playerMarking: playerSymbol,
            playerMoves: newMovesTaken,
        };
        const newPlayerMoves = newState.playerMoves + 1;
        newGrandBoard[megaRow][megaCol] = tempGrandCell;

        newState = {
            ...newState,
            // haveAWinner: true,
            // winningPlayer: turn,
            grandBoard: newGrandBoard,
            forcedPlay: false,
            playerMoves : newPlayerMoves,
        };
        if (doWeHaveAWinnerThatIncludes(megaRow,megaCol, playerSymbol, newState.grandBoard)){
            console.log("----------GAME OVER WOOO------");

            let player1Points = ('X' === playerSymbol ? 1 : 0);
            let player2Points = ('O' === playerSymbol ? 1 : 0);
            player1Points += newState.player1Score;
            player2Points += newState.player2Score;
            const newPlayerMoves = newState.playerMoves + 1;
            newState = {
              ...newState,
                haveAWinner: true,
                winningPlayer: playerSymbol,
                player1Score: player1Points,
                player2Score: player2Points,
                playerMoves: newPlayerMoves
            };
        }
    }
    if (newMovesTaken === 9 && newState.grandBoard[megaRow][megaCol].isOccupied === false){
        console.log("Its a tie-----");
        const newPlayerMoves = newState.playerMoves + 1;
        tempGrandCell = {
            ...tempGrandCell,
            isOccupied: true,
            playerMarking: 'C',
            playerMoves: newMovesTaken,
        };
        newGrandBoard[megaRow][megaCol] = tempGrandCell;

        newState = {
            ...newState,
            grandBoard: newGrandBoard,
            forcedPlay: false,
            playerMoves: newPlayerMoves,
        }
        if(newState.playerMoves === 9){
            console.log("This is game tie condition");
            newState = {
                ...newState,
                haveAWinner: true,
                winningPlayer: 'C',
            }
        }

    }
    console.log("end of integrate click this is moves taken: ", newState.grandBoard[megaRow][megaCol].playerMoves);
    sendGameMove(gameMove, channel);
    return newState;
}


function reducers(state, action) {
    console.log("In reducer: ", state);
    if( state === undefined )
        return state;

    if( action.type === 'RESET' ) {
        console.log("In reset:");
        let newState = createInitialState(state.identity, state.player1Score, state.player2Score, state.winningPlayer);
        //If this sentResetState was put inside createInitialState, the game board would reset on exit and rejoin to the lobby
        //This might be a good idea because the games currently are desynced until a move is played on exit and rejoin
        sendReset(state.channel);
        return newState
    } else if( action.type === 'CELL_CLICKED') {
        if (state.haveAWinner)
            return state;
        if (state.board[action.megaRow][action.megaCol][action.rowGroup][action.colIdx].isOccupied === true) {
          // column is full
            return state;
        }
        if (state.grandBoard[action.megaRow][action.megaCol].isOccupied === true){
            //A player has won this mini board
            return state;
        }
        if (state.forcedPlay === false){
            return integrateClick(state, action.colIdx, action.rowGroup, action.channel, action.turn, action.megaCol, action.megaRow);
        }
        if (state.forcedPlay[0] === action.megaRow && state.forcedPlay[1] === action.megaCol){
            return integrateClick(state, action.colIdx, action.rowGroup, action.channel, action.turn, action.megaCol, action.megaRow);
        }
        return state;
    }


    else if(action.type === 'UPDATE'){
        let temp = action.newState
        //update game move
        let newState = {
            ...temp,
        }
        //update win
        if(temp.haveAWinner){
            newState = {
                ...newState,
            }
        }
        return newState
    }
    else if(action.type === 'ENEMY_MOVE'){
        const gameMove = action.gameMove;
        const {row, col, megaRow, megaCol, marking, playerSymbol} = gameMove;

        return clientIntegrateClick(state, row, col, megaRow, megaCol, marking, playerSymbol);
    }
    else if (action.type === 'CHECK_STATE'){
        //GrandBoard holds the result of the 9 mini boards
        //When mapping through the entire board check state is called on the each board
        //if that board has a winner then we will return a box that shows the winner
        //of that small grid.
        let displayWinner = (state.grandBoard[action.megaRow][action.megaCol].isOccupied === true ? true : false);
        console.log(displayWinner);
        return state;
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