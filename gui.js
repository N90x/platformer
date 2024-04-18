var fuelBar = {
    x: 20,
    y: 20,
    w: 400,
    h: 30
}

class UI {
    constructor() {
        this.dim = color(0, 0, 0)
        this.dim.setAlpha(100)

        this.button = createButton("Reset")
        this.button.size(200, 100)
        this.button.style("font-size", "48px")
        this.button.position(
            canvasPos.x + width/2 - this.button.width/2,
            canvasPos.y + height/2 - this.button.height/2,
        )

        this.button.mousePressed(function(){
            for (let i = 0; i < obstacles.length; i++) {
                let o = obstacles[i]
                Composite.remove(world, o.body)
            }
            obstacles = []
            player.score = 0
            Body.setPosition(player.body, {x: playerX, y: height - playerSize * 2})
            movementSpeed = 10
            //sounds["music"].play
            this.hide()
        })

        this.button.hide()

        // Notifications
        this.notifications = []
        this.notificationTick = 0
        this.notificationDuration = 3000 //ms
        this.notificationPos = {
            x: width - 20, y: 10, h: 40, textSize: 20
        }
    }

    Notification(str) {
        this.notifications.push({str: str, x: this.notificationPos.x, timePushed: this.notificationTick, width: getTextWidth(str, this.notificationPos.textSize)})
    }

    draw() {

        // Notifications
        this.notificationTick+=deltaTime

        for (let i = 0; i < this.notifications.length; i++)
        {
            let notif = this.notifications[i]
            push()
            translate(notif.x, this.notificationPos.y + (this.notificationPos.h+10)*i)
            fill(138, 130, 62)
            stroke(89, 72, 27)
            strokeWeight(5)
            rectMode(CENTER)
            rect(-notif.width/2, this.notificationPos.h/2, notif.width+20, this.notificationPos.h)
            drawText(notif.str, 0, this.notificationPos.h/2, this.notificationPos.textSize, RIGHT, CENTER)
            pop()
        
        }

        for (let i = this.notifications.length-1; i >= 0; i--)
        {
            let notif = this.notifications[i]
            if (this.notificationTick - notif.timePushed >= this.notificationDuration)
            {
                notif.x+=10
                if (notif.x - notif.width > width+30)
                {
                    this.notifications.shift()
                }
            }
        }

        // Dim screen upon death
        if (movementSpeed == 0)
        {
            push()
            rectMode(CORNER)
            fill(this.dim)
            rect(0, 0, width, height)
            pop()
        }

        // Fuel bar
        /**push()
        noStroke()
        fill(255, 0, 0)
        rectMode(CORNERS)
        let fuelAmountWidth = fuelBar.w * (player.fuel/maxFuel)
        rect(
            fuelBar.x + fuelAmountWidth,
            fuelBar.y,

            fuelBar.x,
            fuelBar.y + fuelBar.h
        )
        
        rectMode(CORNER)
        noFill()
        stroke(0)
        strokeWeight(3)
        rect(
            fuelBar.x,
            fuelBar.y,
            fuelBar.w,
            fuelBar.h
        )
        drawText("Fuel", fuelBar.x + fuelBar.w/2, fuelBar.y + fuelBar.h/2, 20, CENTER, CENTER, 255, 0)
        pop()*/
        
        // Score
        let str = "Score: ".concat(player.score).concat("\nCoins: ").concat(player.coins)
        drawText(str, fuelBar.x, fuelBar.y, 32, LEFT, TOP, 255, 0)

        // Debug
        
    }
}

function getTextWidth(str, size) {
    let w;
    push()
    textSize(size)
    w = textWidth(str)
    pop()
    return w
}

function drawText(str, x, y, size, alignH, alignV, fillC, strokeC) {
    push()
    textSize(size)
    textAlign(alignH, alignV)
    fill(fillC || 255)
    stroke(strokeC || 0)
    strokeWeight(3)
    text(str, x, y)
    pop()
}
