import './Board.css'
import {useBoard} from "../use/useBoard.js";
import {CellValues} from "../constants.js";

const Board = () => {
    const {map: board, handleClear, handleStep} = useBoard()

    return (
        <div className="wrapper">

            <div className="board">
                <ul className="map">
                    {board && board.map((cell, i) => {
                        return (<li className="cell" key={i}>{
                            cell === CellValues.EMPTY_CELL
                                ? <button className="button clickable-button"
                                          onClick={() => handleStep(i)}>{cell}</button>
                                : <>{cell}</>
                        }</li>)
                    })}

                </ul>
            </div>

            <div className="control">
                <button className="button clear-button" onClick={handleClear}>Clear board</button>
            </div>

        </div>
    )
}

export default Board