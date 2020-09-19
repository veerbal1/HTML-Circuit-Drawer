var jsonData = [];
var initialPointData = {
  gotInitialPoint: false,
  initialPoint: { sNo: "", xPosition: "", yPosition: "" },
};

let serialNumber = 1;
let oldX;
let oldY;
let color = "#00FF00";
let size = 2;
const CANVAS_WIDTH_HEIGHT = 512;
let downloadBtn = null;
let closedCycle = false;
let stageLocked = false;

window.onload = () => {
  downloadBtn = document.getElementById("download");

  var stage = new createjs.Stage("demoCanvas");
  stage.canvas.width = CANVAS_WIDTH_HEIGHT;
  stage.canvas.height = CANVAS_WIDTH_HEIGHT;
  stage.canvas.style.backgroundColor = "#000";

  stage.on("stagemousedown", stageMouseDownFunction(stage));
  
  downloadBtn.addEventListener("click", () => {
    const a = document.createElement("a");
    a.download = "data.json";
    a.href =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(jsonData));
    a.click();
  });
};


const stageMouseDownFunction = (stage) =>{
  return function(e){
    if (!stageLocked) {
      var line = new createjs.Shape();
    var circle = new createjs.Shape();
    var dragger = new createjs.Container();
    circle.graphics.beginFill(color).drawCircle(0, 0, 2);
    if (
      !(Math.abs(initialPointData.initialPoint.xPosition - e.stageX) <= 3) &&
      !(Math.abs(initialPointData.initialPoint.yPosition - e.stageY) <= 3) &&
      !closedCycle
    ) {
      // Draw line
      dragger.x = e.stageX;
      dragger.y = e.stageY;

      console.log(
        Math.abs(initialPointData.initialPoint.xPosition),
        Math.abs(initialPointData.initialPoint.yPosition)
      );
      
      // line.graphics
      //   .beginStroke("#fff")
      //   .setStrokeStyle(1, "round")
      //   .moveTo(oldX, oldY)
      //   .lineTo(e.stageX, e.stageY);
        

      // Draw Dot
      // circle.x = e.stageX;
      // circle.y = e.stageY;
      oldX = e.stageX;
      oldY = e.stageY;
      
    } else if (
      Math.abs(initialPointData.initialPoint.xPosition - e.stageX) <= 3 &&
      Math.abs(initialPointData.initialPoint.yPosition - e.stageY) <= 3
    ) {
      dragger.x = e.stageX;
      dragger.y = e.stageY;
      console.log(
        Math.abs(initialPointData.initialPoint.xPosition - e.stageX),
        Math.abs(initialPointData.initialPoint.yPosition - e.stageY)
      );
      // Draw line
      // line.graphics
      //   .beginStroke("#fff")
      //   .setStrokeStyle(1, "round")
      //   .moveTo(oldX, oldY)
      //   .lineTo(
      //     initialPointData.initialPoint.xPosition,
      //     initialPointData.initialPoint.yPosition
      //   );

      // Draw Dot
      dragger.x = initialPointData.initialPoint.xPosition;
      dragger.y = initialPointData.initialPoint.YPosition;
      oldX = initialPointData.initialPoint.xPosition;
      oldY = initialPointData.initialPoint.YPosition;
      console.info("Locked");
      closedCycle = true;
    }

    // Show message when a closed cycle made (Lock drawing more line with dot)
    if (closedCycle) {
      console.info(
        "Have come to same point so drawing locked leaving a closed cycle"
      );
    }

    // Add info to json array
    addDotInfo(serialNumber, dragger.x, dragger.y);
    color = "#FF4500";
    dragger.addChild(line);
    dragger.addChild(circle);
    stage.addChild(dragger);
    // stage.addChild(line);
    // stage.addChild(circle);
    stage.update();
    // console.log(dragger);

    // dragger.add
    }
  }
}

const addDotInfo = (sid, xPos, YPos) => {
  if (!closedCycle) {
    console.log(initialPointData.gotInitialPoint);
    
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
    // console.log(jsonData);
  }
};