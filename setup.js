var Engine = Matter.Engine,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body;
    Composite = Matter.Composite;
    Vector = Matter.Vector;
    Constraint = Matter.Constraint;

var engine;
var world;
var runner;

function loadMatterJS() {
    engine = Engine.create();
    world = engine.world;
    runner = Runner.create();
    Runner.run(runner, engine);
}

function setGravity(g) {
    engine.gravity.y = g
}

var canvasPos = {}
function createScaledCanvas(canvasScale) {
    var cnv = createCanvas(windowWidth*canvasScale, windowHeight*canvasScale);
    centerCanvas(cnv)
}

function centerCanvas(cnv) {
    canvasPos.x = (windowWidth - width) / 2;
    canvasPos.y = (windowHeight - height) / 2;
    cnv.position(canvasPos.x, canvasPos.y);
}

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
}