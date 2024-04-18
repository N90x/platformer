var obstacleProperties =  {isStatic: true}

function Pad(x, y, w, h){
    this.y = y + h/2
    this.x = x + w/2 
    // ^ Do this because matter js use centre and we want to create them at the top left position

    this.body = Bodies.rectangle(this.x, this.y, w, h, obstacleProperties)
    this.w = w; this.h = h;
    Composite.add(world, [this.body]);

    obstacles.push(this)

    this.draw = function(){
        var pos = this.body.position;
        /*push()
        translate(pos.x, pos.y)
        fill(255)
        stroke(0)
        rectMode(CENTER)
        rect(0,0, this.w, this.h)
        pop()*/
        imageMode(CENTER)
        image(grassImg, pos.x, height - this.h + grassImg.height/2)

    }

    this.cull = function(){
        if (this.body.position.x+this.w/2 < -this.w)
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

function Spikes(x, y, w, h){
    this.y = y + h/2
    this.x = x + w/2 
    // ^ Do this because matter js use centre and we want to create them at the top left position
    this.w = w; this.h = h;

    this.body = Bodies.rectangle(this.x, this.y, w, h, {isStatic: true, collisionFilter: {mask: 0x0002}})
    this.boundingBox = Matter.Bounds.create(this.body.vertices)

    this.img = rockImg//spikeImages[floor(random(spikeImages.length))]

    Composite.add(world, [this.body]);

    obstacles.push(this)

    this.draw = function(){
        var pos = this.body.position;
        push()
        /*translate(pos.x, pos.y)
        fill(255, 0, 0)
        stroke(0)
        rectMode(CENTER)
        rect(0,0, this.w, this.h)

        pop()*/
        imageMode(CENTER)
        image(this.img, pos.x, height - this.img.height/2)

        if (Matter.Bounds.overlaps(this.boundingBox, player.boundingBox)) {
            player.kill()
        }
    }

    this.cull = function(){
        if (this.body.position.x+this.w/2 < -this.w)
        {
            Composite.remove(world, this.body)
            obstacles.shift()
        }
    }

    this.move = function(){
        Body.setPosition(
            this.body, {x: this.body.position.x - movementSpeed, y: this.y}
        )
        Matter.Bounds.shift(this.boundingBox, this.body.vertices[0])
    }

}

var obstacles = []

var baseHeight = 200
var baseWidth = 300
var padGenInit = false
var padGeneration = false

var imageHeight = 150

function generatePads() {
    if (!padGenInit)
    {
        padGenInit = true
        let n = onoise.noise2D(baseWidth, baseHeight)
        let h = baseHeight + (baseHeight*n)
        new Pad(width, height-h, baseWidth, h)
    }
    else {
    
        let i = obstacles.length
        let lastObstacle = obstacles[i-1]
        if (!lastObstacle)
        {
            let n = onoise.noise2D(baseWidth, baseHeight)
            let h = baseHeight + (baseHeight*n)
            new Pad(width, height-h, baseWidth, h)
        }
        else {
            if (lastObstacle.body.position.x <= width - lastObstacle.w/2)
            {

                //let x = lastObstacle.body.position.x + lastObstacle.w/2
                let n = onoise.noise2D(baseWidth*baseWidth, lastObstacle.h*lastObstacle.h)
                let h = baseHeight + (baseHeight*n)

                // 1 in 5 chance to create spikes
                if (random() < 0.2)
                {
                    h = 20
                    new Spikes(width, height-h, baseWidth, h)

                    // 1 in 2 chance to create a coin over the spikes
                    if (random() < 0.5){
                        new Coin(width+baseWidth/2, height - baseHeight*3)
                    }

                    
                    // 1 in 2 chance to create a swing over the spikes
                    if (random() < 0.5){
                        new Swing(width+baseWidth/2, baseHeight/2)
                    }
                }
                else {

                    // 1 in 3 chance to create a gap
                    if (random() < 0.333)
                    {
                        h = 0

                        // 1 in 2 chance to create a coin over the gap
                        if (random() < 0.5){
                            new Coin(width+baseWidth/2, height - baseHeight*2)
                        }

                        
                        // 1 in 2 chance to create a swing over the gap
                        if (random() < 0.5){
                            new Swing(width+baseWidth/2, baseHeight)
                        }
                    }

                    // Create a pad regardless - gap is just a pad with no height
                    new Pad(width, height-h, baseWidth, h)
                }



            

                if (random() < 0.05) {
                    //padGeneration = false
                }
            }
        }


    }
}