import {useWebSocket} from "../use/useWebSocket.js";

const CloseButton = () => {
    const {webSocket, isWebSocketReady} = useWebSocket()

    const handleClick = () => {
        webSocket?.close()
    }

    return (
        <button onClick={handleClick} disabled={! isWebSocketReady}>Close</button>
    )
}

export default CloseButton