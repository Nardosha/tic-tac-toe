export const OutcomingMessageTypes = {
    PING: 'ping',
    FIRST_STEP: 'firstStep',
    STEP: 'step',
    CLEAR_BOARD: 'clearBoard',
    GET_BOARD_STATE: 'getBoardState'
}

export const IncomingMessageTypes = {
    PONG: 'pong',
    UNKNOWN: 'UNKNOWN',
    BOARD_STATE: 'boardState',
    MAP_IS_CLEARED:'mapIsCleared',
    STEP_IS_FAILED: 'yourStepIsFailed',
    STEP_IS_SUCCEEDED: 'stepIsSucceeded',
    FIRST_STEP_IS_SUCCEEDED: 'firstStepIsSucceeded',
    FIRST_STEP_IS_FAILED: 'yourFirstStepIsFailed'
}

export const CellValues = {
    EMPTY_CELL: 'None',
    X_CELL: 'X',
    O_CELL: 'O'
}