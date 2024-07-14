import {useWebSocket} from "../use/useWebSocket.js";

const ConnectButton = () => {
    const {webSocket, isWebSocketReady} = useWebSocket()

    const handleClick = () => {
        webSocket?.connect()
    }

    return (
        <button onClick={handleClick} disabled={isWebSocketReady}>Connect</button>
    )
}

export default ConnectButton