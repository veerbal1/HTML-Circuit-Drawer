var jsonData = [];
var initialPointData = {
  gotInitialPoint: false,
  initialPoint: { sNo: "", xPosition: "", yPosition: "" },
};

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

  stage.addEventListener("stagemousedown", stageMouseDownFunction(stage));

  downloadBtn.addEventListener("click", () => {
    const a = document.createElement("a");
    a.download = "data.json";
    a.href =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(jsonData,null,4));
    a.click();
  });
};

const stageMouseDownFunction = (stage) => {
  return function (e) {
    if (!stageLocked) {
      // var line = new createjs.Shape();
      var circle = new createjs.Shape();
      var dragger = new createjs.Container();
      circle.graphics.beginFill(color).drawCircle(0, 0, 3);
      if (
        !(Math.abs(initialPointData.initialPoint.xPosition - e.stageX) <= 3) &&
        !(Math.abs(initialPointData.initialPoint.yPosition - e.stageY) <= 3) &&
        !closedCycle
      ) {
        // For moving dot on click and drag
        dragger.on("pressmove", (evt) => {
          evt.currentTarget.x = evt.stageX;
          evt.currentTarget.y = evt.stageY;
          stage.update();

          let matchedObject = jsonData.find((obj) => {
            return obj.sNo == evt.currentTarget.id;
          });

          matchedObject.xPosition = evt.currentTarget.x;
          matchedObject.yPosition = evt.currentTarget.y;
          if (matchedObject == jsonData[0]) {
            initialPointData.initialPoint.xPosition = matchedObject.xPosition;
            initialPointData.initialPoint.yPosition = matchedObject.yPosition;
          }
        });

        // Set Dragger coordinates
        dragger.x = e.stageX;
        dragger.y = e.stageY;
        oldX = e.stageX;
        oldY = e.stageY;
        dragger.addChild(circle);
        stage.addChild(dragger);
        stage.update();

        // Add info to json array
        addDotInfo(dragger.id, dragger.x, dragger.y, stage);
      } else if (
        Math.abs(initialPointData.initialPoint.xPosition - e.stageX) <= 3 &&
        Math.abs(initialPointData.initialPoint.yPosition - e.stageY) <= 3
      ) {
        dragger.on("pressmove", (evt) => {
          evt.currentTarget.x = evt.stageX;
          evt.currentTarget.y = evt.stageY;
          stage.update();
        });

        dragger.x = e.stageX;
        dragger.y = e.stageY;

        // Draw Dot
        dragger.x = initialPointData.initialPoint.xPosition;
        dragger.y = initialPointData.initialPoint.YPosition;
        oldX = initialPointData.initialPoint.xPosition;
        oldY = initialPointData.initialPoint.YPosition;

        stage.addChild(dragger);
        stage.update();
        console.info("Locked");

        // Add locked state (at end) info to json array.
        addDotInfo(
          initialPointData.initialPoint.sNo,
          initialPointData.initialPoint.xPosition,
          initialPointData.initialPoint.yPosition
        );
        closedCycle = true;
      }

      // Show message when a closed cycle made (Lock drawing more line with dot)
      if (closedCycle) {
        stage.removeEventListener(
          "stagemousedown",
          stageMouseDownFunction(stage)
        );
        stageLocked = true;
        console.info(
          "Have come to same initial point from where it started so drawing locked leaving a closed cycle."
        );
      }
      color = "#FF4500";
    }
  };
};

const addDotInfo = (sid, xPos, YPos, stage) => {
  if (!closedCycle) {
    if (!initialPointData.gotInitialPoint) {
      stage.on("stagemousemove", moveLine(stage));
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
  }
};

// Line dragging with mouse around dot.
const moveLine = (stage) => {
  var shape = new createjs.Shape();
  return function (evt) {
    stage.addChild(shape);
    shape.graphics.clear();
    shape.graphics
      .beginStroke("#fff")
      .setStrokeStyle(1, "round")
      .moveTo(oldX, oldY)
      .lineTo(evt.stageX, evt.stageY);
    stage.update();
  };
};
