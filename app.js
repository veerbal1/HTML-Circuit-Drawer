window.onload = () => {
  var stage = new createjs.Stage("demoCanvas");
  stage.canvas.width = window.innerWidth - 40;
  stage.canvas.height = window.innerHeight - 40;
  stage.canvas.style.backgroundColor = "#000"
  console.log(stage.canvas.style.backgroundColor);
  
  


  stage.on("stagemousedown", (e) => {
    var circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 1);
    // console.log(e.stageX);
    
    circle.x = e.stageX;
    circle.y = e.stageY;
    circle.id = Math.random();
    console.log(e.stageX,e.stageY);
    
    stage.addChild(circle);
    stage.update();
  });
  //   circle.on("click", function () {
  //     alert("clicked");
  //   });
};
