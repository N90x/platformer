var playerX = 200, 
    playerSize = 50,
    duckForce = 25,
    jumpForce = 25,
    dashForce = 10,
    jetpackForce = 0.015,
    maxFuel = 3000,
    movementSpeed = 10,
    targetMovementSpeed = movementSpeed,

    playerProperties = {
        restitution: 0,
        friction: Infinity,
    }

    handOffset = {x: 19, y: 10}


class Player extends Square {
    constructor() {
        super(playerX, height - playerSize * 2, playerSize, playerProperties)

        Body.setInertia(this.body, Infinity)
        this.boundingBox = Matter.Bounds.create(this.body.vertices)

        //this.body.collisionFilter.category = 0x0001

        this.jumpVector = Vector.create(0, -jumpForce)
        this.duckVector = Vector.create(0, duckForce)
        this.dashVector = Vector.create(dashForce, 0)
        this.jetpackVector = Vector.create(0, -jetpackForce)

        this.fuel = maxFuel

        this.score = 0
        this.coins = 0

        this.justJumped = false

        this.canDoubleJump = true
        this.spritePos = {x: this.body.position.x, y: this.body.position.y}
    }

    drawSprite() {
        let pos = this.body.position
        push()
        translate(pos.x, pos.y)
        imageMode(CENTER)
        image(getAppropriateSprite(), 0, -playerSize/2, playerSize*2, playerSize*2)
        pop()
        this.spritePos.x = pos.x
        this.spritePos.y = pos.y - playerSize/2
    }

    update() {
        if (keyIsDown(32) && !this.justJumped) 
        {
            this.jetPack()
            this.fuel -= deltaTime
            this.fuel = max(this.fuel, 0)
        }

        if (this.canJump())
        {
            this.canDoubleJump = true
        }

        if (this.canJump() && movementSpeed > 0)
        {
            playRunLoop()
        } else {
            pauseRunLoop()
        }

        let pos = this.body.position
        Matter.Bounds.shift(this.boundingBox, this.body.vertices[0])

        if (this.body.position.x < playerSize && this.canJump()) {
            this.kill()
        }

        if (movementSpeed < targetMovementSpeed)
        {
            movementSpeed+=0.1
        }

        if (keyIsDown(65) && this.canJump()){ // A
            Body.translate(this.body, {x: -movementSpeed, y: 0})
        }
        /*else if (pos.x > playerX && this.canJump())
        {
            Body.translate(this.body, {x: -movementSpeed/3, y: 0})
        }*/
    }

    giveScore() {
        if (movementSpeed > 0)
        {
            this.score +=1
            if (this.score % 20 == 0)
            {
                targetMovementSpeed = movementSpeed + 2
                ui.Notification("Movin' on up!")
                playSound("speedup", 0.3)
            }
        }
    }

    kill() {
        movementSpeed = 0
        targetMovementSpeed = 0
        ui.button.show()
        sounds["music"].pause()
    }

    isOnGround() {
        return Matter.Detector.collisions(this.collider).length > 0
    }

    canJump() {
        return Matter.Detector.collisions(engine.detector).length > 0
    }

    jump() {
        if (this.canJump()) {
            this.justJumped = true
            this.jumpVector.x = this.body.velocity.x
            Body.setVelocity(this.body, this.jumpVector)
            let n = round(random()) + 1
            playSound("jump ".concat(n), 0.5)
        
        }
        else {
            if (this.canDoubleJump) {
                this.justJumped = true
                this.jumpVector.x = this.body.velocity.x
                Body.setVelocity(this.body, this.jumpVector)
                let n = round(random()) + 1
                playSound("jump ".concat(n), 0.5)
                this.canDoubleJump = false
            }
        }
    }

    duck() {
        Body.setVelocity(this.body, this.duckVector)
    }

    dash() {
        this.dashVector.y = this.body.velocity.y
        Body.setVelocity(this.body, this.dashVector)
    }

    jetPack() {
        if (this.fuel > 0)
        {
            //Body.applyForce(this.body, this.body.position, this.jetpackVector)
        }
    }
}
