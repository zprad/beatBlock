class Tower extends GuaImage {
    constructor(game, name, x, y) {
        name = name || 'b1'
        super(game, name, x, y)
        this.setInputs()
    }
    setInputs() { 
        this.target = null
        this.atk = 1
        this.range = 100
    }
    static new(...args) {
        return new this(...args)
    }
    canAttack() {
        let t = this.target
        let exist = t !== null
        let can = exist && !t.isDead && this.center().distance(t.center()) <= this.range
        if (can) {
            return can
        } else {
            this.target = null
            return false
        }
    }
    fire() {
        this.target.damaged(this.atk)
    }
    update() {
        let can = this.canAttack()
        if (can) {
            this.fire()
            let dx = this.center().x - this.target.center().x 
            let dy = this.center().y - this.target.center().y 
            this.rotation = Math.atan2(-dx, -dy) * 180 / Math.PI - 45
            // log('rotation => ', this.rotation)
        }
    }
    drawRange() {
        const { context } = this.game
        let { x, y } = this.center()
        context.fillStyle = 'rgba(200, 200, 200, 0.5)'
        context.beginPath()
        context.arc(x, y, this.range, 0, 2 * Math.PI)
        context.fill()
    }
    draw() {
        
        this.drawRange()
        super.draw()
        // log('tower draw')
    }
}