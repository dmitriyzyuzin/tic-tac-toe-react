import React from 'react';

import Board from '../Board/Board';
import './style.css';

const defaultState = {
    history: [
        {
            squares: Array(9).fill(null),
        }
    ],
    stepNum: 0,
    isNextValueX: true,
};

class Game extends React.Component {
    state = Object.assign(defaultState, {});

    handleClick = index => {
        const history = this.state.history.slice(0, this.state.stepNum + 1);
        const latestHistoryObj = history[history.length - 1];
        const squares = latestHistoryObj.squares.slice();

        if (calculateWinner(squares)) {
            return;
        }

        squares[index] =  this.state.isNextValueX ? 'X' : 'O';

        this.setState((state) => ({
            history: history.concat({
                squares: squares,
            }),
            stepNum: state.stepNum + 1,
            isNextValueX: !state.isNextValueX
        }));
    };

    resetGame = () => {
        this.setState(() => defaultState);
    };

    render() {
        const current = this.state.history[this.state.stepNum];

        let status;
        let isGameCompleted = false;
        const winner = calculateWinner(current.squares);
        if (winner) {
            status = `Winner is ${winner}`;
            isGameCompleted = true;
        } else {
            status = `Next is ${this.state.isNextValueX ? 'X' : 'O'}`;
        }

        return (
            <div className="game">
                <h1>Tic-Tac-Toe</h1>
                <Board
                    squares={current.squares}
                    onClick={this.handleClick}
                />
                <div className="game-status">
                   Status: {status}
                    {isGameCompleted ? (
                        <button
                            className="game-reset"
                            onClick={this.resetGame}
                        >
                            Play again!
                        </button>
                    ) : null}
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Game;
