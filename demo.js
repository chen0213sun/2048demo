var grid = [];
var score = 0;
var knocked = [];

$(document).ready(function() {
  newGame();
});
$('#newGame').click(function(event) {
  newGame();
});

function newGame() {
  init();
  randomNumber();
  randomNumber();
}
//初始化
function init() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      var cell = $('#grid-cell-' + i + '-' + j);
      cell.css({
        'top': getTop(i, j),
        'left': getLeft(i, j)
      });
    }
  }
  for (let i = 0; i < 4; i++) {
    grid[i] = new Array();
    knocked[i] = new Array();
    for (let j = 0; j < 4; j++) {
      grid[i][j] = 0;
      knocked[i][j] = false;
    }
  }
  score = 0;
  updateGridView();
  updateScore(score); 
}
//渲染棋盘
function updateGridView() {
  $('.number-cell').remove();
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      knocked[i][j] = false;
      $('#grid-container').append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
      var numberCell = $('#number-cell-' + i + '-' + j);
      if (grid[i][j] === 0) {
        numberCell.css({
          'width': 0,
          'height': 0,
          'top': getTop(i, j) + 50,
          'left': getLeft(i, j) + 50,
        });
      } else {
        numberCell.css({
          'width': 100,
          'height': 100,
          'top': getTop(i, j),
          'left': getLeft(i, j),
          'background-color': numberColor(grid[i][j])
        }).text(grid[i][j]);
      }

    }
  }
}
//随机位置生成一个数
function randomNumber() {
  /*if(noWhere(grid)){
    return false; //待完成
  }*/
  var ranx = parseInt(Math.floor(Math.random() * 4));
  var rany = parseInt(Math.floor(Math.random() * 4));
  while (grid[ranx][rany] !== 0) {
    ranx = parseInt(Math.floor(Math.random() * 4));
    rany = parseInt(Math.floor(Math.random() * 4));
  }
  var rannum = Math.random() < 0.5 ? 2 : 4;
  grid[ranx][rany] = rannum;
  showNumberWithAnimation(ranx, rany, rannum);
}
//左移
function moveleft() {
  if (!canMoveLeft(grid)) {
    return false;
  }
  for (var i = 0; i < 4; i++) {
    for (var j = 1; j < 4; j++) {
      if (grid[i][j] !== 0) {
        for (var k = 0; k < j; k++) {
          if (grid[i][k] === 0 && noHBlock(i, j, k, grid)) {
            moveWithAnimation(i, j, i, k);
            grid[i][k] = grid[i][j];
            grid[i][j] = 0;
            continue;
          } else if (grid[i][k] === grid[i][j] && noHBlock(i, j, k, grid) && !knocked[i][k]) {
            moveWithAnimation(i, j, i, k);
            grid[i][k] = grid[i][j] * 2;
            grid[i][j] = 0;
            score += grid[i][k];
            updateScore(score);
            knocked[i][k] = true;
            continue;
          }
        }
      }
    }
  }
  setTimeout('updateGridView()',200);

  return true;
}
//右移
function moveright() {
  if(!canMoveRight(grid)){
    return false;
  }
  for (var i = 0; i < 4; i++) {
    for (var j = 2; j >=0; j--) {
      if (grid[i][j] !== 0) {
        for (var k = 3; k > j; k--) {
          if (grid[i][k] === 0 && noHBlock(i, k, j, grid)) {
            moveWithAnimation(i, j, i, k);
            grid[i][k] = grid[i][j];
            grid[i][j] = 0;
            continue;
          } else if (grid[i][k] === grid[i][j] && noHBlock(i, k, j, grid) && !knocked[i][k]) {
            moveWithAnimation(i, j, i, k);
            grid[i][k] = grid[i][j] * 2;
            grid[i][j] = 0;
            score += grid[i][k];
            updateScore(score);
            knocked[i][k] = true;
            continue;
          }
        }
      }
    }
  }
  setTimeout('updateGridView()',200);
  return true;
}
//上移
function moveup() {
  if(!canMoveUp(grid)){
    return false;
  }
  for (var i = 1; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (grid[i][j] !== 0) {
        for (var k = 0; k < i; k++) {
          if (grid[k][j] === 0 && noVBlock(i, k, j, grid)) {
            moveWithAnimation(i,j,k,j);
            grid[k][j] = grid[i][j];
            grid[i][j] = 0;
            continue;
          } else if (grid[k][j] === grid[i][j] && noVBlock(i, k, j, grid) && !knocked[k][j]) {
            moveWithAnimation(i,j,k,j);
            grid[k][j] = grid[i][j] * 2;
            grid[i][j] = 0;
            score += grid[k][j];
            updateScore(score);
            knocked[k][j] = true;
            continue;
          }
        }
      }
    }
  }
  setTimeout('updateGridView()',200);
  return true;
}
//下移
function movedown() {
  if(!canMoveDown){
    return false;
  }
  for (var i = 2; i >=0; i--) {
    for (var j = 0; j < 4; j++) {
      if (grid[i][j] !== 0) {
        for (var k = 3; k > i; k--) {
          if (grid[k][j] === 0 && noVBlock(k, i, j, grid)) {
            moveWithAnimation(i,j,k,j);
            grid[k][j] = grid[i][j];
            grid[i][j] = 0;
            continue;
          } else if (grid[k][j] === grid[i][j] && noVBlock(k, i, j, grid) && !knocked[k][j]) {
            moveWithAnimation(i,j,k,j);
            grid[k][j] = grid[i][j] * 2;
            grid[i][j] = 0;
            score += grid[k][j];
            updateScore(score);
            knocked[k][j] = true;
            continue;
          }
        }
      }
    }
  }
  setTimeout('updateGridView()',200);
  return true;
}

//键盘监听
$(document).keydown(function(event) {
  switch (event.keyCode) {
    case 37:
      event.preventDefault();
      if (moveleft()) {
        setTimeout('randomNumber()',210);
        setTimeout('isGameOver(grid)',300);
      }
      break;
      case 39:
      event.preventDefault();
      if(moveright()){
        setTimeout('randomNumber()',210);
        setTimeout('isGameOver(grid)',300);
      }
      break;
      case 38:
      event.preventDefault();
      if(moveup()){
        setTimeout('randomNumber()',210);
        setTimeout('isGameOver(grid)',300);
      }
      break;
      case 40:
      event.preventDefault();
      if(movedown()){
        setTimeout('randomNumber()',210);
        setTimeout('isGameOver(grid)',300);
      }
      break;
  }
});
