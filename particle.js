class Square {
    constructor(x, y, size, properties) {
        this.size = size
        this.body = Bodies.rectangle(x, y, this.size, this.size, properties)
        Composite.add(world, [this.body])
        this.colour = color(255, 255, 255)

        this.collider = Matter.Detector.create({
            bodies: [this.body, bounds.body]
        }) 
    }

    draw() {
        push()
        let pos = this.body.position
        translate(pos.x, pos.y)
        rotate(this.body.angle)
        fill(this.colour)
        rectMode(CENTER)
        rect(0, 0, this.size, this.size)
        pop()
    }
}