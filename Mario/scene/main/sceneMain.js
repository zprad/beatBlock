class mainScene extends Scene {
  constructor(game) {
    super(game)
    this.init()
  }
  init() {
    var game = this.game
    this.bird = Bird(game);

    this.background = game.imageByName('background')
    this.background.x = 0
    this.background.y = 0

    this.score = 0;

    this.pipes = []
    for (let index = 0; index < 6; index++) {
      let x = window.SCREENWIDTH * (1 + parseInt(index / 2) / 2)
      let y = 0
      const pipe = Pipe(game, x, y);
      this.pipes.push(pipe)
    }

    game.registerAction("w", () => {
      this.bird.moveTop();
    });
    game.registerAction("s", () => {
      this.bird.moveBottom();
    });
    
  }
  draw() {
    var game = this.game
    
    // draw
    game.drawImage(this.background);
    game.drawImage(this.bird);
    
    
    // draw pipes
    for (let index = 0; index < this.pipes.length; index++) {
      const pipe = this.pipes[index];
      if (pipe.alive) {
        game.drawImage(pipe)
      }
    }
    // draw labels
    game.context.fillText("分数: " + this.score, 350, 50);
  }

  update() {
    if (window.paused) {
      return;
    }

    const bird = this.bird
    const game = this.game
    
    // 判断游戏结束
    for (let index = 0; index < this.pipes.length; index++) {
      const pipe = this.pipes[index];
      pipe.move()
      
      // if (bird.collide(pipe)) {
      //   var endScene = SceneEnd.new(game)
      //   game.replaceScene(endScene)
      // }

    }

    
  }
}
