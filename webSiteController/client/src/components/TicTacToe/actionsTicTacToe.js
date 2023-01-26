
const click_on_cell_action = (clickColIdx, clickRowIdx, turn, player, client, channel, setPlayer1Score, setPlayer2Score) => {
    console.log("In click on cell Turn: ", turn, "   playerClicking: ", player);
    if (turn === player) {
        console.log("In conditional: ");
        return {
            type: "CELL_CLICKED",
            colIdx: clickColIdx,
            rowGroup: clickRowIdx,
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

const update_Board = (newState) => {
    return {
        type: 'UPDATE',
        newState:newState,
    }
}




export {
    click_on_cell_action,
    reset_action,
    update_Board
};