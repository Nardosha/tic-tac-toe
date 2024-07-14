export const IncomingMessageTypes = {
    PING: 'ping',
    FIRST_STEP: 'firstStep',
    STEP: 'step',
    CLEAR_BOARD: 'clearBoard',
    GET_BOARD_STATE: 'getBoardState'
}

export const OutcomingMessageTypes = {
    PONG: 'pong',
    UNKNOWN: 'UNKNOWN',
    BOARD_STATE: 'boardState',
    MAP_IS_CLEARED:'mapIsCleared',
    STEP_IS_FAILED: 'yourStepIsFailed',
    STEP_IS_SUCCEEDED: 'stepIsSucceeded',
    FIRST_STEP_IS_SUCCEEDED: 'firstStepIsSucceeded',
    FIRST_STEP_IS_FAILED: 'yourFirstStepIsFailed'
}