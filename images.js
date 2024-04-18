var grassImg, 
    coinImg, 
    dimImg, 
    ui, 
    //spikeImages, 
    bgImg, 
    bottomImg,
    rockImg,
    dirtImg,
    mainFont

var playerSprites = []
var playerSpriteNames = [
    "run 1",
    "run 2",
    "run 3",
    "run 4",
    "run 5",
    "run 6",

    "jump 1",
    "jump 2",
    "jump 3",

    //"flat dash",
    //"air dash",

    "dead",
    "still"
]

function loadImages() {
    grassImg = loadImage("assets/grass tower.png")
    coinImg = loadImage("assets/coinGold.png")
    bgImg = loadImage("assets/Backgrounds/Background.png")
    bottomImg = loadImage("assets/Backgrounds/Bottom.png")
    rockImg = loadImage("assets/rocks.png")
    dirtImg = loadImage("assets/dirt.png")

    /*spikeImages = [
        loadImage("assets/spikes 1.png"),
        loadImage("assets/spikes 2.png"),
        loadImage("assets/spikes 3.png"),
    ]*/

    for (let name of playerSpriteNames)
    {
        let p = "assets/sprite/".concat(name).concat(".png")
        playerSprites[name] = loadImage(p, function(){
            print("Loaded ".concat(name))
        })
    }
}

var spriteTick = 0
var spriteAnimationSpeed = 100

var runSpriteNum = 1
function getAppropriateSprite() {

    if (keyIsDown(65) && player.canJump()){ // A
        return playerSprites["still"]
    }

    if (movementSpeed == 0)
    {
        return playerSprites["dead"]
    }

    if (swingConstraint.active)
    {
        return playerSprites["jump 3"]
    }

    if (player.body.velocity.x > 0)
    {
        if (player.canJump())
        {
            //return playerSprites["flat dash"]
        }
        else {
            //return playerSprites["air dash"]
        }
    }

    if (!player.canJump())
    {
        if (player.body.velocity.y > 0)
        {
            return playerSprites["jump 2"]
        }
        else {
            return playerSprites["jump 1"]
        }
    }

    spriteTick += deltaTime

    
    if (spriteTick >= movementSpeed*10)
    {
        spriteTick = 0
        runSpriteNum +=1
        if (runSpriteNum > 6)
        {
            runSpriteNum = 1
        }
    }


    return playerSprites["run ".concat(runSpriteNum)]
}
