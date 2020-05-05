const canvas = document.getElementById("sandpile-canvas");
const width = canvas.width;
const height = canvas.height;
const ctx = canvas.getContext("2d");
ctx.fillRect(0, 0, width, height);

const timestepSlider = document.querySelector("#timestep-slider");
let sliderVal = timestepSlider.value;
let pause = false;

const pauseBtn = document.querySelector("#pause-button");

pauseBtn.addEventListener("click", () => {
  if (pause === false) {
    pause = true;
  } else {
    pause = false;
    draw();
  }
});

const sandInput = document.querySelector("#sandpile");
const sandBtn = document.querySelector("#add-sand");
let sandVal = sandInput.value;
sandBtn.addEventListener("click", () => {
  sandVal = sandInput.value;
  sandpile = sandVal;
  console.log(sandVal);
});

const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  pause = true;
  for (let i = 0; i < equivPixelArr.length; i++) {
    equivPixelArr[i] = 0;
    nextPixelArr[i] = 0;
  }
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);
});

canvas.addEventListener("click", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

canvas.addEventListener("click", (e) => {
  seedPixelIndex = mouseX + mouseY * width;
  populate();
  draw();
});

function drawRectFull(index) {
  ctx.fillStyle = "#92EDE3";
  ctx.fillRect(
    index % width, // x
    index / width, // y
    1,
    1
  );
}
function drawRect3(index) {
  ctx.fillStyle = "#133964";
  ctx.fillRect(
    index % width, // x
    index / width, // y
    1,
    1
  );
}
function drawRect2(index) {
  ctx.fillStyle = "#A4610D";
  ctx.fillRect(
    index % width, // x
    index / width, // y
    1,
    1
  );
}
function drawRect1(index) {
  ctx.fillStyle = "#3F9F7E";
  ctx.fillRect(
    index % width, // x
    index / width, // y
    1,
    1
  );
}

function paint(index) {
  if (equivPixelArr[index] > 3) {
    drawRectFull(index);
  }
  if (equivPixelArr[index] === 3) {
    drawRect3(index);
  }
  if (equivPixelArr[index] === 2) {
    drawRect2(index);
  }
  if (equivPixelArr[index] === 1) {
    drawRect1(index);
  }
}

function toppleUp(currentIndex) {
  nextPixelArr[currentIndex]++;
  //paint(nextPixelArr[currentIndex]);
}
function toppleRight(currentIndex) {
  nextPixelArr[currentIndex]++;
  //(nextPixelArr[currentIndex]);
}
function toppleDown(currentIndex) {
  nextPixelArr[currentIndex]++;
  //paint(nextPixelArr[currentIndex]);
}
function toppleLeft(currentIndex) {
  nextPixelArr[currentIndex]++;
  //paint(nextPixelArr[currentIndex]);
}

function topple(currentIndex) {
  nextPixelArr[currentIndex] += equivPixelArr[currentIndex] - 4;

  //paint(nextPixelArr[currentIndex]);
  !(currentIndex < width) && toppleUp(currentIndex - width);
  !rightEdgeArr.includes(currentIndex) && toppleRight(currentIndex + 1);
  !(currentIndex > nextPixelArr.length - width) &&
    toppleDown(currentIndex + width);
  !leftEdgeArr.includes(currentIndex) && toppleLeft(currentIndex - 1);
}

let rightEdgeArr = [];
let leftEdgeArr = [];

function rightEdge(arr, width) {
  for (let i = 0; i <= arr.length; i += width) {
    i > 0 && rightEdgeArr.push(i - 1);
  }
}

function leftEdge(arr, width) {
  for (let i = 0; i <= arr.length; i += width) {
    i > 0 && leftEdgeArr.push(i);
  }
}

function populate() {
  // Find center
  equivPixelArr[seedPixelIndex] = sandpile;
}

const pixelData = ctx.getImageData(0, 0, width, height);

let equivPixelArr = new Array(pixelData.data.length / 4);
let nextPixelArr = new Array(pixelData.data.length / 4);
for (let i = 0; i < nextPixelArr.length; i++) {
  nextPixelArr[i] = 0;
}

// Loop through image pixels, skipping green, blue, and alpha indices;
for (let i = 0; i < pixelData.data.length; i += 4) {
  equivPixelArr[i / 4] = 0; // Equivalent index for the straight array
}

rightEdge(equivPixelArr, width);
leftEdge(equivPixelArr, width);

let mouseX = 0;
let mouseY = 0;

let seedPixelIndex = 0;
let sandpile = sandVal;

function update() {
  nextPixelArr = new Array(pixelData.data.length / 4);
  for (let i = 0; i < nextPixelArr.length; i++) {
    nextPixelArr[i] = 0;
  }

  // Copy every cell that won't topple to next step's array
  for (let i = 0; i < equivPixelArr.length; i++) {
    if (equivPixelArr[i] < 4) {
      nextPixelArr[i] = equivPixelArr[i];
      //paint(i);
    }
  }

  for (let i = 0; i < equivPixelArr.length; i++) {
    if (equivPixelArr[i] > 3) {
      topple(i);
      //paint(i);
    }
  }

  equivPixelArr = nextPixelArr;
}

function paintEverything() {
  for (let i = 0; i < equivPixelArr.length; i++) {
    paint(i);
  }
}

function pauseUnpause() {
  if (pause === false) {
    for (let i = 0; i < timestepSlider.value; i++) {
      update();
    }
    paintEverything();
    requestAnimationFrame(draw);
  }
}

function draw() {
  pauseUnpause();
}
draw();
