/** ===================== HANDLES, VARIABLES, INITIALIZERS ===================== */

const canvasWrapper = document.getElementById("canvas-wrapper");
const uiCanvas = document.getElementById("ui-canvas");
const pHDiv = document.querySelector(".pH-level-div");
const pHLabel = document.querySelector("#pH-level");
const pHInput = document.querySelector("#pH");
const bottomDiv = document.querySelector(".bottom");
const twoChkbx = document.querySelector("#two");
const showGuidelines = document.querySelector("#show-guidelines");
const optionsDivLeft = document.querySelector(".left");
const optionsDivRight = document.querySelector(".right");
const sandInput = document.querySelector("#sandpile");
const sandRemainingCounter = document.querySelector("#sand-left-counter");
const dumpBtn = document.querySelector("#dump");
const controlsDiv = document.querySelector(".controls-div");
const spreadSlider = document.querySelector("#spread-slider");
const reset = document.querySelector("#reset");
const freeChkbx = document.querySelector("#free");
const timestepInput = document.querySelector("#timestep-slider");
const pauseBtn = document.querySelector("#isPaused-button");
const cellColor1 = document.querySelector("#cell-color-1");
const cellColor2 = document.querySelector("#cell-color-2");
const cellColor3 = document.querySelector("#cell-color-3");
const cellColor4 = document.querySelector("#cell-color-4");
const colorSlider1 = document.querySelector("#one-grain");
const colorSlider2 = document.querySelector("#two-grains");
const colorSlider3 = document.querySelector("#three-grains");
const colorSlider4 = document.querySelector("#four-grains");
const canvas = document.getElementById("sandpile-canvas");
const ctx = canvas.getContext("2d");
const ctxUi = uiCanvas.getContext("2d");
const bg = document.querySelector("#bg");
const bgDiv = document.getElementById("bg-div");
const audio = document.querySelector("#Visionary-by-RamesesB");
const rotateSlider = document.querySelector("#rotate-slider");
const centerChkbx = document.querySelector("#center");
const twoVertChkbx = document.querySelector("#two-vertical");
const fourChkbx = document.querySelector("#four");

// VARIABLES

let spreadVal = spreadSlider.value;
let rotateVal = rotateSlider.value;
const width = canvas.width;
const height = canvas.height;
let sandRemaining = 0;
let sandInputVal = 0;
let mouseX = 0;
let mouseY = 0;
let seedCellIndex = 0;
let isPaused = true;
let color1 = "#92EDE3";
let color2 = "#133964";
let color3 = "#A4610D";
let color4 = "#3F9F7E";
// let color1 = "hsl(" + colorSlider1.value.toString() + ", 50%, 50%)";
// let color2 = "hsl(" + colorSlider2.value.toString() + ", 50%, 50%)";
// let color3 = "hsl(" + colorSlider3.value.toString() + ", 50%, 50%)";
// let color4 = "hsl(" + colorSlider4.value.toString() + ", 50%, 50%)";
let circleAngles = 0;
let circleWidths = Math.cos(circleAngles);
let centerStrokeStyle = "rgba(255,255,255,1)";
let centerPointStrokeStyle = "rgba(190,0,0)";
let isPopulated = false;

// INITIALIZERS

const pixelData = ctx.getImageData(0, 0, width, height);
let cellArr = new Array(pixelData.data.length / 4);
let nextCellArr = new Array(pixelData.data.length / 4);
let seedCellIndexes = [];
let seedCellValues = [];
let rightEdgeArr = [];
let leftEdgeArr = [];
let bgPhAngle = 0;
let sliderPhAngle = 0;
let cellPhAngle = 0;

document.getElementById("place-free").style.backgroundImage = "none";
document.getElementById("place-two").style.backgroundImage = "none";
document.getElementById("place-two-vertical").style.backgroundImage = "none";
document.getElementById("place-four").style.backgroundImage = "none";

cellColor1.style.background =
  "hsl(" + colorSlider1.value.toString() + ", 50%, 50%)";
cellColor2.style.background =
  "hsl(" + colorSlider2.value.toString() + ", 50%, 50%)";
cellColor3.style.background =
  "hsl(" + colorSlider3.value.toString() + ", 50%, 50%)";
cellColor4.style.background =
  "hsl(" + colorSlider4.value.toString() + ", 50%, 50%)";

let widthStr = canvas.width.toString() + "px";
let heightStr = canvas.width.toString() + "px";
let wrapperWidthStr = (canvas.width + 4).toString() + "px";
let wrapperHeightStr = (canvas.width + 4).toString() + "px";

spreadSlider.setAttribute("max", width / 4);
uiCanvas.style.position = "absolute";
canvas.style.position = "absolute";
bg.style.position = "absolute";
bg.style.zIndex = 1;
bg.style.filter = "opacity(0%)";
bg.style.webkitFilter = "opacity(0%)";
bg.style.width = widthStr;
bg.style.height = heightStr;
bgDiv.style.width = widthStr;
bgDiv.style.height = heightStr;
canvasWrapper.style.width = wrapperWidthStr;
canvasWrapper.style.height = wrapperHeightStr;
canvasWrapper.zIndex = 1;
audio.muted = true;
audio.volume = 0.5;

// Loop through image pixels, skipping green, blue, and alpha indices; initiate to 0
for (let i = 0; i < cellArr.length; i++) {
  cellArr[i / 4] = 0; // Equivalent index for the straight array
}

// Loop through image pixels, skipping green, blue, and alpha indices; initiate to 0
for (let i = 0; i < nextCellArr.length; i++) {
  nextCellArr[i] = 0;
}

/** ===================== LISTENERS AND HANDLERS ===================== */

bottomDiv.addEventListener("mouseup", (e) => {
  const { target } = e;
  if (target === pHInput && pHInput.value > 5999 && !audio.muted) {
    async function playAudio() {
      // console.log("playing");
      try {
        const res = await audio.play();
        audio.muted = false;
        res.play();
      } catch (err) {
        console.log("Autoplay failed");
      }
    }
    playAudio();
  }

  if (target === pHInput && pHInput.value < 6000) {
    audio.isPaused();
  }
});

bottomDiv.addEventListener("keydown", (e) => {
  const { target } = e;

  //console.log(pHInput.value);

  if (target === pHInput) {
    if (target.value === "9001") {
      pHLabel.textContent = "!!!9000+";
      pHLabel.style.color = "red";
    } else {
      bgPhAngle = 0;
      pHLabel.textContent = target.value;
      pHLabel.style.color = "white";
    }

    let opacityVal = Math.round(convertRange(pHInput.value, 0, 9000, 0, 100));

    bg.style.filter = "opacity(" + opacityVal + "%);";
    bg.style.webkitFilter = "opacity(" + opacityVal + "%)";
  }

  if (target === pHInput && pHInput.value > 5999 && !audio.muted) {
    async function playAudio() {
      //console.log("playing");
      try {
        const res = await audio.play();
        audio.muted = false;
        res.play();
      } catch (err) {
        console.log("Autoplay failed");
      }
    }
    playAudio();
  }

  if (target === pHInput && pHInput.value < 6000) {
    audio.isPaused();
  }
});

bottomDiv.addEventListener("mousemove", (e) => {
  const { target } = e;

  if (target === pHInput) {
    if (target.value === "9001") {
      pHLabel.textContent = "!!!9000+";
      pHLabel.style.color = "red";
    } else {
      bgPhAngle = 0;
      pHLabel.textContent = target.value;
      pHLabel.style.color = "white";
    }

    let opacityVal = Math.round(convertRange(pHInput.value, 0, 9000, 0, 100));

    bg.style.filter = "opacity(" + opacityVal + "%);";
    bg.style.webkitFilter = "opacity(" + opacityVal + "%)";
  }

  if (target === pHInput && pHInput.value > 5999 && !audio.muted) {
    async function playAudio() {
      // console.log("playing");
      try {
        const res = await audio.play();
        audio.muted = false;
        res.play();
      } catch (err) {
        console.log("Autoplay failed");
      }
    }
    playAudio();
  }

  if (target === pHInput && pHInput.value < 6000) {
    audio.isPaused();
  }

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

optionsDivLeft.addEventListener("click", (e) => {
  const { target } = e;
  const { checked } = e.target;

  if (target === centerChkbx) {
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
  if (showGuidelines.checked && isPaused) {
    uiCanvas.style.zIndex = 5;
    canvas.style.zIndex = 4;
    drawGuidelines();
  }
  if (!showGuidelines.checked && !isPaused) {
    uiCanvas.style.zIndex = 4;
    canvas.style.zIndex = 5;
    draw();
  }
});

sandInput.addEventListener("change", () => {
  sandInput.setAttribute("value", sandInput.value);
  sandInputVal = parseInt(sandInput.value);
  // console.log(sandRemaining, sandInputVal);
});

dumpBtn.onclick = () => {
  sandInputVal = parseInt(sandInput.value);
  console.log(
    sandInput.value,
    sandInputVal,
    seedCellValues,
    seedCellIndexes,
    seedCellIndex
  );
  //seedCellIndexes = [];
  console.log(
    sandInput.value,
    sandInputVal,
    seedCellValues,
    seedCellIndexes,
    seedCellIndex
  );
  if (!isPopulated && isPaused) {
    console.log("Populating");
    isPopulated = true;
    populate();
  }
};

controlsDiv.addEventListener("change", (e) => {
  if (e.target === sandInput) {
    dumpBtn.value = `Pour ${sandpile.value} grains on your selected spots (only when paused)`;
  }
});

pauseBtn.addEventListener("click", (e) => {
  if (!isPaused) {
    isPaused = true;
    pauseBtn.value = "Play simulation";
    isPopulated = false;
    uiCanvas.style.zIndex = 5;
    canvas.style.zIndex = 4;
    showGuidelines.checked && drawGuidelines();
  } else {
    isPaused = false;
    isPopulated = true;
    canvas.style.zIndex = 4;
    uiCanvas.style.zIndex = 5;
    pauseBtn.value = "Pause simulation";
    draw();
  }
});

spreadSlider.addEventListener("mousemove", () => {
  spreadVal = spreadSlider.value;
});

reset.addEventListener("click", () => {
  for (let i = 0; i < cellArr.length; i++) {
    cellArr[i] = 0;
    nextCellArr[i] = 0;
    seedCellIndexes = []; // highly experimental - trying to clear indexes here instead of in populate. May have fixed things
  }
  ctx.clearRect(0, 0, width, height);
});

uiCanvas.addEventListener("click", (e) => {
  // Can't click on the sandpile canvas for some reason. Doesn't matter, still works

  mouseX = e.clientX - canvas.offsetLeft;
  mouseY = e.clientY + window.scrollY - canvas.offsetTop;

  if (freeChkbx.checked) {
    // console.log(
    //   seedCellIndex,
    //   seedCellIndexes,
    //   cellArr[seedCellIndex],
    //   seedCellValues,
    //   sandInputVal
    // );
    seedCellIndex = mouseX + mouseY * width;
    seedCellIndexes.push(seedCellIndex);
    cellArr[seedCellIndex] = parseInt(sandInputVal);
    seedCellValues.push(cellArr[seedCellIndex]);
    // console.log(
    //   seedCellIndex,
    //   seedCellIndexes,
    //   cellArr[seedCellIndex],
    //   seedCellValues,
    //   sandInputVal
    // );
  }

  // console.log(sandRemaining);
  sandRemaining = cellArr[seedCellIndex];
  // console.log(sandRemaining);

  for (let i = 0; i < seedCellIndexes.length; i++) {
    // this is attempt to fix bug
    if (seedCellIndexes[i] !== seedCellIndex) {
      //sandRemaining += cellArr[seedCellIndex]; // keep this
      sandRemaining += cellArr[seedCellIndexes[i]]; // this is alternative to above, seems to be working
      // console.log(sandRemaining, cellArr[seedCellIndex]);
    }
  }
  sandRemainingCounter.textContent = parseInt(sandRemaining);
  // console.log(sandRemainingCounter.textContent);
  seedCellValues = [];
});

rotateSlider.addEventListener("mousemove", () => {
  rotateVal = rotateSlider.value;
});

/** ===================== OTHER FUNCTIONS ===================== */

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

function topple(currentIndex) {
  nextCellArr[currentIndex] += cellArr[currentIndex] - 4;

  !(currentIndex < width) && toppleUp(currentIndex - width);
  !rightEdgeArr.includes(currentIndex) && toppleRight(currentIndex + 1);
  !(currentIndex > nextCellArr.length - width) &&
    toppleDown(currentIndex + width);
  !leftEdgeArr.includes(currentIndex) && toppleLeft(currentIndex - 1);
}

function toppleUp(currentIndex) {
  nextCellArr[currentIndex]++;
}
function toppleRight(currentIndex) {
  nextCellArr[currentIndex]++;
}
function toppleDown(currentIndex) {
  nextCellArr[currentIndex]++;
}
function toppleLeft(currentIndex) {
  nextCellArr[currentIndex]++;
}

function updateSandRemaining() {
  if (sandRemaining > 0) {
    sandRemaining = 0;
    for (let i = 0; i < seedCellIndexes.length; i++) {
      // console.log(sandRemaining, seedCellIndexes);

      sandRemaining += cellArr[seedCellIndexes[i]]; // experimental

      // console.log(sandRemaining, seedCellIndexes);
    }
    // console.log(sandRemaining, seedCellIndex);

    if (seedCellIndexes.length === 0) {
      // This is the mouse click index.
      seedCellIndexes.push(seedCellIndex);
    }
    // console.log(sandRemaining, seedCellIndexes);
  }
}

function populate() {
  // seedCellIndexes = []; // HIGHLY EXPERIMENTAL - trying to clear when reset. May have fixed things

  if (centerChkbx.checked) {
    const index = width / 2 + (height / 2) * width;

    cellArr[index] = parseInt(sandInputVal);
    seedCellValues.push(cellArr[index]);
    !seedCellIndexes.includes(index) && seedCellIndexes.push(index);
    // seedCellIndexes.push(index); // keep this
  }

  if (twoChkbx.checked) {
    const indexXRight =
      centerStartPoint.x + spreadVal * Math.cos(degToRad(-rotateVal));
    const indexYRight =
      centerStartPoint.y + spreadVal * Math.sin(degToRad(-rotateVal));

    const indexRight =
      Math.round(indexXRight) + Math.round(indexYRight) * width;

    cellArr[indexRight] = parseInt(sandInputVal);
    seedCellValues.push(cellArr[indexRight]);
    !seedCellIndexes.includes(indexRight) && seedCellIndexes.push(indexRight);
    // seedCellIndexes.push(indexRight); // keep this

    const indexXLeft =
      centerStartPoint.x - spreadVal * Math.cos(degToRad(-rotateVal));
    const indexYLeft =
      centerStartPoint.y - spreadVal * Math.sin(degToRad(-rotateVal));

    const indexLeft = Math.round(indexXLeft) + Math.round(indexYLeft) * width;

    cellArr[indexLeft] = parseInt(sandInputVal);
    seedCellValues.push(cellArr[indexLeft]);
    !seedCellIndexes.includes(indexLeft) && seedCellIndexes.push(indexLeft);
    // seedCellIndexes.push(indexLeft); // keep this
  }

  if (twoVertChkbx.checked) {
    const indexXTop =
      centerStartPoint.x + spreadVal * Math.cos(degToRad(-rotateVal - 90));
    const indexYTop =
      centerStartPoint.y + spreadVal * Math.sin(degToRad(-rotateVal - 90));

    const indexTop = Math.round(indexXTop) + Math.round(indexYTop) * width;

    cellArr[indexTop] = parseInt(sandInputVal);
    seedCellValues.push(cellArr[indexTop]);
    !seedCellIndexes.includes(indexTop) && seedCellIndexes.push(indexTop);

    // seedCellIndexes.push(indexTop); // keep this

    const indexXBottom =
      centerStartPoint.x - spreadVal * Math.cos(degToRad(-rotateVal - 90));
    const indexYBottom =
      centerStartPoint.y - spreadVal * Math.sin(degToRad(-rotateVal - 90));

    const indexBottom =
      Math.round(indexXBottom) + Math.round(indexYBottom) * width;

    cellArr[indexBottom] = parseInt(sandInputVal);
    seedCellValues.push(cellArr[indexBottom]);
    !seedCellIndexes.includes(indexBottom) && seedCellIndexes.push(indexBottom);
    // seedCellIndexes.push(indexBottom); // keep this
  }

  if (fourChkbx.checked) {
    let h = Math.sqrt(Math.pow(spreadVal, 2) + Math.pow(spreadVal, 2));

    const xRightTop =
      centerStartPoint.x + h * Math.cos(degToRad(-rotateVal - 45));
    const yRightTop =
      centerStartPoint.y + h * Math.sin(degToRad(-rotateVal - 45));

    const indexRightTop = Math.round(xRightTop) + Math.round(yRightTop) * width;

    cellArr[indexRightTop] = parseInt(sandInputVal);
    seedCellValues.push(cellArr[indexRightTop]);
    !seedCellIndexes.includes(indexRightTop) &&
      seedCellIndexes.push(indexRightTop);
    // seedCellIndexes.push(indexRightTop); // keep this

    const indexXRightBottom =
      centerStartPoint.x + h * Math.cos(degToRad(-rotateVal + 45));
    const indexYRightBottom =
      centerStartPoint.y + h * Math.sin(degToRad(-rotateVal + 45));

    const indexRightBottom =
      Math.round(indexXRightBottom) + Math.round(indexYRightBottom) * width;

    cellArr[indexRightBottom] = parseInt(sandInputVal);
    seedCellValues.push(cellArr[indexRightBottom]);
    !seedCellIndexes.includes(indexRightBottom) &&
      seedCellIndexes.push(indexRightBottom);
    // seedCellIndexes.push(indexRightBottom); // keep this

    const xLeftBottom =
      centerStartPoint.x + h * Math.cos(degToRad(-rotateVal + 135));
    const yLeftBottom =
      centerStartPoint.y + h * Math.sin(degToRad(-rotateVal + 135));

    const indexLeftBottom =
      Math.round(xLeftBottom) + Math.round(yLeftBottom) * width;

    cellArr[indexLeftBottom] = parseInt(sandInputVal);
    seedCellValues.push(cellArr[indexLeftBottom]);
    !seedCellIndexes.includes(indexLeftBottom) &&
      seedCellIndexes.push(indexLeftBottom);
    // seedCellIndexes.push(indexLeftBottom); // keep this

    const xLeftTop =
      centerStartPoint.x + h * Math.cos(degToRad(-rotateVal + 225));
    const yLeftTop =
      centerStartPoint.y + h * Math.sin(degToRad(-rotateVal + 225));

    const indexLeftTop = Math.round(xLeftTop) + Math.round(yLeftTop) * width;

    cellArr[indexLeftTop] = parseInt(sandInputVal);
    seedCellValues.push(cellArr[indexLeftTop]);
    !seedCellIndexes.includes(indexLeftTop) &&
      seedCellIndexes.push(indexLeftTop);
    // seedCellIndexes.push(indexLeftTop); // keep this
  }

  // Add all seed inexes' sand amount together and add the total to the total backed up sand

  console.log(seedCellValues, sandRemaining);
  for (let i = 0; i < seedCellValues.length; i++) {
    if (seedCellValues[i] !== undefined) {
      console.log(seedCellValues[i], sandRemaining);
      sandRemaining = seedCellValues[i];
      console.log(seedCellValues[i], sandRemaining);
    }
  }
  // console.log(sandRemaining);
  sandRemainingCounter.textContent = parseInt(sandRemaining);
  seedCellValues = [];
}

/** ===================== UI ===================== */

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
const centerStartPoint = new Vector(width / 2, height / 2, undefined);
const centerLineRight = new Vector(
  centerStartPoint.x,
  centerStartPoint.y,
  width
);

// Rotation maths stuff

const degToRad = function (deg) {
  return (deg * Math.PI) / 180;
};

// Drop sand in center

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
  if (cellArr[index] > 3) {
    drawRectFull(index);
  }
  if (cellArr[index] === 3) {
    drawRect3(index);
  }
  if (cellArr[index] === 2) {
    drawRect2(index);
  }
  if (cellArr[index] === 1) {
    drawRect1(index);
  }
}

function paintEverything() {
  for (let i = 0; i < cellArr.length; i++) {
    cellArr[i] > 0 && paint(i);
  }
}

function drawGuidelines() {
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
  if (showGuidelines.checked && isPaused === true) {
    requestAnimationFrame(drawGuidelines);
  }
}

function rotateHue(pHLevel) {
  let numPh = parseInt(pHLevel);
  if (pHLevel === "9001") {
    bgPhAngle += 5;
    sliderPhAngle += 0.1;

    bg.style.webkitFilter = "hue-rotate(" + bgPhAngle + "deg)";
    bg.style.filter = "hue-rotate(" + bgPhAngle + "deg)";

    colorSlider1.value = ((Math.sin(sliderPhAngle * 0.58) + 1) / 2) * 360;
    colorSlider2.value = ((Math.sin(sliderPhAngle * 0.36) + 1) / 2) * 360;
    colorSlider3.value = ((Math.sin(sliderPhAngle * 0.73) + 1) / 2) * 360;
    colorSlider4.value = ((Math.sin(sliderPhAngle * 0.64) + 1) / 2) * 360;

    cellColor1.style.background =
      "hsl(" + colorSlider1.value.toString() + ", 50%, 50%)";
    cellColor2.style.background =
      "hsl(" + colorSlider2.value.toString() + ", 50%, 50%)";
    cellColor3.style.background =
      "hsl(" + colorSlider3.value.toString() + ", 50%, 50%)";
    cellColor4.style.background =
      "hsl(" + colorSlider4.value.toString() + ", 50%, 50%)";

    cellPhAngle += 2;
    if (cellPhAngle > 360) {
      cellPhAngle = 0;
    }

    let newColor1Hue = Math.round(cellPhAngle) + 90;
    if (newColor1Hue > 360) {
      newColor1Hue -= 360;
    }
    let newColor2Hue = Math.round(cellPhAngle) + 180;
    if (newColor2Hue > 360) {
      newColor2Hue -= 360;
    }
    let newColor3Hue = Math.round(cellPhAngle) + 270;
    if (newColor3Hue > 360) {
      newColor3Hue -= 360;
    }
    let newColor4Hue = Math.round(cellPhAngle) + 360;
    if (newColor4Hue > 360) {
      newColor4Hue -= 360;
    }

    color1 = "hsl(" + newColor1Hue.toString() + ", 50%, 50%)";
    color2 = "hsl(" + newColor2Hue.toString() + ", 50%, 50%)";
    color3 = "hsl(" + newColor3Hue.toString() + ", 50%, 50%)";
    color4 = "hsl(" + newColor4Hue.toString() + ", 50%, 50%)";
  } else if (numPh >= 6000 && numPh < 9001) {
    cellPhAngle += 2;
    if (cellPhAngle > 360) {
      cellPhAngle = 0;
    }

    let newColor1Hue = Math.round(cellPhAngle) + 90;
    if (newColor1Hue > 360) {
      newColor1Hue -= 360;
    }
    let newColor2Hue = Math.round(cellPhAngle) + 180;
    if (newColor2Hue > 360) {
      newColor2Hue -= 360;
    }
    let newColor3Hue = Math.round(cellPhAngle) + 270;
    if (newColor3Hue > 360) {
      newColor3Hue -= 360;
    }
    let newColor4Hue = Math.round(cellPhAngle) + 360;
    if (newColor4Hue > 360) {
      newColor4Hue -= 360;
    }

    color1 = "hsl(" + newColor1Hue.toString() + ", 50%, 50%)";
    color2 = "hsl(" + newColor2Hue.toString() + ", 50%, 50%)";
    color3 = "hsl(" + newColor3Hue.toString() + ", 50%, 50%)";
    color4 = "hsl(" + newColor4Hue.toString() + ", 50%, 50%)";
  }

  if (bgPhAngle == 360) {
    bgPhAngle = 0;
  }
  if (sliderPhAngle == 360) {
    sliderPhAngle = 0;
  }
}

function convertRange(
  oldValue,
  oldRangeMin,
  oldRangeMax,
  newRangeMin,
  newRangeMax
) {
  let oldRange = oldRangeMax - oldRangeMin;
  let newRange = newRangeMax - newRangeMin;
  let newValue = ((oldValue - oldRangeMin) * newRange) / oldRange + newRangeMin;

  return newValue;
}

/** ===================== MAIN ===================== */

rightEdge(cellArr, width);
leftEdge(cellArr, width);

function update() {
  nextCellArr = new Array(pixelData.data.length / 4);
  for (let i = 0; i < nextCellArr.length; i++) {
    nextCellArr[i] = 0;
  }

  // Copy every cell that won't topple to next step's array
  for (let i = 0; i < cellArr.length; i++) {
    if (cellArr[i] < 4) {
      nextCellArr[i] = cellArr[i];
    }
  }

  for (let i = 0; i < cellArr.length; i++) {
    if (cellArr[i] > 3) {
      topple(i);
    }
  }

  cellArr = nextCellArr;
}

function drawUi() {
  ctxUi.clearRect(0, 0, width, height);
  requestAnimationFrame(drawUi);
}

drawUi();
drawGuidelines();

function draw() {
  updateSandRemaining();
  sandRemainingCounter.textContent = sandRemaining;
  if (isPaused === false) {
    for (let i = 0; i < timestepInput.value; i++) {
      update();
    }
    paintEverything();

    pHInput.value >= 6000 && rotateHue(pHInput.value);

    requestAnimationFrame(draw);
  }
}
