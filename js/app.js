var jsonData = [];
var initialPointData = {
  gotInitialPoint: false,
  initialPoint: { sNo: "", xPosition: "", yPosition: "" },
};

let serialNumber = 1;
let oldX;
let oldY;
let color = "#FF0000";
let size = 2;
const CANVAS_WIDTH_HEIGHT = 512;
let downloadBtn = null;
let dottedCycle = false;

window.onload = () => {
  downloadBtn = document.getElementById("download");

  var stage = new createjs.Stage("demoCanvas");
  stage.canvas.width = CANVAS_WIDTH_HEIGHT;
  stage.canvas.height = CANVAS_WIDTH_HEIGHT;
  stage.canvas.style.backgroundColor = "#000";

  stage.on("stagemousedown", (e) => {
    console.log(checkDotAlreadyPresent(e));

    var line = new createjs.Shape();
    var circle = new createjs.Shape();
    circle.graphics.beginFill(color).drawCircle(0, 0, 2);

    if (!checkDotAlreadyPresent(e) && !dottedCycle) {
      // Draw line
      line.graphics
        .beginStroke("#fff")
        .setStrokeStyle(1, "round")
        .moveTo(oldX, oldY)
        .lineTo(e.stageX, e.stageY);

      // Draw Dot
      circle.x = e.stageX;
      circle.y = e.stageY;
      oldX = e.stageX;
      oldY = e.stageY;
    }

    // Show message when a closed cycle made (Lock drawing more line with dot)
    if (dottedCycle) {
      console.info(
        "Have come to same point so drawing locked leaving a closed cycle"
      );
    }

    // Change dot color after first Click
    color = !checkDotAlreadyPresent(e) ? "#FFA500" : "#008000";
    // Add info to json array
    addDotInfo(serialNumber, circle.x, circle.y);

    stage.addChild(line);
    stage.addChild(circle);
    stage.update();
  });

  downloadBtn.addEventListener("click", () => {
    const a = document.createElement("a");
    a.download = "data.json";
    a.href =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(jsonData));
    a.click();
  });
};

const checkDotAlreadyPresent = (e) => {
  let value = false;
  jsonData.forEach((obj) => {
    if (obj.xPosition === e.stageX && obj.yPosition === e.stageY) {
      value = true;
      dottedCycle = true;
      console.log(
        `${obj.xPosition} ${e.stageX}`,
        `${obj.yPosition} ${e.stageY}`
      );
    }
  });
  return value;
};

const addDotInfo = (sid, xPos, YPos) => {
  if (!initialPointData.gotInitialPoint) {
    initialPointData.initialPoint.sNo = sid;
    initialPointData.initialPoint.xPosition = xPos;
    initialPointData.initialPoint.yPosition = YPos;
    initialPointData.gotInitialPoint = true;
  }
  const dotPosition = {};
  dotPosition.sNo = sid;
  dotPosition.xPosition = xPos;
  dotPosition.yPosition = YPos;
  jsonData.push(dotPosition);
  serialNumber++;
};
