var coinSize = 35
var coins = []
class Coin {
    constructor(x, y) {
        this.y = y
        this.body = Bodies.circle(x, y, coinSize/2, {isStatic: true, collisionFilter: {mask: 0x0002}})
        this.boundingBox = Matter.Bounds.create(this.body.vertices)
        Composite.add(world, this.body)
        coins.push(this)

        this.collected = false
    }

    draw() {
        if (this.body.isStatic)
        {
            Body.setPosition(
                this.body, {x: this.body.position.x - movementSpeed, y: this.y}
            )
        }

        let pos = this.body.position
        Matter.Bounds.shift(this.boundingBox, this.body.vertices[0])
        push()
        translate(pos.x, pos.y)
        image(coinImg, 0, 0)
        pop()

        if (Matter.Bounds.overlaps(this.boundingBox, player.boundingBox) && !this.collected) {
            Matter.Body.setStatic(this.body, false)
            Body.setVelocity(this.body, {x: 10, y: -20})
            this.collected = true
            player.coins +=1
            playSound("coin", 0.5)
        }
    }
}