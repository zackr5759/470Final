
const click_on_cell_action = (clickColIdx, clickRowIdx, backGroundColor) => {
    // console.log("click on cell row: ", clickRowIdx, " col: ", clickColIdx);
    return {
        type: "CELL_CLICKED",
        colIdx: clickColIdx,
        rowIdx: clickRowIdx,
        color: backGroundColor,

    }
}


const board_reshape = (x, y) => {
    return {
        type: 'RESHAPE',
        rowSize: x,
        colSize: y,
    }
}

const reset_action = () => {
    return {
        type: 'RESET',
    }
}

const game_hint = () => {
    return {
        type: 'HINT',
    }
}

export {
    click_on_cell_action,
    reset_action,
    board_reshape,
    game_hint,

};
