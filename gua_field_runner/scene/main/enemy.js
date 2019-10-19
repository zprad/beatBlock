class Enemy extends GuaImage {
    constructor(game, name, x, y) {
        name = name || 'b3'
        super(game, name, x, y)
        this.setInputs()
    }
    setInputs() {
        this.speed = 2
        this.maxHP = 20
        this.hp = this.maxHP
        this.isDead = false
        // 路径
        this.stepIndex = 0
        this.steps = []
        this.destination = 500
    }
    static new(...args) {
        return new this(...args)
    }
    damaged(atk) {
        this.hp -= atk
        if (this.hp <= 0) {
            this.isDead = true
        }
    }
    setPath(steps) {
        this.steps = steps
        this.stepIndex = 0
    }
    update() {
        if (this.isDead) {
            return
        }
        let [dx, dy] = this.steps[this.stepIndex]
        let signX = dx - this.x > 0 ? 1 : -1
        let signY = dy - this.y > 0 ? 1 : -1
        if (dx == this.x) {
            signX = 0
        }
        if (dy == this.y) {
            signY = 0
        }
        this.x += this.speed * signX
        this.y += this.speed * signY
        if (this.x == dx && this.y == dy) {
            this.stepIndex++
            if (this.stepIndex == this.steps.length) {
                this.getToEnd()
            }
        }
    }
    drawLifebar() {
        const { context } = this.game
        context.fillStyle = 'red'
        context.fillRect(this.x, this.y - 10, this.w, 10)
        context.fillStyle = 'green'
        let w = this.w * (this.hp / this.maxHP)
        context.fillRect(this.x, this.y - 10, w, 10)
    }
    draw() {
        super.draw()
        this.drawLifebar()
    }
    die() {
        this.isDead = true
        // todo: 加死亡动画，然后移出场景
    }
    getToEnd() {
        this.die()
    }
}