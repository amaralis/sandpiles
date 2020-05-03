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

const pixelData = ctx.getImageData(0, 0, width, height);
const equivPixelArr = new Array(pixelData.data.length / 4);

const sandpile = 16;

// Loop through image pixels, skipping green, blue, and alpha indices;
for (let i = 0; i < pixelData.data.length; i += 4) {
  equivPixelArr[i / 4] = 0; // Equivalent index for the straight array
}

const seedPixelIndex = equivPixelArr.length / 2 + 150;

function populate() {
  // Find center
  equivPixelArr[seedPixelIndex] = sandpile;
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

function topple(index) {
  equivPixelArr[index] -= 4;
  // Send one grain up
  equivPixelArr[index - width] += 1;
  equivPixelArr[index - width] > 3 && topple(equivPixelArr[index - width]);
  // Send one grain right
  equivPixelArr[index + 1] += 1;
  equivPixelArr[index + 1] > 3 && topple(equivPixelArr[index + 1]);
  // Send one grain down
  equivPixelArr[index + width] += 1;
  equivPixelArr[index + width] > 3 && topple(equivPixelArr[index + width]);
  // Send one grain left
  equivPixelArr[index - 1] += 1;
  equivPixelArr[index - 1] > 3 && topple(equivPixelArr[index - 1]);
}

function update() {
  // Distribute sandpile for every cell and topple
  for (let i = 0; i < equivPixelArr.length; i++) {
    equivPixelArr[i] > 3 && topple(i);
  }
  for (let i = 0; i < equivPixelArr.length; i++) {
    paint(i);
  }
}

populate();
// console.log(
//   `Seed index ${equivPixelArr.length / 2 + 150} has ${
//     equivPixelArr[equivPixelArr.length / 2 + 150]
//   } grains of sand`
// );

// update();

// console.log(`Index 45150 (seed) has ${equivPixelArr[45150]} grains of sand`);
// console.log(`Index 45151 has ${equivPixelArr[45151]} grains of sand`);
// console.log(`Index 45149 has ${equivPixelArr[45149]} grains of sand`);
// console.log(`Index 45450 has ${equivPixelArr[45450]} grains of sand`);
// console.log(`Index 44485 has ${equivPixelArr[44850]} grains of sand`);

// update();

// console.log(`Index 45150 (seed) has ${equivPixelArr[45150]} grains of sand`);
// console.log(`Index 45151 has ${equivPixelArr[45151]} grains of sand`);
// console.log(`Index 45149 has ${equivPixelArr[45149]} grains of sand`);
// console.log(`Index 45450 has ${equivPixelArr[45450]} grains of sand`);
// console.log(`Index 44485 has ${equivPixelArr[44850]} grains of sand`);

// update();

// console.log(`Index 45150 (seed) has ${equivPixelArr[45150]} grains of sand`);
// console.log(`Index 45151 has ${equivPixelArr[45151]} grains of sand`);
// console.log(`Index 45149 has ${equivPixelArr[45149]} grains of sand`);
// console.log(`Index 45450 has ${equivPixelArr[45450]} grains of sand`);
// console.log(`Index 44485 has ${equivPixelArr[44850]} grains of sand`);

// update();

// console.log(`Index 45150 (seed) has ${equivPixelArr[45150]} grains of sand`);
// console.log(`Index 45151 has ${equivPixelArr[45151]} grains of sand`);
// console.log(`Index 45149 has ${equivPixelArr[45149]} grains of sand`);
// console.log(`Index 45450 has ${equivPixelArr[45450]} grains of sand`);
// console.log(`Index 44485 has ${equivPixelArr[44850]} grains of sand`);

// update();

// console.log(`Index 45150 (seed) has ${equivPixelArr[45150]} grains of sand`);
// console.log(`Index 45151 has ${equivPixelArr[45151]} grains of sand`);
// console.log(`Index 45149 has ${equivPixelArr[45149]} grains of sand`);
// console.log(`Index 45450 has ${equivPixelArr[45450]} grains of sand`);
// console.log(`Index 44485 has ${equivPixelArr[44850]} grains of sand`);

// update();

// console.log(`Index 45150 (seed) has ${equivPixelArr[45150]} grains of sand`);
// console.log(`Index 45151 has ${equivPixelArr[45151]} grains of sand`);
// console.log(`Index 45149 has ${equivPixelArr[45149]} grains of sand`);
// console.log(`Index 45450 has ${equivPixelArr[45450]} grains of sand`);
// console.log(`Index 44485 has ${equivPixelArr[44850]} grains of sand`);

function draw() {
  update();
  requestAnimationFrame(draw);
}
draw();
