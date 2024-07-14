import './App.css'
import ConnectButton from "./components/ConnectButton.jsx";
import PingButton from "./components/PingButton.jsx";
import CloseButton from "./components/CloseButton.jsx";
import Board from "./components/Board";


function App() {
    return (
        <>
            <div className="connection-control">
                <ConnectButton/>
                <PingButton/>
                <CloseButton/>
            </div>

            <Board/>
        </>
    )
}

export default App
