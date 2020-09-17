window.onload = () => {
  let oldX;
  let oldY;
  var stage = new createjs.Stage("demoCanvas");
  shape = new createjs.Shape();
  color = "red";
  size = 2;
  const CANVAS_WIDTH_HEIGHT = 512;
  stage.canvas.width = CANVAS_WIDTH_HEIGHT;
  stage.canvas.height = CANVAS_WIDTH_HEIGHT;
  stage.canvas.style.backgroundColor = "#000";
  console.log(stage.canvas.style.backgroundColor);

  stage.on("stagemousedown", (e) => {
    var line = new createjs.Shape();
    var circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 2);
    line.graphics
      .beginStroke("red")
      .setStrokeStyle(1, "round")
      .moveTo(oldX, oldY)
      .lineTo(e.stageX, e.stageY);
    // console.log(e.stageX);

    circle.x = e.stageX;
    circle.y = e.stageY;
    circle.id = Math.random();
    oldX = e.stageX;
    oldY = e.stageY;
    // console.log(e.stageX, e.stageY);

    stage.addChild(line);
    stage.addChild(circle);
    stage.update();
  });
};
