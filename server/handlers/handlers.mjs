import {OutcomingMessageTypes} from "../constants.mjs";
import {Board} from "../lib/board.mjs";

export const handlePing = (connection) => {
    connection.write(JSON.stringify({type:OutcomingMessageTypes.PONG}));
}

export const handleFirstStep = (currentConnection, pullOfClients, payload) => {
    const board = Board.getInstance()

    const { result } = board.firstStep(payload)

    const boardState = board.getCurrentBoardState()
    if (result) {
        const message = JSON.stringify({type: OutcomingMessageTypes.FIRST_STEP_IS_SUCCEEDED, payload: boardState})
        pullOfClients.forEach(connection => connection.write(message))
    } else {
        const message = JSON.stringify({type: OutcomingMessageTypes.FIRST_STEP_IS_FAILED, payload: boardState})
        currentConnection.write(message)
    }
}

export const handleStep = (currentConnection, pullOfClients, payload) => {
    const board = Board.getInstance()

    const { result } = board.step(payload)

    const boardState = board.getCurrentBoardState()

    if (result) {
        const message = JSON.stringify({type: OutcomingMessageTypes.STEP_IS_SUCCEEDED, payload: boardState})
        pullOfClients.forEach(connection => connection.write(message))
    } else {
        const message = JSON.stringify({type: OutcomingMessageTypes.STEP_IS_FAILED, payload: boardState})
        currentConnection.write(message)
    }
}

export const handleGetBoardState = (connection) => {
    const board = Board.getInstance()

    connection.write(JSON.stringify({
        type: OutcomingMessageTypes.BOARD_STATE,
        payload: board.getCurrentBoardState()
        }
    ))

}

export const handleClearBoard = (pullOfClients) => {
    const board = Board.getInstance()
    board.clear()

    const message = JSON.stringify({type: OutcomingMessageTypes.MAP_IS_CLEARED, payload: board.getCurrentBoardState()})

    pullOfClients.forEach(connection => connection.write(message))

}

export const handleDefault = (connection) => {
    connection.write(JSON.stringify({type: OutcomingMessageTypes.UNKNOWN}))
}