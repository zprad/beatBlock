class SceneEdit extends Scene {
    constructor(game) {
        super(game)
        this.blocks = loadLevel(game, 3)
        this.curBlock = null
        game.registerAction('b', () => {
            this.saveLevel()
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
        // game.registerAction('e', function(){
        //     var s = editScene(game)
        //     game.replaceScene(s)
        // })
        var enableDrag = false
        var enableCreat = true
        game.canvas.addEventListener('mousedown', (event) => {
            var x = event.offsetX
            var y = event.offsetY
            log(x, y, event)
            // 检查是否点中了 ball
            if(this.hasBlockClick(x, y)) {
                // 设置拖拽状态
                enableDrag = true
            } else {
                if(enableCreat) {
                    var b = Block(game, [x, y,])
                    log(b)
                    this.blocks.push(b)
                    enableCreat = false
                }
            }
            
        })
        game.canvas.addEventListener('mousemove', (event) => {
            var x = event.offsetX
            var y = event.offsetY
            // log(x, y, 'move')
            if (enableDrag) {
                log(x, y, 'drag')
                this.curBlock.x = x
                this.curBlock.y = y
            }
        })
        game.canvas.addEventListener('mouseup', (event) => {
            var x = event.offsetX
            var y = event.offsetY
            log(x, y, 'up')
            enableDrag = false
            enableCreat = true
        })
    }
    saveLevel() {
        var blocks = this.blocks
        var level = []
        for(var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            level.push([block.x, block.y])
        }
        levels.push(level)
    }
    draw() {
        // draw 背景
        this.game.context.fillStyle = "#554"
        this.game.context.fillRect(0, 0, 400, 300)
        // draw blocks
        for (var i = 0; i < this.blocks.length; i++) {
            var block = this.blocks[i]
            if (block.alive) {
                this.game.drawImage(block)
            }
        }
        // draw labels
        // this.game.context.fillText('分数: ' + score, 10, 290)
    }
    hasBlockClick(x, y) {
        var blocks = this.blocks
        for(var i = 0; i < blocks.length; i++) {
            if(blocks[i].hasPoint(x, y)) {
                this.curBlock = blocks[i]
                return true
            }
        }
        return false
    }
}