import {createServer} from 'http'
import {createServer as createSocket} from 'sockjs'

import {IncomingMessageTypes} from "./constants.mjs";
import {
    handleClearBoard,
    handleDefault,
    handleFirstStep,
    handleGetBoardState,
    handlePing,
    handleStep
} from "./handlers/handlers.mjs";

const httpServer = createServer()
const socketServer = createSocket()

let pullOfClients = []

socketServer.on('connection', connection => {
    pullOfClients = [...pullOfClients, connection]

    connection.on('close', () => {
        pullOfClients = pullOfClients.filter(client => client !== connection)
    })

    connection.on('data', (message) => {
        try {
            const parsedData = JSON.parse(message)

            switch (parsedData.type) {
                case IncomingMessageTypes.PING:
                    handlePing(connection)
                    break;
                case IncomingMessageTypes.FIRST_STEP:
                    handleFirstStep(connection, pullOfClients, parsedData.payload)
                    break

                case IncomingMessageTypes.STEP:
                    handleStep(connection, pullOfClients, parsedData.payload)
                    break

                case IncomingMessageTypes.GET_BOARD_STATE:
                    handleGetBoardState(connection)
                    break

                case IncomingMessageTypes.CLEAR_BOARD:
                    handleClearBoard(pullOfClients)
                    break
                default:
                    handleDefault(connection)
            }
        } catch (e) {

        }
    })
})

socketServer.installHandlers(httpServer)
httpServer.listen(3000)