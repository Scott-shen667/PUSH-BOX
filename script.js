const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const tileSize = 32; // 每个格子的大小
const cols = 10; // 地图宽度（格子数）
const rows = 10; // 地图高度（格子数）

// 地图元素定义
const WALL = 1;
const FLOOR = 0;
const BOX = 2;
const GOAL = 3;
const PLAYER = 4;

// 关卡地图
let level = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 2, 0, 0, 3, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 4, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// 玩家位置
let playerX = 3;
let playerY = 4;

// 绘制地图
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let tile = level[y][x];
      if (tile === WALL) {
        ctx.fillStyle = '#444';
      } else if (tile === FLOOR) {
        ctx.fillStyle = '#222';
      } else if (tile === BOX) {
        ctx.fillStyle = '#f4a261';
      } else if (tile === GOAL) {
        ctx.fillStyle = '#2a9d8f';
      } else if (tile === PLAYER) {
        ctx.fillStyle = '#e76f51';
      }
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}

// 移动逻辑
function movePlayer(dx, dy) {
  const newX = playerX + dx;
  const newY = playerY + dy;

  if (level[newY][newX] === WALL) return; // 墙壁

  if (level[newY][newX] === BOX) {
    const boxNewX = newX + dx;
    const boxNewY = newY + dy;
    if (level[boxNewY][boxNewX] === FLOOR || level[boxNewY][boxNewX] === GOAL) {
      level[newY][newX] = FLOOR;
      level[boxNewY][boxNewX] = BOX;
    } else {
      return; // 箱子不能移动
    }
  }

  if (level[newY][newX] === FLOOR || level[newY][newX] === GOAL) {
    level[playerY][playerX] = FLOOR;
    playerX = newX;
    playerY = newY;
    level[playerY][playerX] = PLAYER;
  }
}

// 监听键盘事件
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') movePlayer(0, -1);
  if (e.key === 'ArrowDown') movePlayer(0, 1);
  if (e.key === 'ArrowLeft') movePlayer(-1, 0);
  if (e.key === 'ArrowRight') movePlayer(1, 0);
  drawGame();
});

// 初始化游戏
drawGame();