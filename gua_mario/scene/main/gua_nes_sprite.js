class NesSprite {
    constructor(game, bytesData, x, y) {
        this.game = game
        this.x = x || 100
        this.y = y || 420
        this.bytesData = bytesData
        this.init()
    }
    static new(game, bytesData, x, y) {
        return new this(game, bytesData, x, y)
    }
    init() {
        this.pixelWidth = 2
        this.frameCount = 4
        this.frameIndex = 0
        this.NumberOfBytesPerBlock = 16
        this.NumberOfBlocksPerFrame = 8
        this.CountPerFrame = 8
        this.count = 0

        this.speed = 1
        this.vy = 0
        this.gy = 10
        this.rotation = 0
        this.flipX = false
        this.alpha = 1

        this.vx = 0
        this.mx = 0
    }
    move(x, keyStatus) {
        this.flipX = (x < 0)
        this.x += this.vx
        this.vx += this.mx
        if (this.vx * this.mx > 0) {
            this.vx = 0
            this.mx = 0
        }
    }
    jump(keyStatus) {
        this.vy = -10
        this.rotation = -45
    }
    moveRight(keyStatus) {
        if (keyStatus === 'down') {
            this.vx += this.speed
            this.mx = -this.speed / 2
            this.move(this.speed)
        }
    }
    moveLeft(keyStatus) {
        // log('move left')
        if (keyStatus === 'down') {
            this.vx += -this.speed
            this.mx = this.speed / 2
            this.move(-this.speed)
        }
    }
    update() {
        // this.count += 1
        // if (this.count >= this.CountPerFrame) {
        //     this.count = 0
        //     this.frameIndex++
        //     this.frameIndex = this.frameIndex % this.frameCount
        // }
        
        this.y += this.vy
        this.vy += this.gy * 0.2
        
        if (this.y >= 420) {
            this.y = 420
        }
        const context = this.game.context
        let w2 = this.w / 2
        let h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.globalAlpha = this.alpha
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)
        context.restore()
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
    drawSprite(data, w, h) {
        const context = this.game.context

        let x = this.x
        let y = this.y

        // let blockSize = 8 // 每行每列画8个图块
        let pixelSizeOfblock = 8 // 每个图块8个像素
        let pixelWidth = this.pixelWidth // 一个像素点宽高10倍
        let NumberOfBytesPerBlock = this.NumberOfBytesPerBlock // 一个像素2bits，一个图块8*8像素，因此就128bits，1bytes=8bits，因此一个图块16bytes

        // 现在canvas上画8*8个图块
        for (let i = 0; i < h; i++) {
            for (let j = 0; j < w; j++) {
                let px = x + j * pixelSizeOfblock * pixelWidth
                let py = y + i * pixelSizeOfblock * pixelWidth

                let index = (i * w + j) * NumberOfBytesPerBlock
                let blockData = data.slice(index)
                this.drawBlock(context, blockData, px, py, pixelWidth)
            }
        }
    }
    draw() {
        const { NumberOfBytesPerBlock, NumberOfBlocksPerFrame, frameIndex } = this
        const frameData = this.bytesData.slice(frameIndex * NumberOfBytesPerBlock * NumberOfBlocksPerFrame)
        this.drawSprite(frameData, 2, 4)
    }
}