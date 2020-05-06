const canvas = document.getElementById("sandpile-canvas");
const width = canvas.width;
const height = canvas.height;
const ctx = canvas.getContext("2d");
ctx.fillRect(0, 0, width, height);

const timestepInput = document.querySelector("#timestep-slider");
let pause = true;

const pauseBtn = document.querySelector("#pause-button");

let renderGuidelines = true;

function populate() {
  equivPixelArr[seedPixelIndex] = parseInt(sandVal);
  console.log(equivPixelArr[seedPixelIndex], parseInt(sandVal));
  console.log(equivPixelArr[seedPixelIndex]);
  console.log("Populating");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);
  draw();
}

/** ===================== LISTENERS ===================== */

pauseBtn.addEventListener("click", () => {
  if (pause === false) {
    pause = true;
    showGuidelines && renderGuidelines == true;
    pauseBtn.previousSibling.textContent = "Play";
    drawGuidelines();
    console.log("Pause was false and now is true");
  } else {
    pause = false;
    renderGuidelines = false;
    console.log("Pause was true and now is false");
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
    pauseBtn.previousSibling.textContent = "Paused";
    //populate();
  }
});

const spreadSlider = document.querySelector("#spread-slider");
let spreadVal = spreadSlider.value;
spreadSlider.addEventListener("mousemove", () => {
  spreadVal = spreadSlider.value;
});

const sandInput = document.querySelector("#sandpile");
const sandBtn = document.querySelector("#add-sand");
let sandVal = sandInput.value;
sandBtn.addEventListener("click", () => {
  sandVal = sandInput.value;
  //sandpile = sandVal;
  console.log(sandVal);
});

const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  for (let i = 0; i < equivPixelArr.length; i++) {
    equivPixelArr[i] = 0;
    nextPixelArr[i] = 0;
  }
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);
});

canvas.addEventListener("click", (e) => {
  mouseX = e.clientX - canvas.offsetLeft;
  mouseY = e.clientY - canvas.offsetTop;
});

const freeChkbx = document.querySelector("#free");
canvas.addEventListener("click", (e) => {
  if (freeChkbx.checked) {
    seedPixelIndex = mouseX + mouseY * width;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
    populate();
  }
});

/** ===================== OPTIONS ===================== */

class Vector {
  constructor(x, y, mag) {
    this.x = x;
    this.y = y;
    this.mag = mag;
  }
  static getMag = function (x, y) {
    Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  };
}

// Rotation maths stuff

const degToRad = function (deg) {
  return (deg * Math.PI) / 180;
};

const getHyp = function (x, y) {
  triHyp = Math.sqrt(Math.pow(triX, 2) + Math.pow(triY, 2));
  return triHyp;
};

// Rotate controls
const rotateSlider = document.querySelector("#rotate-slider");
let rotateVal = rotateSlider.value;
rotateSlider.addEventListener("mousemove", () => {
  rotateVal = rotateSlider.value;
});

// Drop sand in center
const centerChkbx = document.querySelector("#center");

let circleAngles = 0;
let circleWidths = Math.cos(circleAngles);

const centerStartPoint = new Vector(width / 2, height / 2, undefined);
let centerLineRight = new Vector(centerStartPoint.x, centerStartPoint.y, width);

let centerStrokeStyle = "rgba(255,255,255,1)";
let centerPointStrokeStyle = "rgba(190,0,0)";

function drawCenterLine() {
  ctx.beginPath();
  ctx.moveTo(centerStartPoint.x, centerStartPoint.y);
  ctx.lineTo(
    centerStartPoint.x + centerLineRight.mag * Math.cos(degToRad(-rotateVal)),
    centerStartPoint.y + centerLineRight.mag * Math.sin(degToRad(-rotateVal))
  );
  ctx.strokeStyle = centerStrokeStyle;
  ctx.lineWidth = 0.2;
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(centerStartPoint.x, centerStartPoint.y);
  ctx.lineTo(
    centerStartPoint.x - centerLineRight.mag * Math.cos(degToRad(-rotateVal)),
    centerStartPoint.y - centerLineRight.mag * Math.sin(degToRad(-rotateVal))
  );
  ctx.strokeStyle = centerStrokeStyle;
  ctx.stroke();
  ctx.closePath();
}

function drawCenterPoint() {
  ctx.beginPath();
  ctx.ellipse(
    width / 2,
    height / 2,
    circleWidths,
    circleWidths,
    0,
    0,
    Math.PI * 2
  );
  ctx.strokeStyle = centerPointStrokeStyle;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}

// Draw vertical cross line

function drawCrossLine() {
  ctx.beginPath();
  ctx.moveTo(centerStartPoint.x, centerStartPoint.y);
  ctx.lineTo(
    centerStartPoint.x + width * Math.cos(degToRad(-rotateVal - 90)),
    centerStartPoint.y + width * Math.sin(degToRad(-rotateVal - 90))
  );
  ctx.strokeStyle = centerStrokeStyle;
  ctx.lineWidth = 0.2;
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(centerStartPoint.x, centerStartPoint.y);
  ctx.lineTo(
    centerStartPoint.x - width * Math.cos(degToRad(-rotateVal - 90)),
    centerStartPoint.y - width * Math.sin(degToRad(-rotateVal - 90))
  );
  ctx.strokeStyle = centerStrokeStyle;
  ctx.stroke();
  ctx.closePath();
}

// Draw vertical points
const twoVertChkbx = document.querySelector("#two-vertical");

function drawTopPoint() {
  ctx.beginPath();
  ctx.ellipse(
    centerStartPoint.x + spreadVal * Math.cos(degToRad(-rotateVal - 90)),
    centerStartPoint.y + spreadVal * Math.sin(degToRad(-rotateVal - 90)),
    circleWidths,
    circleWidths,
    0,
    0,
    Math.PI * 2
  );
  ctx.strokeStyle = centerPointStrokeStyle;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}
function drawBottomPoint() {
  ctx.beginPath();
  ctx.ellipse(
    centerStartPoint.x - spreadVal * Math.cos(degToRad(-rotateVal - 90)),
    centerStartPoint.y - spreadVal * Math.sin(degToRad(-rotateVal - 90)),
    circleWidths,
    circleWidths,
    0,
    0,
    Math.PI * 2
  );
  ctx.strokeStyle = centerPointStrokeStyle;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}

// Draw right and left points

let twoChkbx = document.querySelector("#two");

function drawRightPoint() {
  ctx.beginPath();
  ctx.ellipse(
    centerStartPoint.x + spreadVal * Math.cos(degToRad(-rotateVal)),
    centerStartPoint.y + spreadVal * Math.sin(degToRad(-rotateVal)),
    circleWidths,
    circleWidths,
    0,
    0,
    Math.PI * 2
  );
  ctx.strokeStyle = centerPointStrokeStyle;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}
function drawLeftPoint() {
  ctx.beginPath();
  ctx.ellipse(
    centerStartPoint.x - spreadVal * Math.cos(degToRad(-rotateVal)),
    centerStartPoint.y - spreadVal * Math.sin(degToRad(-rotateVal)),
    circleWidths,
    circleWidths,
    0,
    0,
    Math.PI * 2
  );
  ctx.strokeStyle = centerPointStrokeStyle;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}

// Draw four points and lines
const upperRight = new Vector(
  centerStartPoint.x + spreadVal,
  centerStartPoint.y - spreadVal,
  spreadVal
);
const bottomRight = new Vector(
  centerStartPoint.x + spreadVal,
  centerStartPoint.y + spreadVal,
  spreadVal
);
const bottomLeft = new Vector(
  centerStartPoint.x - spreadVal,
  centerStartPoint.y + spreadVal,
  spreadVal
);
const upperLeft = new Vector(
  centerStartPoint.x - spreadVal,
  centerStartPoint.y - spreadVal,
  spreadVal
);

function drawDiagLine1() {
  ctx.beginPath();
  ctx.moveTo(centerStartPoint.x, centerStartPoint.y);
  ctx.lineTo(
    centerStartPoint.x +
      centerLineRight.mag * Math.cos(degToRad(-rotateVal - 45)),
    centerStartPoint.y +
      centerLineRight.mag * Math.sin(degToRad(-rotateVal - 45))
  );
  ctx.strokeStyle = centerStrokeStyle;
  ctx.lineWidth = 0.2;
  ctx.stroke();
  ctx.closePath();
}
function drawDiagLine2() {
  ctx.beginPath();
  ctx.moveTo(centerStartPoint.x, centerStartPoint.y);
  ctx.lineTo(
    centerStartPoint.x + width * Math.cos(degToRad(-rotateVal - 135)),
    centerStartPoint.y + width * Math.sin(degToRad(-rotateVal - 135))
  );
  ctx.strokeStyle = centerStrokeStyle;
  ctx.lineWidth = 0.2;
  ctx.stroke();
  ctx.closePath();
}
function drawDiagLine3() {
  ctx.beginPath();
  ctx.moveTo(centerStartPoint.x, centerStartPoint.y);
  ctx.lineTo(
    centerStartPoint.x + width * Math.cos(degToRad(-rotateVal - 225)),
    centerStartPoint.y + width * Math.sin(degToRad(-rotateVal - 225))
  );
  ctx.strokeStyle = centerStrokeStyle;
  ctx.lineWidth = 0.2;
  ctx.stroke();
  ctx.closePath();
}
function drawDiagLine4() {
  ctx.beginPath();
  ctx.moveTo(centerStartPoint.x, centerStartPoint.y);
  ctx.lineTo(
    centerStartPoint.x +
      centerLineRight.mag * Math.cos(degToRad(-rotateVal - 315)),
    centerStartPoint.y +
      centerLineRight.mag * Math.sin(degToRad(-rotateVal - 315))
  );
  ctx.strokeStyle = centerStrokeStyle;
  ctx.lineWidth = 0.2;
  ctx.stroke();
  ctx.closePath();
}

// Draw four points
const fourChkbx = document.querySelector("#four");

function drawRightUpper() {
  let h = Math.sqrt(Math.pow(spreadVal, 2) + Math.pow(spreadVal, 2));
  ctx.beginPath();
  ctx.ellipse(
    centerStartPoint.x + h * Math.cos(degToRad(-rotateVal - 45)),
    centerStartPoint.y + h * Math.sin(degToRad(-rotateVal - 45)),
    circleWidths,
    circleWidths,
    0,
    0,
    Math.PI * 2
  );
  ctx.strokeStyle = centerPointStrokeStyle;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}

function drawRightBottom() {
  let h = Math.sqrt(Math.pow(spreadVal, 2) + Math.pow(spreadVal, 2));
  ctx.beginPath();
  ctx.ellipse(
    centerStartPoint.x + h * Math.cos(degToRad(-rotateVal + 45)),
    centerStartPoint.y + h * Math.sin(degToRad(-rotateVal + 45)),
    circleWidths,
    circleWidths,
    0,
    0,
    Math.PI * 2
  );
  ctx.strokeStyle = centerPointStrokeStyle;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}
function drawLeftBottom() {
  let h = Math.sqrt(Math.pow(spreadVal, 2) + Math.pow(spreadVal, 2));
  ctx.beginPath();
  ctx.ellipse(
    centerStartPoint.x + h * Math.cos(degToRad(-rotateVal + 135)),
    centerStartPoint.y + h * Math.sin(degToRad(-rotateVal + 135)),
    circleWidths,
    circleWidths,
    0,
    0,
    Math.PI * 2
  );
  ctx.strokeStyle = centerPointStrokeStyle;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}
function drawLeftUpper() {
  let h = Math.sqrt(Math.pow(spreadVal, 2) + Math.pow(spreadVal, 2));
  ctx.beginPath();
  ctx.ellipse(
    centerStartPoint.x + h * Math.cos(degToRad(-rotateVal + 225)),
    centerStartPoint.y + h * Math.sin(degToRad(-rotateVal + 225)),
    circleWidths,
    circleWidths,
    0,
    0,
    Math.PI * 2
  );
  ctx.strokeStyle = centerPointStrokeStyle;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}

/** ===================== COLORS ===================== */

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
//let sandpile = sandVal;

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
    equivPixelArr[i] > 0 && paint(i);
  }
}

function pauseUnpause() {
  if (pause === false) {
    for (let i = 0; i < timestepInput.value; i++) {
      update();
    }
    paintEverything();
    requestAnimationFrame(draw);
  }
}

const showGuidelines = document.querySelector("#show-guidelines");
const drawGuidelines = () => {
  console.log("Rendering guidelines");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);
  if (centerChkbx.checked) {
    drawCenterPoint();
  }

  if (twoChkbx.checked) {
    drawRightPoint();
    drawLeftPoint();
  }

  if (fourChkbx.checked) {
    drawRightUpper();
    drawRightBottom();
    drawLeftBottom();
    drawLeftUpper();
  }

  if (twoVertChkbx.checked) {
    drawTopPoint();
    drawBottomPoint();
  }

  drawCenterLine();
  drawCrossLine();
  drawDiagLine1();
  drawDiagLine2();
  drawDiagLine3();
  drawDiagLine4();

  // I'm paranoid, leave alone, mmkay?
  circleAngles < 1000 ? (circleAngles += 0.2) : (circleAngles = 0);
  circleWidths = Math.sin(circleAngles) + 10;
  showGuidelines.checked && requestAnimationFrame(drawGuidelines);
};
drawGuidelines();

function draw() {
  console.log("Rendering main");
  pauseUnpause();
}
