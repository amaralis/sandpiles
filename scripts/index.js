const canvas = document.getElementById("sandpile-canvas");
const width = canvas.width;
const height = canvas.height;
const ctx = canvas.getContext("2d");
// ctx.fillStyle = "red";
// ctx.fillRect(0, 0, width, height / 2);
// ctx.fillStyle = "green";
// ctx.fillRect(0, height / 2, width, height);
// ctx.fillStyle = "red";
ctx.fillRect(0, 0, width, height);

function populate() {
  // Find center
  equivPixelArr[seedPixelIndex] = sandpile;
  paint(seedPixelIndex);
  console.log(
    `Populating index ${equivPixelArr.length / 2 + 150} with ${sandpile} grains`
  );
}

function drawRectFull(index) {
  //console.log(`Drawing more than 3 grains at index ${index}`);
  ctx.fillStyle = "yellow";
  ctx.fillRect(
    index % width, // x
    index / width, // y
    1,
    1
  );
}
function drawRect3(index) {
  //console.log("Drawing 3 sand at index " + index);
  ctx.fillStyle = "cyan";
  ctx.fillRect(
    index % width, // x
    index / width, // y
    1,
    1
  );
}
function drawRect2(index) {
  //console.log("Drawing 2 sand at index " + index);
  ctx.fillStyle = "green";
  ctx.fillRect(
    index % width, // x
    index / width, // y
    1,
    1
  );
}
function drawRect1(index) {
  //console.log("Drawing 1 sand at index " + index);
  ctx.fillStyle = "red";
  ctx.fillRect(
    index % width, // x
    index / width, // y
    1,
    1
  );
}
function drawRect0(index) {
  //console.log("Drawing 0 sand at index " + index);
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
    //console.log(`Painting ${index}`);
    drawRectFull(index);
  }
  if (equivPixelArr[index] === 3) {
    //console.log(`Painting ${index}`);
    drawRect3(index);
  }
  if (equivPixelArr[index] === 2) {
    //console.log(`Painting ${index}`);
    drawRect2(index);
  }
  if (equivPixelArr[index] === 1) {
    //console.log(`Painting ${index}`);
    drawRect1(index);
  }
  equivPixelArr[index] === 0 && drawRect0(index);
}

function toppleUp(currentIndex) {
  nextPixelArr[currentIndex]++;
  paint(nextPixelArr[currentIndex]);

  // if (equivPixelArr[currentIndex - 1] > 4) {
  //   equivPixelArr[currentIndex] -= 4;
  //   toppleLeft(currentIndex - 1);
  // }
  // if (equivPixelArr[currentIndex + 1] > 4) {
  //   equivPixelArr[currentIndex] -= 4;
  //   toppleRight(currentIndex + 1);
  // }
}
function toppleRight(currentIndex) {
  nextPixelArr[currentIndex]++;
  paint(nextPixelArr[currentIndex]);

  // if (equivPixelArr[currentIndex - width] > 4) {
  //   equivPixelArr[currentIndex] -= 4;
  //   toppleUp(currentIndex - width);
  // }
  // if (equivPixelArr[currentIndex + width] > 4) {
  //   equivPixelArr[currentIndex] -= 4;
  //   toppleDown(currentIndex + width);
  // }
}
function toppleDown(currentIndex) {
  nextPixelArr[currentIndex]++;
  paint(nextPixelArr[currentIndex]);

  // if (equivPixelArr[currentIndex + 1] < 4) {
  //   equivPixelArr[currentIndex] -= 4;
  //   toppleRight(currentIndex + 1);
  // }
  // if (equivPixelArr[currentIndex - 1] < 4) {
  //   equivPixelArr[currentIndex] -= 4;
  //   toppleLeft(currentIndex - 1);
  // }
}
function toppleLeft(currentIndex) {
  nextPixelArr[currentIndex]++;
  paint(nextPixelArr[currentIndex]);

  // if (equivPixelArr[currentIndex - width] > 4) {
  //   equivPixelArr[currentIndex] -= 4;
  //   toppleUp(currentIndex - width);
  // }
  // if (equivPixelArr[currentIndex + width] > 4) {
  //   equivPixelArr[currentIndex] -= 4;
  //   toppleDown(currentIndex + width);
  // }
}

function topple(currentIindex) {
  // console.log("---Toppling---");
  let num = equivPixelArr[currentIindex];
  // console.log(
  //   `equivArr ${currentIindex} has ${equivPixelArr[currentIindex]} grains`
  // );
  // console.log(
  //   `nextArr ${currentIindex} has ${nextPixelArr[currentIindex]} grains`
  // );

  nextPixelArr[currentIindex] += equivPixelArr[currentIindex] - 4;

  // console.log(
  //   `equivArr ${currentIindex} has ${equivPixelArr[currentIindex]} grains`
  // );
  // console.log(
  //   `nextArr ${currentIindex} has ${nextPixelArr[currentIindex]} grains`
  // );
  paint(nextPixelArr[currentIindex]);
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
const sandpile = 3000;

function update() {
  nextPixelArr = new Array(pixelData.data.length / 4);
  for (let i = 0; i < nextPixelArr.length; i++) {
    nextPixelArr[i] = 0;
  }

  // console.log("---Updating---");

  // Distribute sandpile for every cell and topple
  for (let i = 0; i < equivPixelArr.length; i++) {
    if (equivPixelArr[i] < 4) {
      nextPixelArr[i] = equivPixelArr[i];

      paint(i);
    }
  }

  for (let i = 0; i < equivPixelArr.length; i++) {
    if (equivPixelArr[i] > 3) {
      // console.log("Seed equivArr: ", equivPixelArr[45150]);
      // console.log("Next arr: ", nextPixelArr[45150]);
      topple(i);
      paint(i);
    }
  }

  // console.log("Seed equivArr: ", equivPixelArr[45150]);
  // console.log("Next arr: ", nextPixelArr[45150]);

  equivPixelArr = nextPixelArr;

  // console.log("Seed equivArr: ", equivPixelArr[45150]);
  // console.log("Next arr: ", nextPixelArr[45150]);
}

populate();
// console.log(
//   `Seed index ${equivPixelArr.length / 2 + 150} has ${
//     equivPixelArr[equivPixelArr.length / 2 + 150]
//   } grains of sand`
// );
// console.log("Seed equivArr has", equivPixelArr[45150]);
// console.log("Next arr has", nextPixelArr[45150]);

// console.log(
//   `equivPixelArr 45150 (seed) has ${equivPixelArr[45150]} grains of sand`
// );
// console.log(`equivPixelArr 45151 has ${equivPixelArr[45151]} grains of sand`);
// console.log(`equivPixelArr 45149 has ${equivPixelArr[45149]} grains of sand`);
// console.log(`equivPixelArr 45450 has ${equivPixelArr[45450]} grains of sand`);
// console.log(`equivPixelArr 44485 has ${equivPixelArr[44850]} grains of sand`);
// console.log(
//   `nextPixelArr 45150 (seed) has ${nextPixelArr[45150]} grains of sand`
// );
// console.log(`nextPixelArr 45151 has ${nextPixelArr[45151]} grains of sand`);
// console.log(`nextPixelArr 45149 has ${nextPixelArr[45149]} grains of sand`);
// console.log(`nextPixelArr 45450 has ${nextPixelArr[45450]} grains of sand`);
// console.log(`nextPixelArr 44485 has ${nextPixelArr[44850]} grains of sand`);

// update();

// console.log(`Index 45150 (seed) has ${equivPixelArr[45150]} grains of sand`);
// console.log(`Index 45151 has ${equivPixelArr[45151]} grains of sand`);
// console.log(`Index 45149 has ${equivPixelArr[45149]} grains of sand`);
// console.log(`Index 45450 has ${equivPixelArr[45450]} grains of sand`);
// console.log(`Index 44485 has ${equivPixelArr[44850]} grains of sand`);
// console.log(
//   `nextPixelArr 45150 (seed) has ${nextPixelArr[45150]} grains of sand`
// );
// console.log(`nextPixelArr 45151 has ${nextPixelArr[45151]} grains of sand`);
// console.log(`nextPixelArr 45149 has ${nextPixelArr[45149]} grains of sand`);
// console.log(`nextPixelArr 45450 has ${nextPixelArr[45450]} grains of sand`);
// console.log(`nextPixelArr 44485 has ${nextPixelArr[44850]} grains of sand`);

// update();
// update();
// update();
// update();
// update();
// update();
// update();
// update();
// update();
// update();
// update();
// update();

// console.log(`Index 45150 (seed) has ${equivPixelArr[45150]} grains of sand`);
// console.log(`Index 45151 has ${equivPixelArr[45151]} grains of sand`);
// console.log(`Index 45149 has ${equivPixelArr[45149]} grains of sand`);
// console.log(`Index 45450 has ${equivPixelArr[45450]} grains of sand`);
// console.log(`Index 44485 has ${equivPixelArr[44850]} grains of sand`);
// console.log(
//   `nextPixelArr 45150 (seed) has ${nextPixelArr[45150]} grains of sand`
// );
// console.log(`nextPixelArr 45151 has ${nextPixelArr[45151]} grains of sand`);
// console.log(`nextPixelArr 45149 has ${nextPixelArr[45149]} grains of sand`);
// console.log(`nextPixelArr 45450 has ${nextPixelArr[45450]} grains of sand`);
// console.log(`nextPixelArr 44485 has ${nextPixelArr[44850]} grains of sand`);

function draw() {
  for (let i = 0; i < 30; i++) {
    update();
  }
  requestAnimationFrame(draw);
}
draw();
