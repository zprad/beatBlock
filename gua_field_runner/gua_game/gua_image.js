class GuaImage {
    constructor(game, name, x, y) {
        this.game = game
        this.name = name
        this.texture = game.imageByName(name)
        this.x = x || 0
        this.y = y || 0
        this.w = this.texture.w
        this.h = this.texture.h
        this.rotation = 0
    }
    static new(...args) {
        return new this(...args)
    }
    copy() {
        let { game, name, x, y } = this
        let copy = GuaImage.new(game, name, x, y)
        return copy
    }
    isContain(cx, cy) {
        let dx = this.x <= cx && cx <= this.x + this.w
        let dy = this.y <= cy && cy <= this.y + this.h
        return dx && dy
    }
    draw() {
        // if (this.name == 'b1') {
        //     log('tower draw')
        // }
        const context = this.game.context
        context.save()
        let w2 = this.w / 2
        let h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2 - this.x, -this.y - h2)
        this.game.drawTexture(this.texture.image, this.x, this.y)
        context.restore()
    }
    update() {
        
    }
    center() {
        let cx = this.x + this.w / 2
        let cy = this.y + this.h / 2
        return Vector.new(cx, cy)
    }
}

class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    static new(...args) {
        return new this(...args)
    }
    distance(otherV) {
        let v = otherV
        let dx = this.x - v.x
        let dy = this.y - v.y
        return Math.sqrt(dx * dx + dy * dy)
    }
}