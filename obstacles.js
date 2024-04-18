var obstacles = []
var obstacleProperties =  {isStatic: true}
var movementSpeed = 10

var padHeight = {
        min: 30, max: 40,
    },
    padWidth = {
        min: 300, max: 400
    }

function Pad(x, y, w, h){
    this.y = y

    this.body = Bodies.rectangle(x, y, w, h, obstacleProperties)
    this.w = w; this.h = h;
    Composite.add(world, [this.body]);

    obstacles.push(this)

    this.draw = function(){
        var pos = this.body.position;
        push()
        translate(pos.x, pos.y)
        fill(255)
        stroke(0)
        rectMode(CENTER)
        rect(0,0, this.w, this.h)
        pop()
    }

    this.cull = function(){
        if (this.body.position.x < -this.w)
        {
            Composite.remove(world, this.body)
            obstacles.shift()
        }
    }

    this.move = function(){
        Body.setPosition(
            this.body, {x: this.body.position.x - movementSpeed, y: this.y}
        )
    }

}

function padString(num) {

    var x = width + random(500, 1000)
    var w = random(padWidth.min, padWidth.max)
    var h = random(padHeight.min, padHeight.max)
    var y = height - h/2

    new Pad(x, y, w, h)

    for (let i = 1; i < num; i++)
    {
        let _w = random(padWidth.min, padWidth.max)
        let _h = random(padHeight.min, padHeight.max)
        let _y = height - _h/2
        let _x = x + w/2 + _w/2
        if (random() < 0.5) 
        {
            _y -= h
        }
        if (random() < 0.5) 
        {
            _y -= h
        }
        new Pad(_x, _y, _w, _h)
        x = _x, y = _y, w = _w, h = _h
    }
}

var tick = 0
function generateObstacles(ms, randomness) {
    tick += deltaTime
    if (tick >= ms + random(randomness))
    {
        tick = 0
        let w = random(padWidth.min, padWidth.max)
        let h = random(padHeight.min, padHeight.max)
        let x = width + random(500, 1000)
        let y = height - h/2

        new Pad(x, y, w, h)
        //padString(floor(random(4,8)))
    }
}

function generatePadStrings() {
    if (obstacles.length == 0)
    {
        padString(floor(random(4,8)))
    }
}