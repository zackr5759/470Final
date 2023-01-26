
const click_on_cell_action = (clickColIdx, clickRowIdx, timeToRotate, turn, player, client, channel) => {
    if (turn === player) {

        return {
            type: "CELL_CLICKED",
            colIdx: clickColIdx,
            rowGroup: clickRowIdx,
            timeToRotate: timeToRotate,
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

const skip_rotation = (channel) => {
    return {
        type: 'SKIP_ROTATION',
        channel:channel
    }
}

const button_clicked = (buttonQuadrant, timeToRotate) => {
    return {
        type: 'BUTTON_CLICKED',
        quadrant: buttonQuadrant,
        timeToRotate: timeToRotate
    }
}
const rotation_clicked = (buttonQuadrant, timeToRotate, direction, channel) => {
    return {
        type: 'ROTATION_CLICKED',
        quadrant: buttonQuadrant,
        timeToRotate: timeToRotate,
        direction: direction,
        channel: channel
    }
}



export {
    click_on_cell_action,
    reset_action,
    button_clicked,
    rotation_clicked,
    skip_rotation,
    update_Board
};