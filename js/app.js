var jsonData = [];
let serialNumber = 1;
let oldX;
let oldY;
let color = "red";
let size = 2;
const CANVAS_WIDTH_HEIGHT = 512;

window.onload = () => {
  var stage = new createjs.Stage("demoCanvas");
  shape = new createjs.Shape();
  stage.canvas.width = CANVAS_WIDTH_HEIGHT;
  stage.canvas.height = CANVAS_WIDTH_HEIGHT;
  stage.canvas.style.backgroundColor = "#000";
  console.log(stage.canvas.style.backgroundColor);

  stage.on("stagemousedown", (e) => {
    var line = new createjs.Shape();
    var circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 2);

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
