// const bkgrdImg = new Image();
// bkgrdImg.src = "backgroundcanvas.jpg";
const canvas = document.getElementById("sandpile-canvas");
const UiCanvas = document.getElementById("ui-canvas");
UiCanvas.style.position = "absolute";
const width = canvas.width;
const height = canvas.height;
const ctx = canvas.getContext("2d");
const ctxUi = UiCanvas.getContext("2d");
UiCanvas.style.left = canvas.getBoundingClientRect().left + "px";
UiCanvas.style.top = canvas.getBoundingClientRect().top + window.scrollY + "px";

// bkgrdImg.onload = () => {
//   ctx.drawImage(bkgrdImg, 0, 0);
// };

const defaultColors1 = "#92EDE3";
const defaultColors2 = "#133964";
const defaultColors3 = "#A4610D";
const defaultColors4 = "#3F9F7E";

const cellColor1 = document.querySelector("#cell-color-1");
const cellColor2 = document.querySelector("#cell-color-2");
const cellColor3 = document.querySelector("#cell-color-3");
const cellColor4 = document.querySelector("#cell-color-4");

const colorSlider1 = document.querySelector("#one-grain");
const colorSlider2 = document.querySelector("#two-grains");
const colorSlider3 = document.querySelector("#three-grains");
const colorSlider4 = document.querySelector("#four-grains");

let color1 = "hsl(" + colorSlider1.value.toString() + ", 50%, 50%)";
let color2 = "hsl(" + colorSlider2.value.toString() + ", 50%, 50%)";
let color3 = "hsl(" + colorSlider3.value.toString() + ", 50%, 50%)";
let color4 = "hsl(" + colorSlider4.value.toString() + ", 50%, 50%)";

cellColor1.style.background =
  "hsl(" + colorSlider1.value.toString() + ", 50%, 50%)";
cellColor2.style.background =
  "hsl(" + colorSlider2.value.toString() + ", 50%, 50%)";
cellColor3.style.background =
  "hsl(" + colorSlider3.value.toString() + ", 50%, 50%)";
cellColor4.style.background =
  "hsl(" + colorSlider4.value.toString() + ", 50%, 50%)";

ctx.fillRect(0, 0, width, height);
function drawUi() {
  ctxUi.clearRect(0, 0, width, height);
  requestAnimationFrame(drawUi);
}
drawUi();

const timestepInput = document.querySelector("#timestep-slider");
let pause = true;

const pauseBtn = document.querySelector("#pause-button");

let seedArrVal = [];
let seedArrIndexes = [];

const updateBackedUpSand = function () {
  if (backedUpSand > 0) {
    backedUpSand = 0;
    for (let i = 0; i < seedArrIndexes.length; i++) {
      // Seed pixel index may need to start as undefined (would have to encounter a bug)

      // if (seedArrIndexes[i] === undefined) {
      //   seedArrIndexes[i] = 0;
      // }

      backedUpSand += equivPixelArr[seedArrIndexes[i]];
    }
  }
};

function populate() {
  if (centerChkbx.checked) {
    const index = width / 2 + (height / 2) * width;

    equivPixelArr[index] = parseInt(sandVal);

    seedArrVal.push(equivPixelArr[index]);
    seedArrIndexes.push(index);
  }

  if (twoChkbx.checked) {
    const indexXRight =
      centerStartPoint.x + spreadVal * Math.cos(degToRad(-rotateVal));
    const indexYRight =
      centerStartPoint.y + spreadVal * Math.sin(degToRad(-rotateVal));

    const indexRight =
      Math.round(indexXRight) + Math.round(indexYRight) * width;

    equivPixelArr[indexRight] = parseInt(sandVal);

    seedArrVal.push(equivPixelArr[indexRight]);
    seedArrIndexes.push(indexRight);

    const indexXLeft =
      centerStartPoint.x - spreadVal * Math.cos(degToRad(-rotateVal));
    const indexYLeft =
      centerStartPoint.y - spreadVal * Math.sin(degToRad(-rotateVal));

    const indexLeft = Math.round(indexXLeft) + Math.round(indexYLeft) * width;

    equivPixelArr[indexLeft] = parseInt(sandVal);

    seedArrVal.push(equivPixelArr[indexLeft]);
    seedArrIndexes.push(indexLeft);
  }

  if (twoVertChkbx.checked) {
    const indexXTop =
      centerStartPoint.x + spreadVal * Math.cos(degToRad(-rotateVal - 90));
    const indexYTop =
      centerStartPoint.y + spreadVal * Math.sin(degToRad(-rotateVal - 90));

    const indexTop = Math.round(indexXTop) + Math.round(indexYTop) * width;

    equivPixelArr[indexTop] = parseInt(sandVal);

    seedArrVal.push(equivPixelArr[indexTop]);
    seedArrIndexes.push(indexTop);

    const indexXBottom =
      centerStartPoint.x - spreadVal * Math.cos(degToRad(-rotateVal - 90));
    const indexYBottom =
      centerStartPoint.y - spreadVal * Math.sin(degToRad(-rotateVal - 90));

    const indexBottom =
      Math.round(indexXBottom) + Math.round(indexYBottom) * width;

    equivPixelArr[indexBottom] = parseInt(sandVal);

    seedArrVal.push(equivPixelArr[indexBottom]);
    seedArrIndexes.push(indexBottom);
  }

  if (fourChkbx.checked) {
    let h = Math.sqrt(Math.pow(spreadVal, 2) + Math.pow(spreadVal, 2));

    const xRightTop =
      centerStartPoint.x + h * Math.cos(degToRad(-rotateVal - 45));
    const yRightTop =
      centerStartPoint.y + h * Math.sin(degToRad(-rotateVal - 45));

    const indexRightTop = Math.round(xRightTop) + Math.round(yRightTop) * width;

    equivPixelArr[indexRightTop] = parseInt(sandVal);

    seedArrVal.push(equivPixelArr[indexRightTop]);
    seedArrIndexes.push(indexRightTop);

    const indexXRightBottom =
      centerStartPoint.x + h * Math.cos(degToRad(-rotateVal + 45));
    const indexYRightBottom =
      centerStartPoint.y + h * Math.sin(degToRad(-rotateVal + 45));

    const indexRightBottom =
      Math.round(indexXRightBottom) + Math.round(indexYRightBottom) * width;

    equivPixelArr[indexRightBottom] = parseInt(sandVal);

    seedArrVal.push(equivPixelArr[indexRightBottom]);
    seedArrIndexes.push(indexRightBottom);

    const xLeftBottom =
      centerStartPoint.x + h * Math.cos(degToRad(-rotateVal + 135));
    const yLeftBottom =
      centerStartPoint.y + h * Math.sin(degToRad(-rotateVal + 135));

    const indexLeftBottom =
      Math.round(xLeftBottom) + Math.round(yLeftBottom) * width;
    equivPixelArr[indexLeftBottom] = parseInt(sandVal);

    seedArrVal.push(equivPixelArr[indexLeftBottom]);
    seedArrIndexes.push(indexLeftBottom);

    const xLeftTop =
      centerStartPoint.x + h * Math.cos(degToRad(-rotateVal + 225));
    const yLeftTop =
      centerStartPoint.y + h * Math.sin(degToRad(-rotateVal + 225));

    const indexLeftTop = Math.round(xLeftTop) + Math.round(yLeftTop) * width;
    equivPixelArr[indexLeftTop] = parseInt(sandVal);
    console.log(equivPixelArr[indexLeftTop]);
    console.log("SandVal = " + sandVal);

    seedArrVal.push(equivPixelArr[indexLeftTop]);
    seedArrIndexes.push(indexLeftTop);
  }

  // Add all seed inexes' sand amount together and add the total to the total backed up sand
  // Backed up sand will have 1 extra grain if "free placement" is selected

  for (let i = 0; i < seedArrVal.length; i++) {
    if (seedArrVal[i] !== undefined) {
      backedUpSand += seedArrVal[i];
    }
  }
  backedUpSandCounter.textContent = parseInt(backedUpSand);
  seedArrVal = [];
}

/** ===================== LISTENERS ===================== */

const bottomDiv = document.querySelector(".bottom");

bottomDiv.addEventListener("mousemove", (e) => {
  const { target } = e;

  if (target === colorSlider1) {
    cellColor1.style.background =
      "hsl(" + colorSlider1.value.toString() + ", 50%, 50%)";
    color1 = "hsl(" + colorSlider1.value.toString() + ", 50%, 50%)";
  }
  if (target === colorSlider2) {
    cellColor2.style.background =
      "hsl(" + colorSlider2.value.toString() + ", 50%, 50%)";
    color2 = "hsl(" + colorSlider2.value.toString() + ", 50%, 50%)";
  }
  if (target === colorSlider3) {
    cellColor3.style.background =
      "hsl(" + colorSlider3.value.toString() + ", 50%, 50%)";
    color3 = "hsl(" + colorSlider3.value.toString() + ", 50%, 50%)";
  }
  if (target === colorSlider4) {
    cellColor4.style.background =
      "hsl(" + colorSlider4.value.toString() + ", 50%, 50%)";
    color4 = "hsl(" + colorSlider4.value.toString() + ", 50%, 50%)";
  }
});

const showGuidelines = document.querySelector("#show-guidelines");

const optionsDivLeft = document.querySelector(".left");
console.log(optionsDivLeft);
const optionsDivRight = document.querySelector(".right");

optionsDivLeft.addEventListener("click", (e) => {
  console.log("Clicked");
  const { target } = e;
  const { checked } = e.target;

  if (target === centerChkbx) {
    console.log("Center clicked");
    if (checked) {
      target.previousSibling.textContent =
        "Click here to turn off middle sand pile";

      target.parentNode.parentNode.style.background =
        "linear-gradient(cyan, rgb(0, 120, 120))";
    } else {
      target.previousSibling.textContent =
        "Click here to turn on middle sand piles";
      target.parentNode.parentNode.style.background = "none";
    }
  }

  if (target === showGuidelines) {
    if (checked) {
      target.parentNode.parentNode.style.background =
        "linear-gradient(cyan, rgb(0, 120, 120))";
    } else {
      target.parentNode.parentNode.style.background = "none";
    }
  }

  if (target === freeChkbx) {
    if (checked) {
      target.previousSibling.textContent =
        "Click here to disable free placement";
      target.parentNode.parentNode.style.background =
        "linear-gradient(cyan, rgb(0, 120, 120))";
    } else {
      target.previousSibling.textContent =
        "Click here to enable free placement";
      target.parentNode.parentNode.style.background = "none";
    }
  }
});

optionsDivRight.addEventListener("click", (e) => {
  const { target } = e;
  const { checked } = e.target;

  if (target === twoChkbx) {
    if (checked) {
      target.previousSibling.textContent =
        "Click here to turn off right and left sand piles";
      target.parentNode.parentNode.style.background =
        "linear-gradient(cyan, rgb(0, 120, 120))";
    } else {
      target.previousSibling.textContent =
        "Click here to turn on right and left sand piles";
      target.parentNode.parentNode.style.background = "none";
    }
  }

  if (target === twoVertChkbx) {
    if (checked) {
      target.previousSibling.textContent =
        "Click here to turn off top and bottom sand piles";
      target.parentNode.parentNode.style.background =
        "linear-gradient(cyan, rgb(0, 120, 120))";
    } else {
      target.previousSibling.textContent =
        "Click here to turn on top and bottom sand piles";
      target.parentNode.parentNode.style.background = "none";
    }
  }

  if (target === fourChkbx) {
    if (checked) {
      target.previousSibling.textContent =
        "Click here to turn off diagonal sand piles";
      target.parentNode.parentNode.style.background =
        "linear-gradient(cyan, rgb(0, 120, 120))";
    } else {
      target.previousSibling.textContent =
        "Click here to turn on diagonal sand piles";
      target.parentNode.parentNode.style.background = "none";
    }
  }
});

showGuidelines.addEventListener("click", () => {
  console.log("Show guidelines clicked. It is " + showGuidelines.checked);
  console.log("Show guidelines clicked. Pause is " + pause);
  if (showGuidelines.checked && pause) {
    UiCanvas.style.zIndex = 1;
    canvas.style.zIndex = -1;
    drawGuidelines();
  }
  if (!showGuidelines.checked && !pause) {
    UiCanvas.style.zIndex = -1;
    canvas.style.zIndex = 1;
    draw();
  }
});

const sandInput = document.querySelector("#sandpile");
const backedUpSandCounter = document.querySelector("#sand-left-counter");
const dumpBtn = document.querySelector("#dump");

let backedUpSand = 0;
let sandVal = 0;

sandInput.addEventListener("change", () => {
  sandInput.setAttribute("value", sandInput.value);
  sandVal = parseInt(sandInput.value);
  console.log(backedUpSand, sandVal);
});

dumpBtn.onclick = () => {
  sandVal = parseInt(sandInput.value);
  //backedUpSand = parseInt(sandVal);
  backedUpSandCounter.textContent = backedUpSand;
  populate();
};

const controlsDiv = document.querySelector(".controls-div");
controlsDiv.addEventListener("change", (e) => {
  if (e.target === sandInput) {
    dumpBtn.value = `Add ${sandpile.value} grains to your selected spots`;
  }
});

pauseBtn.addEventListener("click", (e) => {
  if (!pause) {
    pause = true;
    pauseBtn.value = "Play simulation";
    UiCanvas.style.zIndex = 1;
    canvas.style.zIndex = -1;
    showGuidelines.checked && drawGuidelines();
    // e.target.style = "background: linear-gradient(#634c83,#3c1746)";
    // e.target.style = "color:#aa9c7a;";
  } else {
    pause = false;
    canvas.style.zIndex = 1;
    UiCanvas.style.zIndex = -1;
    pauseBtn.value = "Pause simulation";
    // e.target.style = "background: linear-gradient(#8e7aaa,#542361)";
    // e.target.style = "color:lightgray;";
    // ctx.drawImage(bkgrdImg, 0, 0);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    draw();
  }
});

const spreadSlider = document.querySelector("#spread-slider");
let spreadVal = spreadSlider.value;
spreadSlider.addEventListener("mousemove", () => {
  spreadVal = spreadSlider.value;
});

const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  for (let i = 0; i < equivPixelArr.length; i++) {
    equivPixelArr[i] = 0;
    nextPixelArr[i] = 0;
  }
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(bkgrdImg, 0, 0);
});

const freeChkbx = document.querySelector("#free");

canvas.addEventListener("click", (e) => {
  mouseX = e.clientX - canvas.offsetLeft;
  mouseY = e.clientY + window.scrollY - canvas.offsetTop;

  if (freeChkbx.checked) {
    seedPixelIndex = mouseX + mouseY * width;

    equivPixelArr[seedPixelIndex] = parseInt(sandVal);

    seedArrVal.push(equivPixelArr[seedPixelIndex]);

    //populate();
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

// Draw center line

function drawCenterLine() {
  ctxUi.beginPath();
  ctxUi.moveTo(centerStartPoint.x, centerStartPoint.y);
  ctxUi.lineTo(
    centerStartPoint.x + centerLineRight.mag * Math.cos(degToRad(-rotateVal)),
    centerStartPoint.y + centerLineRight.mag * Math.sin(degToRad(-rotateVal))
  );
  ctxUi.strokeStyle = centerStrokeStyle;
  ctxUi.lineWidth = 1;
  ctxUi.stroke();
  ctxUi.closePath();

  ctxUi.beginPath();
  ctxUi.moveTo(centerStartPoint.x, centerStartPoint.y);
  ctxUi.lineTo(
    centerStartPoint.x - centerLineRight.mag * Math.cos(degToRad(-rotateVal)),
    centerStartPoint.y - centerLineRight.mag * Math.sin(degToRad(-rotateVal))
  );
  ctxUi.strokeStyle = centerStrokeStyle;
  ctxUi.stroke();
  ctxUi.closePath();
}

function drawCenterPoint() {
  ctxUi.beginPath();
  ctxUi.ellipse(
    width / 2,
    height / 2,
    circleWidths,
    circleWidths,
    0,
    0,
    Math.PI * 2
  );
  ctxUi.strokeStyle = centerPointStrokeStyle;
  ctxUi.lineWidth = 2;
  ctxUi.stroke();
  ctxUi.closePath();
}

// Draw right and left points

let twoChkbx = document.querySelector("#two");

function drawRightPoint() {
  ctxUi.beginPath();
  ctxUi.ellipse(
    centerStartPoint.x + spreadVal * Math.cos(degToRad(-rotateVal)),
    centerStartPoint.y + spreadVal * Math.sin(degToRad(-rotateVal)),
    circleWidths,
    circleWidths,
    0,
    0,
    Math.PI * 2
  );
  ctxUi.strokeStyle = centerPointStrokeStyle;
  ctxUi.lineWidth = 2;
  ctxUi.stroke();
  ctxUi.closePath();
}
function drawLeftPoint() {
  ctxUi.beginPath();
  ctxUi.ellipse(
    centerStartPoint.x - spreadVal * Math.cos(degToRad(-rotateVal)),
    centerStartPoint.y - spreadVal * Math.sin(degToRad(-rotateVal)),
    circleWidths,
    circleWidths,
    0,
    0,
    Math.PI * 2
  );
  ctxUi.strokeStyle = centerPointStrokeStyle;
  ctxUi.lineWidth = 2;
  ctxUi.stroke();
  ctxUi.closePath();
}

// Draw vertical cross line

function drawCrossLine() {
  ctxUi.beginPath();
  ctxUi.moveTo(centerStartPoint.x, centerStartPoint.y);
  ctxUi.lineTo(
    centerStartPoint.x + width * Math.cos(degToRad(-rotateVal - 90)),
    centerStartPoint.y + width * Math.sin(degToRad(-rotateVal - 90))
  );
  ctxUi.strokeStyle = centerStrokeStyle;
  ctxUi.lineWidth = 1;
  ctxUi.stroke();
  ctxUi.closePath();

  ctxUi.beginPath();
  ctxUi.moveTo(centerStartPoint.x, centerStartPoint.y);
  ctxUi.lineTo(
    centerStartPoint.x - width * Math.cos(degToRad(-rotateVal - 90)),
    centerStartPoint.y - width * Math.sin(degToRad(-rotateVal - 90))
  );
  ctxUi.strokeStyle = centerStrokeStyle;
  ctxUi.stroke();
  ctxUi.closePath();
}

// Draw vertical points
const twoVertChkbx = document.querySelector("#two-vertical");

function drawTopPoint() {
  ctxUi.beginPath();
  ctxUi.ellipse(
    centerStartPoint.x + spreadVal * Math.cos(degToRad(-rotateVal - 90)),
    centerStartPoint.y + spreadVal * Math.sin(degToRad(-rotateVal - 90)),
    circleWidths,
    circleWidths,
    0,
    0,
    Math.PI * 2
  );
  ctxUi.strokeStyle = centerPointStrokeStyle;
  ctxUi.lineWidth = 2;
  ctxUi.stroke();
  ctxUi.closePath();
}
function drawBottomPoint() {
  ctxUi.beginPath();
  ctxUi.ellipse(
    centerStartPoint.x - spreadVal * Math.cos(degToRad(-rotateVal - 90)),
    centerStartPoint.y - spreadVal * Math.sin(degToRad(-rotateVal - 90)),
    circleWidths,
    circleWidths,
    0,
    0,
    Math.PI * 2
  );
  ctxUi.strokeStyle = centerPointStrokeStyle;
  ctxUi.lineWidth = 2;
  ctxUi.stroke();
  ctxUi.closePath();
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
  ctxUi.beginPath();
  ctxUi.moveTo(centerStartPoint.x, centerStartPoint.y);
  ctxUi.lineTo(
    centerStartPoint.x +
      centerLineRight.mag * Math.cos(degToRad(-rotateVal - 45)),
    centerStartPoint.y +
      centerLineRight.mag * Math.sin(degToRad(-rotateVal - 45))
  );
  ctxUi.strokeStyle = centerStrokeStyle;
  ctxUi.lineWidth = 1;
  ctxUi.stroke();
  ctxUi.closePath();
}
function drawDiagLine2() {
  ctxUi.beginPath();
  ctxUi.moveTo(centerStartPoint.x, centerStartPoint.y);
  ctxUi.lineTo(
    centerStartPoint.x + width * Math.cos(degToRad(-rotateVal - 135)),
    centerStartPoint.y + width * Math.sin(degToRad(-rotateVal - 135))
  );
  ctxUi.strokeStyle = centerStrokeStyle;
  ctxUi.lineWidth = 1;
  ctxUi.stroke();
  ctxUi.closePath();
}
function drawDiagLine3() {
  ctxUi.beginPath();
  ctxUi.moveTo(centerStartPoint.x, centerStartPoint.y);
  ctxUi.lineTo(
    centerStartPoint.x + width * Math.cos(degToRad(-rotateVal - 225)),
    centerStartPoint.y + width * Math.sin(degToRad(-rotateVal - 225))
  );
  ctxUi.strokeStyle = centerStrokeStyle;
  ctxUi.lineWidth = 1;
  ctxUi.stroke();
  ctxUi.closePath();
}
function drawDiagLine4() {
  ctxUi.beginPath();
  ctxUi.moveTo(centerStartPoint.x, centerStartPoint.y);
  ctxUi.lineTo(
    centerStartPoint.x +
      centerLineRight.mag * Math.cos(degToRad(-rotateVal - 315)),
    centerStartPoint.y +
      centerLineRight.mag * Math.sin(degToRad(-rotateVal - 315))
  );
  ctxUi.strokeStyle = centerStrokeStyle;
  ctxUi.lineWidth = 1;
  ctxUi.stroke();
  ctxUi.closePath();
}

// Draw four points
const fourChkbx = document.querySelector("#four");

function drawRightUpper() {
  let h = Math.sqrt(Math.pow(spreadVal, 2) + Math.pow(spreadVal, 2));
  ctxUi.beginPath();
  ctxUi.ellipse(
    centerStartPoint.x + h * Math.cos(degToRad(-rotateVal - 45)),
    centerStartPoint.y + h * Math.sin(degToRad(-rotateVal - 45)),
    circleWidths,
    circleWidths,
    0,
    0,
    Math.PI * 2
  );
  ctxUi.strokeStyle = centerPointStrokeStyle;
  ctxUi.lineWidth = 2;
  ctxUi.stroke();
  ctxUi.closePath();
}

function drawRightBottom() {
  let h = Math.sqrt(Math.pow(spreadVal, 2) + Math.pow(spreadVal, 2));
  ctxUi.beginPath();
  ctxUi.ellipse(
    centerStartPoint.x + h * Math.cos(degToRad(-rotateVal + 45)),
    centerStartPoint.y + h * Math.sin(degToRad(-rotateVal + 45)),
    circleWidths,
    circleWidths,
    0,
    0,
    Math.PI * 2
  );
  ctxUi.strokeStyle = centerPointStrokeStyle;
  ctxUi.lineWidth = 2;
  ctxUi.stroke();
  ctxUi.closePath();
}
function drawLeftBottom() {
  let h = Math.sqrt(Math.pow(spreadVal, 2) + Math.pow(spreadVal, 2));
  ctxUi.beginPath();
  ctxUi.ellipse(
    centerStartPoint.x + h * Math.cos(degToRad(-rotateVal + 135)),
    centerStartPoint.y + h * Math.sin(degToRad(-rotateVal + 135)),
    circleWidths,
    circleWidths,
    0,
    0,
    Math.PI * 2
  );
  ctxUi.strokeStyle = centerPointStrokeStyle;
  ctxUi.lineWidth = 2;
  ctxUi.stroke();
  ctxUi.closePath();
}
function drawLeftUpper() {
  let h = Math.sqrt(Math.pow(spreadVal, 2) + Math.pow(spreadVal, 2));
  ctxUi.beginPath();
  ctxUi.ellipse(
    centerStartPoint.x + h * Math.cos(degToRad(-rotateVal + 225)),
    centerStartPoint.y + h * Math.sin(degToRad(-rotateVal + 225)),
    circleWidths,
    circleWidths,
    0,
    0,
    Math.PI * 2
  );
  ctxUi.strokeStyle = centerPointStrokeStyle;
  ctxUi.lineWidth = 2;
  ctxUi.stroke();
  ctxUi.closePath();
}

/** ===================== COLORS ===================== */

function drawRectFull(index) {
  ctx.fillStyle = color4;
  console.log(color1, color2, color3, color4);
  ctx.fillRect(
    index % width, // x
    index / width, // y
    1,
    1
  );
}
function drawRect3(index) {
  ctx.fillStyle = color3;
  ctx.fillRect(
    index % width, // x
    index / width, // y
    1,
    1
  );
}
function drawRect2(index) {
  ctx.fillStyle = color2;
  ctx.fillRect(
    index % width, // x
    index / width, // y
    1,
    1
  );
}
function drawRect1(index) {
  ctx.fillStyle = color1;
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
}
function toppleRight(currentIndex) {
  nextPixelArr[currentIndex]++;
}
function toppleDown(currentIndex) {
  nextPixelArr[currentIndex]++;
}
function toppleLeft(currentIndex) {
  nextPixelArr[currentIndex]++;
}

function topple(currentIndex) {
  nextPixelArr[currentIndex] += equivPixelArr[currentIndex] - 4;

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

function update() {
  nextPixelArr = new Array(pixelData.data.length / 4);
  for (let i = 0; i < nextPixelArr.length; i++) {
    nextPixelArr[i] = 0;
  }

  // Copy every cell that won't topple to next step's array
  for (let i = 0; i < equivPixelArr.length; i++) {
    if (equivPixelArr[i] < 4) {
      nextPixelArr[i] = equivPixelArr[i];
    }
  }

  for (let i = 0; i < equivPixelArr.length; i++) {
    if (equivPixelArr[i] > 3) {
      topple(i);
    }
  }

  equivPixelArr = nextPixelArr;
}

function paintEverything() {
  for (let i = 0; i < equivPixelArr.length; i++) {
    equivPixelArr[i] > 0 && paint(i);
  }
}

const drawGuidelines = () => {
  ctxUi.clearRect(0, 0, width, height);
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
  circleAngles < 100000 ? (circleAngles += 0.2) : (circleAngles = 0);

  circleWidths = Math.sin(circleAngles) + 10;
  if (showGuidelines.checked && pause === true) {
    requestAnimationFrame(drawGuidelines);
  }
};
drawGuidelines();

let backedUpSandFallBack = 0;

function draw() {
  updateBackedUpSand();
  backedUpSandCounter.textContent = backedUpSand;
  if (pause === false) {
    for (let i = 0; i < timestepInput.value; i++) {
      update();
    }
    paintEverything();
    requestAnimationFrame(draw);
  }
}
