import {NUM_ROWS, NUM_COLUMNS} from "./constantsTicTacToe";
import doWeHaveAWinner from "./doWeHaveAWinner";

const advanceTurn = (turn) => turn === 'player1' ? 'player2' : 'player1';

function createInitialState(idkey, player1Points, player2Points, winningPlayer) {
    // The board is a 2D array of Objects. Each Object holds the state of the "cell" that it represents.
    // Each of the elements of firstAvailableIndex contains an index for each column of the 2D array.
    // The value at the index specifies which row in that column a disk can be deposited.

    let score1 = 0;
    let score2 = 0;
    let playerToStart = 'player1';
    if (player1Points !== undefined && player2Points !== undefined && winningPlayer !== undefined){
        score1 = player1Points;
        score2 = player2Points;
        playerToStart = (winningPlayer === 'player1' ? 'player2' : 'player1');
    }
    let board = Array(NUM_ROWS).fill(Array(NUM_COLUMNS).fill({color: 'gray', isOccupied: false, playerMarking: null}));
    board.map((row, rowIdx) => row.map( (col, colIdx) => {
        return {...board[rowIdx][colIdx], row: rowIdx, column: colIdx }
    }));

    return {
        board,
        haveAWinner: false,
        winningPlayer: null,
        turn: playerToStart,
        player1Score: score1,
        player2Score: score2,
        movesTaken: 0,
        identity: idkey,


    };
}

async function sendState(newState, channel){
    await channel.sendEvent({
        type: "game-move",
        data: {newState},
    })
};

function integrateClick(state, colIdx, rowGroup, channel, turn ) {
    const marking = (turn === 'player1' ? 'black' : 'white');
    const playerSymbol = (turn === 'player1' ? 'X' : 'O')

    let nextTurn = advanceTurn(turn);
    let board = state.board;
    let affectedRow = board[rowGroup].slice();
    affectedRow[colIdx] = {
        ...affectedRow[colIdx],
        color: marking,
        isOccupied: true,
        playerMarking: playerSymbol,
    };
    let newBoard = board.slice();
    newBoard[rowGroup] = affectedRow;

    const newMoves = state.movesTaken + 1;
    let newState = {
        ...state,
        board: newBoard,
        turn: nextTurn,
        movesTaken: newMoves,
    };

    if( doWeHaveAWinner(rowGroup, colIdx, playerSymbol, board) ) {
        console.log("winner", newState);
        let player1Points = ('X' === playerSymbol ? 1 : 0);
        let player2Points = ('O' === playerSymbol ? 1 : 0);
        player1Points += newState.player1Score;
        player2Points += newState.player2Score;
        newState = {
            ...newState,
            haveAWinner: true,
            winningPlayer: turn,
            player1Score: player1Points,
            player2Score: player2Points,
        };
    }
    if (newMoves === 9 && newState.haveAWinner === false){
        console.log("Its a tie");
        newState = {
            ...newState,
            haveAWinner: true,
            winningPlayer: 'tie',
        }

    }

    sendState(newState, channel);
    console.log("state after integrate click:", state);
    return newState;
}


function reducers(state, action) {
    if( state === undefined )
        return state;


    if( action.type === 'RESET' ) {
        console.log("In reset:");
        let channel = action.channel;
        let newState = createInitialState(state.identity, state.player1Score, state.player2Score, state.winningPlayer);
        //If this sentResetState was put inside createInitialState, the game board would reset on exit and rejoin to the lobby
        //This might be a good idea because the games currently are desynced until a move is played on exit and rejoin
        sendState(newState, channel);
        return newState
    } else if( action.type === 'CELL_CLICKED') {
        if( state.haveAWinner )
            return state;
        if(state.board[action.rowGroup][action.colIdx].color !== 'gray')  // column is full
            return state;
        return integrateClick(state, action.colIdx, action.rowGroup, action.channel, action.turn);
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
    else if(action.type === 'DO_NOTHING'){
        return state;
    }

    return state;

}

export {
    reducers,
    createInitialState
};