
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let lane = 1; // middle lane
const laneWidth = canvas.width / 3;
const playerSize = 40;
const playerY = canvas.height - playerSize - 20;
let keys = {};
let touchStartX = null;

function drawPlayer() {
  const playerX = lane * laneWidth + (laneWidth - playerSize) / 2;
  ctx.fillStyle = '#5588ff';
  ctx.fillRect(playerX, playerY, playerSize, playerSize);
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  requestAnimationFrame(updateGame);
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' && lane > 0) lane--;
  if (e.key === 'ArrowRight' && lane < 2) lane++;
});

canvas.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].clientX;
});

canvas.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (dx > 30 && lane < 2) lane++; // swipe right
  else if (dx < -30 && lane > 0) lane--; // swipe left
});

updateGame();
