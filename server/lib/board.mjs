/**
 * Cell: None | X | O
 * TicTacMap Array(9 items)
 * 0 1 2
 * 3 4 5
 * 6 7 8
 */

const WIN_COMBINATIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]


/**
 * Steps
 * 1. First step {id: number, prevStepId: undefined, field: number}
 * 1. Step {id: number, prevStepId: number, field: number}
 *
 *
 * Statuses 'before_start' | 'game' | 'finished'
 *
 */

const CellValues = {
    EMPTY_CELL: 'None', X_CELL: 'X', O_CELL: 'O'
}

const Statuses = {
    BEFORE_START: 'before_start', GAME: 'game', FINISHED: 'finished'
}


const getClearMap = () => {
    return Array(9).fill(CellValues.EMPTY_CELL)
}

const checkIsGameFinished = (map) => {
    return WIN_COMBINATIONS.some(combination => (combination.every(position => map[position] === CellValues.X_CELL) || combination.every(position => map[position] === CellValues.O_CELL)))
}

export class Board {
    static instance;
    map = getClearMap()
    steps = []
    status = Statuses.BEFORE_START

    static getInstance() {
        if (!Board.instance) {
            Board.instance = new Board()
        }

        return Board.instance
    }

    getCurrentBoardState() {
        return {
            map: this.map, steps: this.steps, status: this.status
        }
    }

    clear() {
        this.map = getClearMap()
        this.steps = []
        this.status = Statuses.BEFORE_START
    }

    firstStep(stepData) {
        const isFieldCorrect = stepData.field >= 0 && stepData.field <= 8
        const isMapEmpty = this.map.every(field => field === CellValues.EMPTY_CELL)
        const hasNoStepsBefore = this.steps.length === 0

        if (isFieldCorrect && isMapEmpty && hasNoStepsBefore) {
            const step = {
                id: 0, prevStepId: undefined, field: stepData.field
            }

            this.steps = [step]
            this.map = [...this.map.slice(0, stepData.field), CellValues.X_CELL, ...this.map.slice(stepData.field + 1)]
            this.status = Statuses.GAME
            return {result: true}
        } else {
            return {result: false}
        }
    }

    step(stepData) {
        /**
         * Проверяем, что id последнего элемента в steps соответствует is предыдущего шага в stepData
         */
        const isProgression = !!this.steps.length && this.steps.slice(-1)[0].id === stepData.prevStepId
        const isFieldCorrect = stepData.field >= 0 && stepData.field <= 8 && this.map[stepData.field] === CellValues.EMPTY_CELL
        const isGameStatusCorrect = this.status === Statuses.GAME

        if (isProgression && isFieldCorrect && isGameStatusCorrect) {
            const step = {
                id: this.steps.length,
                prevStepId: this.steps.length - 1,
                field: stepData.field
            }

            const cell = this.steps.length % 2 === 1 ? CellValues.O_CELL : CellValues.X_CELL
            this.steps = [...this.steps, step]
            this.map = [...this.map.slice(0, stepData.field), cell, ...this.map.slice(stepData.field + 1)]

            this.checkGameFinished()

            return {result: true}
        } else {
            return {result: false}
        }
    }


    checkGameFinished() {
        const isGameFinished = this.steps.length > 5 && checkIsGameFinished(this.map)

        if (isGameFinished) {
            this.status = Statuses.FINISHED
        }
    }

}