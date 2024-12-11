import React, { useState } from 'react';
import './styles.css'; // 确保引入样式文件

// 定义棋盘大小
const BOARD_SIZE = 15;

// 判断胜负的函数
const checkWin = (board, rowIndex, cellIndex, player) => {
  // 检查横向
  let count = 0;
  for (let j = cellIndex - 4; j <= cellIndex + 4; j++) {
    if (j >= 0 && j < BOARD_SIZE && board[rowIndex][j] === player) {
      count++;
      if (count === 5) {
        return true;
      }
    } else {
      count = 0;
    }
  }
  // 检查纵向
  count = 0;
  for (let i = rowIndex - 4; i <= rowIndex + 4; i++) {
    if (i >= 0 && i < BOARD_SIZE && board[i][cellIndex] === player) {
      count++;
      if (count === 5) {
        return true;
      }
    } else {
      count = 0;
    }
  }
  // 检查正斜向
  count = 0;
  for (let k = -4; k <= 4; k++) {
    let i = rowIndex + k;
    let j = cellIndex + k;
    if (i >= 0 && i < BOARD_SIZE && j >= 0 && j < BOARD_SIZE && board[i][j] === player) {
      count++;
      if (count === 5) {
        return true;
      }
    } else {
      count = 0;
    }
  }
  // 检查反斜向
  count = 0;
  for (let k = -4; k <= 4; k++) {
    let i = rowIndex + k;
    let j = cellIndex - k;
    if (i >= 0 && i < BOARD_SIZE && j >= 0 && j < BOARD_SIZE && board[i][j] === player) {
      count++;
      if (count === 5) {
        return true;
      }
    } else {
      count = 0;
    }
  }
  return false;
};

const Board = () => {
  // 棋盘状态，使用二维数组表示，0表示无棋子，1表示黑棋，2表示白棋
  const [board, setBoard] = useState(() => {
    const initialBoard = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      initialBoard[i] = [];
      for (let j = 0; j < BOARD_SIZE; j++) {
        initialBoard[i][j] = 0;
      }
    }
    return initialBoard;
  });
  // 当前落子玩家，1为黑棋，2为白棋
  const [currentPlayer, setCurrentPlayer] = useState(1);

  // 处理点击棋盘格子的事件函数
  const handleClick = (rowIndex, cellIndex) => {
    if (board[rowIndex][cellIndex] !== 0) {
      return; // 防止重复落子
    }
    const newBoard = [...board];
    newBoard[rowIndex][cellIndex] = currentPlayer;
    // 调用checkWin函数判断是否获胜
    if (checkWin(newBoard, rowIndex, cellIndex, currentPlayer)) {
      const playerName = currentPlayer === 1 ? '黑棋' : '白棋';
      alert(`${playerName}获胜！`);
    } else {
      // 若未获胜，切换当前玩家
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
    setBoard(newBoard);
  };

  // 重置游戏
  const resetGame = () => {
    const initialBoard = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      initialBoard[i] = [];
      for (let j = 0; j < BOARD_SIZE; j++) {
        initialBoard[i][j] = 0;
      }
    }
    setBoard(initialBoard);
    setCurrentPlayer(1);
  };

  return (
    <div>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, cellIndex) => (
            <div
            key={cellIndex}
            style={{
                width: '30px',
                height: '30px',
                border: '1px solid black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: (rowIndex + cellIndex) % 2 === 0? '#f0d9b5' : '#b58863'
            }}
            onClick={() => handleClick(rowIndex, cellIndex)}
        >
            {cell === 1 && <span className="black-piece"></span>}
            {cell === 2 && <span className="white-piece"></span>}
        </div>
          ))}
        </div>
      ))}
      <button onClick={resetGame}>重置游戏</button>
    </div>
  );
};

export default Board;