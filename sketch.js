var player, 
    onoise

function preload() {

    loadImages()
    loadSounds()

    mainFont = loadFont("assets/SuperMario256.ttf")
}

function setup() {    
    //createScaledCanvas(0.9)
    centerCanvas(createCanvas(1500, 800))

    loadMatterJS()
    setGravity(4)

    bounds = new Bounds(0, 0, width, height, 100)
    player = new Player()
    onoise = new OpenSimplexNoise(Date.now())
    ui = new UI()

    textFont(mainFont)

    //playSound("music", 0.3)
}

function keyPressed() {
    if (keyCode == 32)
    {
        player.jump()
    }

    if (keyCode == 83)
    {
        player.duck()
    }

    if (keyCode == 68)
    {
        player.dash()
    }
}

function keyReleased() {
    if (keyCode == 32)
    {
        player.justJumped = false
    }
}

var bottomImgX = 0
var scoreTick = 0
function draw() {
    scoreTick += deltaTime
    if (scoreTick >= 1000)
    {
        scoreTick = 0
        player.giveScore()
    }
    background(100)
    imageMode(CORNER)
    image(bgImg, 0, 0, width, height)

    if (obstacles.length == 0){
        padGeneration = true
    }

    if (padGeneration) {
        generatePads()
    }
    
    for (let o of obstacles)
    {
        o.move()
        o.draw()
        o.cull()
    }

    for (let c of coins) {
        c.draw()
    }

    for (let s of swings) {
        s.draw()
    }

    hoveredSwing = getHoveredSwing()
    if (hoveredSwing)
    {
        hoveredSwing.hovered = true
    }

    //player.draw()
    player.drawSprite()
    player.update()

    ui.draw()
}