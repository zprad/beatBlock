class SceneTitle extends Scene {
    constructor(game) {
        super(game)
        game.registerAction('k', function(){
            var s = mainScene(game)
            game.replaceScene(s)
        })
        game.registerAction('e', function(){
            var s = SceneEdit.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        // draw backImg
        // this.game.context.drawImage(this.backImg.image, this.backImg.x, this.backImg.y)
        // draw labels
        this.game.context.font="30px Verdana";
        // 创建渐变
        var gradient=this.game.context.createLinearGradient(0, 0, 400, 0);
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.5","blue");
        gradient.addColorStop("1.0","red");
        // 用渐变填色
        this.game.context.fillStyle=gradient;
        this.game.context.fillText('按 k 开始游戏', 70, 150)
        this.game.context.fillText('按 e 开始关卡编辑', 70, 190)
    }
}