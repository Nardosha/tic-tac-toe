import {OutcomingMessageTypes} from "../constants.js";
import {useWebSocket} from "../use/useWebSocket.js";

const PingButton = () => {
    const {webSocket, isWebSocketReady} = useWebSocket()

    const handleClick = () => {
        webSocket?.send(JSON.stringify({type: OutcomingMessageTypes.PING}))
    }

    return (
        <button onClick={handleClick} disabled={!isWebSocketReady}>Ping</button>
    )
}

export default PingButton