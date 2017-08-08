//得到top，left值
function getTop(i, j) {
  return 20 + i * 120;
}

function getLeft(i, j) {
  return 20 + j * 120;
}

function updateScore(score) {
  $('#score').text(score);
}
//判断水平和垂直方向中间是否有阻隔
function noHBlock(row, col1, col2, grid) { //col1>col2
  for (var s = col2 + 1; s < col1; s++) {
    if (grid[row][s] !== 0) return false;
  }

  return true;

}

function noVBlock(row1, row2, col, grid) { //row1>row2
  for (var s = row2 + 1; s < row1; s++) {
    if (grid[s][col] !== 0) return false;
  }
  return true;

}
//判断是否可以移动
function canMoveLeft(board) {
  for (var i = 0; i < 4; i++) {
    for (var j = 1; j < 4; j++) {
      if (board[i][j] !== 0) {
        if (board[i][j - 1] === 0 || board[i][j - 1] === board[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
}

function canMoveRight(board) {
  for (var i = 0; i < 4; i++) {
    for (var j = 2; j >= 0; j--) {
      if (board[i][j] !== 0) {
        if (board[i][j + 1] === 0 || board[i][j + 1] === board[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
}

function canMoveUp(board) {
  for (var i = 1; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j] !== 0) {
        if (board[i - 1][j] === 0 || board[i - 1][j] === board[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
}

function canMoveDown(board) {
  for (var i = 2; i >= 0; i--) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j] !== 0) {
        if (board[i + 1][j] === 0 || board[i + 1][j] === board[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
}
//判断游戏是否结束
function nospace(board) {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        return false;
      }
    }
  }
  return true;
}

function nomove(board) {
  if (canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board)) {
    return false;
  }
  return true;
}

function isGameOver(board) {
  if (nospace(board) && nomove(board)) {
    alert('Game over');
  }
}
//动画
function showNumberWithAnimation(x, y, num) {
  var numberCell = $("#number-cell-" + x + "-" + y);
  numberCell.css({
    'background-color': numberColor(num),
  }).text(num);
  numberCell.animate({
    width: 100,
    height: 100,
    top: getTop(x, y),
    left: getLeft(x, y)
  }, 50);
}

function moveWithAnimation(i, j, s, k) {
  var numberCell = $("#number-cell-" + i + "-" + j);
  numberCell.animate({
    top: getTop(s, k),
    left: getLeft(s, k)
  }, 200);
}

function numberColor(num) {
  switch (num) {
    case 2:
      return "#eee4da";
    case 4:
      return "#ede0c8";
    case 8:
      return "#f2b179";
    case 16:
      return "#f59563";
    case 32:
      return "#f67c5f";
    case 64:
      return "#f65e3b";
    case 128:
      return "#edcf72";
    case 256:
      return "#edcc61";
    case 512:
      return "#9c0";
    case 1024:
      return "#33b5e5";
    case 2048:
      return "#09c";
    case 4096:
      return "#a6c";
    case 8192:
      return "#93c";
  }
}
