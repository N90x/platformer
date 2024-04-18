var bounds;
function Bounds(x, y, w, h, thickness) {

    this.boundingBody = Bodies.rectangle(x + w/2, y + h/2, w, h, {isStatic: true, restitution: 0, friction: 0})
    this.boundingBox = Matter.Bounds.create(this.boundingBody.vertices)

    let left = x - thickness / 2
    let right = x + w + thickness/2
    let top = y - thickness / 2
    let bottom = y + height + thickness/2

    this.bodyLeft = Bodies.rectangle(
        left, 
        y + h/2, 
        thickness,
        h
    );

    this.bodyRight = Bodies.rectangle(
        right, 
        y + h/2, 
        thickness, 
        h
    );

    this.bodyFloor = Bodies.rectangle(
        x + w/2, 
        bottom, 
        width,
        thickness
    );

    this.bodyTop = Bodies.rectangle(
        x + w/2, 
        top, 
        width, 
        thickness
    );

    this.body = Matter.Body.create({
        parts: [this.bodyLeft, this.bodyRight, this.bodyFloor, this.bodyTop],
        isStatic:true, restitution: 1, friction: 0
    })

    this.w = w; this.h = h;
    
    Composite.add(world, [this.body]);

    this.show = function() {        

    }

}

function getRandomPositionInBounds(){
    let vertices = bounds.boundingBody.vertices
    return {
        x: random(vertices[1].x, vertices[3].x),
        y: random(vertices[1].y, vertices[3].y),
    }
}