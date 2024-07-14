import {WS} from '../api/ws.js'
import {useEffect, useState} from "react";
import {useInterval} from "./useInterval.js";

export const useWebSocket = () => {
    const [webSocket, setWebSocket] = useState(null)
    const [isWebSocketReady, setIsWebSocketReady] = useState(false)

    useEffect(() => {
        if (webSocket) return

        setWebSocket(WS.getInstance())
    }, [])

    useInterval(() => {
        if (webSocket && isWebSocketReady !== webSocket.isWSReady) {
            setIsWebSocketReady(webSocket.isWSReady)
        }
    }, 50)

    return {
        webSocket, isWebSocketReady
    }
}