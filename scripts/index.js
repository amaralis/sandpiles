const canvas = document.getElementById("sandpile-canvas");
const width = canvas.width;
const height = canvas.height;
const ctx = canvas.getContext("2d");
ctx.fillRect(0, 0, width, height);

function populate() {
  // Find center
  equivPixelArr[seedPixelIndex] = sandpile;
  //paint(seedPixelIndex);
  console.log(
    `Populating index ${equivPixelArr.length / 2 + 150} with ${sandpile} grains`
  );
}

function drawRectFull(index) {
  ctx.fillStyle = "yellow";
  ctx.fillRect(
    index % width, // x
    index / width, // y
    1,
    1
  );
}
function drawRect3(index) {
  ctx.fillStyle = "cyan";
  ctx.fillRect(
    index % width, // x
    index / width, // y
    1,
    1
  );
}
function drawRect2(index) {
  ctx.fillStyle = "green";
  ctx.fillRect(
    index % width, // x
    index / width, // y
    1,
    1
  );
}
function drawRect1(index) {
  ctx.fillStyle = "red";
  ctx.fillRect(
    index % width, // x
    index / width, // y
    1,
    1
  );
}
function drawRect0(index) {
  ctx.fillStyle = "#000";
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
  equivPixelArr[index] === 0 && drawRect0(index);
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

function topple(currentIindex) {
  nextPixelArr[currentIindex] += equivPixelArr[currentIindex] - 4;

  //paint(nextPixelArr[currentIindex]);
  toppleUp(currentIindex - width);
  toppleRight(currentIindex + 1);
  toppleDown(currentIindex + width);
  toppleLeft(currentIindex - 1);
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

const seedPixelIndex = equivPixelArr.length / 2 + 150;
const sandpile = 30000;

function update() {
  nextPixelArr = new Array(pixelData.data.length / 4);
  for (let i = 0; i < nextPixelArr.length; i++) {
    nextPixelArr[i] = 0;
  }

  // Distribute sandpile for every cell and topple
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

populate();

function paintEverything() {
  for (let i = 0; i < equivPixelArr.length; i++) {
    paint(i);
  }
}

function draw() {
  for (let i = 0; i < 100; i++) {
    update();
  }
  paintEverything();
  requestAnimationFrame(draw);
}
draw();
