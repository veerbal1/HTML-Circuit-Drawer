var jsonData = [];
let serialNumber = 1;
let oldX;
let oldY;
let color = "#0ff";
let size = 2;
const CANVAS_WIDTH_HEIGHT = 512;
let downloadBtn = null;

window.onload = () => {
  downloadBtn = document.getElementById("download");
  var stage = new createjs.Stage("demoCanvas");
  stage.canvas.width = CANVAS_WIDTH_HEIGHT;
  stage.canvas.height = CANVAS_WIDTH_HEIGHT;
  stage.canvas.style.backgroundColor = "#000";

  stage.on("stagemousedown", (e) => {
    var line = new createjs.Shape();
    var circle = new createjs.Shape();
    circle.graphics.beginFill(color).drawCircle(0, 0, 2);

    // Draw line
    line.graphics
      .beginStroke("red")
      .setStrokeStyle(1, "round")
      .moveTo(oldX, oldY)
      .lineTo(e.stageX, e.stageY);

    // Draw Dot
    circle.x = e.stageX;
    circle.y = e.stageY;
    oldX = e.stageX;
    oldY = e.stageY;

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

const addDotInfo = (sid, xPos, YPos) => {
  const dotPosition = {};
  dotPosition.sNo = sid;
  dotPosition.xPosition = xPos;
  dotPosition.yPosition = YPos;
  jsonData.push(dotPosition);
  console.log(jsonData);
  serialNumber++;
};
