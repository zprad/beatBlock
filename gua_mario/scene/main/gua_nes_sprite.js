class NesSprite {
    constructor(game, bytesData, x, y) {
        this.game = game
        this.x = x || 100
        this.y = y || 100
        this.bytesData = bytesData
        this.init()
    }
    static new(game, bytesData, x, y) {
        return new this(game, bytesData, x, y)
    }
    init() {
        this.pixelWidth = 2

        this.numsOfRow = 4
        this.numsOfCol = 2

        this.w = 32 || this.numsOfCol * this.pixelWidth * 8
        this.h = 64 || this.numsOfRow * this.pixelWidth * 8

        // 动画的帧数
        this.frameCount = 3
        this.frameIndex = 0

        this.NumberOfBytesPerBlock = 16
        this.NumberOfBlocksPerFrame = 8
        this.CountPerFrame = 8
        this.count = 0

        this.speed = 1
        // 重力和加速度
        this.vy = 0
        this.gy = 10
        // this.rotation = 0
        this.flipX = false
        this.alpha = 1

        // 水平加速度和摩檫力
        this.vx = 0
        this.mx = 0
    }
    addMap(map) {
        this.map = map
    }
    move(x, keyStatus) {
        this.flipX = (x < 0)
        let s = x * this.speed
        if (keyStatus === 'down') {
            this.vx += s
            this.vx = Math.floor(this.vx) > 10 ? 10 * (this.vx / Math.abs(this.vx)) : this.vx
            this.mx = -s / 2
        }
    }
    jump(keyStatus) {
        this.vy = -10
        // this.rotation = -45
    }
    updateGravity() {
        const blockWidth = 32

        this.y += this.vy
        this.vy += this.gy * 0.2
        
        let i = Math.floor(this.x / blockWidth)
        let j = Math.floor(this.y / blockWidth) + 2
        // 判断是否在地上
        let onTheGround = this.map.onTheGround(i, j)
        if (onTheGround) {
            this.vy = 0
            this.y = (j - 2) * blockWidth
        }
        
        // if (this.y >= 100) {
        //     this.y = 100
        // }
    }
    update() {
        this.vx += this.mx
        // 水平加速度和摩檫力加速度同向，表明速度已经为0，停止摩檫力
        if (this.vx * this.mx > 0) {
            this.vx = 0
            this.mx = 0
        } else {
            this.x += this.vx
        }
        
        this.updateGravity()

        this.count += 1
        if (this.count >= this.CountPerFrame) {
            this.count = 0
            this.frameIndex++
            this.frameIndex = this.frameIndex % this.frameCount
        }
    }
    drawBlock(context, data, x, y, pixelWidth) {
        const colors = [
            'white',
            '#FE1000',
            '#FFB010',
            '#AA3030',
        ]
        let h = pixelWidth
        let w = pixelWidth
        for (let i = 0; i < 8; i++) {
            let p1 = data[i]
            let p2 = data[i+8]
            for (let j = 0; j < 8; j++) {

                let c1 = (p1 >> (7 - j)) & 0b00000001
                let c2 = (p2 >> (7 - j)) & 0b00000001
                let pixel = (c2 << 1) + c1
                if (pixel == 0) continue
                context.fillStyle = colors[pixel]
                let px = x + j * h
                let py = y + i * w

                context.fillRect(px, py, w, h)
            }
            
        }
    }
    drawSprite() {
        const context = this.game.context

        const { NumberOfBytesPerBlock, NumberOfBlocksPerFrame, frameIndex } = this
        const data = this.bytesData.slice(frameIndex * NumberOfBytesPerBlock * NumberOfBlocksPerFrame)

        const w = this.numsOfCol
        const h = this.numsOfRow

        let x = this.x
        let y = this.y

        // let blockSize = 8 // 每行每列画8个图块
        let pixelSizeOfblock = 8 // 每个图块8个像素
        let pixelWidth = this.pixelWidth // 一个像素点宽高10倍
        // 一个像素2bits，一个图块8*8像素，因此就128bits，1bytes=8bits，因此一个图块16bytes

        // 现在canvas上画8*8个图块
        for (let i = 0; i < h; i++) {
            for (let j = 0; j < w; j++) {
                let px = x + j * pixelSizeOfblock * pixelWidth
                let py = y + i * pixelSizeOfblock * pixelWidth
                // log('px, py => ', px, ' ', py)

                let index = (i * w + j) * NumberOfBytesPerBlock
                let blockData = data.slice(index)
                this.drawBlock(context, blockData, px, py, pixelWidth)
            }
        }
    }
    draw() {

        const context = this.game.context
        context.save()
        let w2 = this.w / 2
        let h2 = this.h / 2
        context.translate(this.x + w2, 0)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.globalAlpha = this.alpha
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2 - this.x, 0)

        // draw mario
        this.drawSprite()

        

        context.restore()
    }
}