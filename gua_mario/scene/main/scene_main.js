class SceneMain extends Scene {
  constructor(game) {
    super(game)
    this.init()
  }
  init() {
    var game = this.game
    // this.bird = Bird(game);
    this.sprite = NesSprite.new(game, window.bitesData)

    this.background = game.imageByName('background')
    this.background.x = 0
    this.background.y = 0
    // game.context.fillStyle = '#5080ff'
    // game.context.fillRect(0, 0, 1000, 1000)

    this.score = 0;

    // this.pipes = []
    // for (let index = 0; index < 6; index++) {
    //   let x = window.SCREENWIDTH * (1 + parseInt(index / 2) / 2)
    //   let y = 0
    //   const pipe = Pipe(game, x, y);
    //   this.pipes.push(pipe)
    // }

    this.registerAction()
    
  }
  registerAction() {
    const game = this.game

    game.registerAction("a", (keyStatus) => {
      // log('move left => ', keyStatus)
      this.sprite.moveLeft(keyStatus)
    })
    game.registerAction("d", (keyStatus) => {
      this.sprite.moveRight(keyStatus)
    })
    game.registerAction("w", (keyStatus) => {
      // log('move top => ', keyStatus)
      this.sprite.jump(keyStatus)
    })
  }
  draw() {
    // log('scene draw')
    var game = this.game
    
    // draw
    game.drawImage(this.background);
    // game.drawImage(this.bird);

    // draw sprite
    this.sprite.draw()
    
    
    // draw pipes
    // for (let index = 0; index < this.pipes.length; index++) {
    //   const pipe = this.pipes[index];
    //   if (pipe.alive) {
    //     game.drawImage(pipe)
    //   }
    // }
    // draw labels
    game.context.fillText("分数: " + this.score, 350, 50);
  }

  update() {
    if (window.paused) {
      return;
    }

    // const bird = this.bird
    const game = this.game
    const sprite = this.sprite

    sprite.update()
    
    // 判断游戏结束
    // for (let index = 0; index < this.pipes.length; index++) {
    //   const pipe = this.pipes[index];
    //   pipe.move()
      
    //   // if (bird.collide(pipe)) {
    //   //   var endScene = SceneEnd.new(game)
    //   //   game.replaceScene(endScene)
    //   // }

    // }

    
  }
}
