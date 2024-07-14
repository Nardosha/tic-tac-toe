import {useWebSocket} from "./useWebSocket.js";
import {useCallback, useEffect, useState} from "react";
import {OutcomingMessageTypes} from "../constants.js";


export const useBoard = () => {
    const {webSocket, isWebSocketReady} = useWebSocket()

    const [map, setMap] = useState(null)
    const [steps, setSteps] = useState([])

    useEffect(() => {
        let unsubscribe;

        function listenMessage(event) {
            try {
                const parsedData = JSON.parse(event.data)

                const newMap = parsedData.payload?.map
                const newSteps = parsedData.payload?.steps

                if (newMap) {
                    setMap(() => newMap)
                }

                if (newSteps) {
                    setSteps(() => newSteps)
                }

            } catch (e) {
                console.log(e)
            }
        }


        if (webSocket && isWebSocketReady) {
            unsubscribe = webSocket.subscribeMessage(listenMessage)
            webSocket.send(JSON.stringify({type: OutcomingMessageTypes.GET_BOARD_STATE}))
        }

        return unsubscribe
    }, [webSocket, isWebSocketReady, setSteps, setMap])


    const handleClear = useCallback(() => {
        if (webSocket && isWebSocketReady) {
            webSocket.send(JSON.stringify({type: OutcomingMessageTypes.CLEAR_BOARD}))
        }
    }, [webSocket, isWebSocketReady])

    const handleStep = useCallback((cell) => {
        if (webSocket && isWebSocketReady) {
            const isFirstStep = steps.length === 0

            if (isFirstStep) {
                const payload = {field: cell}
                webSocket.send(JSON.stringify({type: OutcomingMessageTypes.FIRST_STEP, payload}))
            } else {
                const payload = {field: cell, prevStepId: steps.slice(-1)[0].id}
                webSocket.send(JSON.stringify({type: OutcomingMessageTypes.STEP, payload}))
            }
        }
    }, [webSocket, isWebSocketReady, steps])

    return {map, steps, handleClear, handleStep}
}