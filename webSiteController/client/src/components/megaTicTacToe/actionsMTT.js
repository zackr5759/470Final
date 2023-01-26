
const click_on_cell_action = (clickColIdx, clickRowIdx, turn, player, client, channel, cookieIDName, clickMegaRowKey, clickMegaColKey) => {
    console.log("Row, Column: ", clickRowIdx, ", ", clickColIdx, "   Mega Row, Column: ", clickMegaRowKey, ", ", clickMegaColKey);
    if (turn === player) {
        return {
            type: "CELL_CLICKED",
            colIdx: clickColIdx,
            rowGroup: clickRowIdx,
            megaRow: clickMegaRowKey,
            megaCol: clickMegaColKey,
            turn: turn,
            client: client,
            channel: channel,
            player: player,


        }
    }
    return {
        type: "DO_NOTHING",
    }
}

const reset_action = (channel) => {
    return {
        type: 'RESET',
        channel:channel
    }
}

const reset_board = () => {
    return {
        type: 'RESET'
    }
}

const update_Board = (newState) => {
    return {
        type: 'UPDATE',
        newState:newState,
    }
}
const updateEnemyBoard = (gameMove) => {
    console.log("In actions with gamemove = ", gameMove);
    return {
        type: 'ENEMY_MOVE',
        gameMove: gameMove,
    }
}

const checkBoardState = (megaRow, megaCol) => {
    return {
       type: 'CHECK_STATE',
        megaRow: megaRow,
        megaCol: megaCol,
    }
}

export {
    click_on_cell_action,
    reset_action,
    update_Board,
    updateEnemyBoard,
    checkBoardState,
    reset_board
};