
const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');
const undoEl = document.getElementById('undo'); 

const ctx = canvas.getContext('2d');
let size = 10;
let isPressed = false;
let color = 'black';
let x;
let y;
let drawnShapes = []; // Bhai ye drawn shapes store karne ke liye

canvas.width = window.innerWidth  
canvas.height = window.innerHeight - 100; 

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect(); // canvas ki size aur position lene ke liye
  const offsetX = e.clientX - rect.left; // X-coordinate calculate karne ke liye relative to the canvas
  const offsetY = e.clientY - rect.top; // Y-coordinate calculate karne ke liye relative to the canvas
  isPressed = true;
  x = offsetX;
  y = offsetY;
  storeShape(); // Shape ki starting point save karne ke liye
});

document.addEventListener('mouseup', () => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
      const rect = canvas.getBoundingClientRect(); // Get the size and position of the canvas
      const offsetX = e.clientX - rect.left; // Calculate the X-coordinate relative to the canvas
      const offsetY = e.clientY - rect.top; // Calculate the Y-coordinate relative to the canvas
      const x2 = offsetX;
      const y2 = offsetY;
      drawCircle(x2, y2);
      drawLine(x, y, x2, y2);
      x = x2;
      y = y2;
    }
  });
  
function updateSizeOnScreen() {
  sizeEl.innerText = size;
}

increaseBtn.addEventListener('click', () => {
  size += 1;
  if (size > 50) size = 50;
  updateSizeOnScreen();
});

decreaseBtn.addEventListener('click', () => {
  size -= 1;
  if (size < 5) size = 5;
  updateSizeOnScreen();
});

colorEl.addEventListener('change', (e) => color = e.target.value);

clearEl.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawnShapes = []; //  stored shapes clear karne ke liye
});

undoEl.addEventListener('click', () => {
  if (drawnShapes.length > 0) {
    drawnShapes.pop();
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // last shape remove karne ke liye
    redrawCanvas(); 
  }
});

function storeShape() {
  const shape = ctx.getImageData(0, 0, canvas.width, canvas.height); // Entire canvas store karne ke liye
  drawnShapes.push(shape); // Current canvas state ko array mai push karne ke liye
}

function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawnShapes.forEach((shape) => {
      ctx.putImageData(shape, 0, 0);
    });
  }
