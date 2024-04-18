var swingSize = 100
var swings = []

var swingProperties = {
    length: 1,
    stiffness: 0.001,
    damping: 0.1
}

var swingConstraint = {active: false}

class Swing {
    constructor(x, y) {
        this.y = y
        this.body = Bodies.rectangle(x, y, swingSize, swingSize, {isStatic: true, collisionFilter: {mask: 0x0002}})
        this.boundingBox = Matter.Bounds.create(this.body.vertices)
        Composite.add(world, this.body)
        swings.push(this)

        this.hovered = false
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

        
        if (this.hovered) {
            fill(255, 0, 0)
        }
        else {
            fill(255)
        }

        rectMode(CENTER)
        //rect(0, 0, swingSize, swingSize)
        image(dirtImg, 0, 0, swingSize, swingSize)

        pop()


        if (swingConstraint.active) {
            let s = swingConstraint.c.bodyA.position
            let p = player.spritePos

            let w = playerSprites["jump 3"].width
            let h = playerSprites["jump 3"].height

            let hand = {x: p.x - w/2 + handOffset.x, y: p.y - h/2 + handOffset.y}

            line(
                hand.x, hand.y,
                s.x, s.y
            )

        }

    }

    attach() {
        swingConstraint = {c: Constraint.create({
            bodyB: player.body,
            bodyA: this.body,
            stiffness: swingProperties.stiffness,
            damping: swingProperties.damping,
            length: swingProperties.length
        }), active: true}
        Composite.add(world, swingConstraint.c)
        playSound("swing 1", 0.2)
    }

}

function getHoveredSwing() {
    for (let swing of swings) {
        if (Matter.Bounds.contains(swing.boundingBox, {x: mouseX, y: mouseY}))
        {
            return swing
        }
    }
    return false
}

function detatchSwing() {
    if (swingConstraint.active)
    {
        playSound("swing 2", 0.2)
        Composite.remove(world, swingConstraint.c)
        swingConstraint.active = false
    }
}

var hoveredSwing
function mouseDragged() {
    if (hoveredSwing && !swingConstraint.active)
    {
        hoveredSwing.attach()
    }
}

function mouseReleased(){
    detatchSwing()
}