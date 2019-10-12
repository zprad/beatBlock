class GuaTileMap {
  constructor(game) {
    this.game = game
    this.tiles = [
      1, 2, 3, 0, 4, 1, 2, 3, 0, 4, 1, 2, 3, 0, 4,
      3, 1, 4, 0, 2, 1, 2, 3, 0, 4, 1, 2, 3, 0, 4,
      2, 2, 2, 0, 3, 1, 2, 3, 0, 4, 1, 2, 3, 0, 4,
      5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      //
      1, 2, 3, 0, 4, 1, 2, 3, 0, 4, 1, 2, 3, 0, 4,
      3, 1, 4, 0, 2, 1, 2, 3, 0, 4, 1, 2, 3, 0, 4,
      2, 2, 2, 0, 3, 1, 2, 3, 0, 4, 1, 2, 3, 0, 4,
      5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]
    // 一列5个
    this.th = 15
    // Todo: tw必须为整数
    this.tw = this.tiles.length / this.th
    this.tileImages = [
      game.imageByName('b1'),
      game.imageByName('b2'),
      game.imageByName('b3'),
      game.imageByName('b4'),
      game.imageByName('b5'),
    ]
    this.tileWidth = 32
  }
  static new(...args) {
    return new this(...args)
  }
  draw() {
    const game = this.game
    for (let index = 0; index < this.tiles.length; index++) {
      const indexOfImage = this.tiles[index];
      if (indexOfImage === 0) {
        continue
      }
      let x = Math.floor(index / this.th) * this.tileWidth
      let y = (index % this.th) * this.tileWidth
      let tileImage = this.tileImages[indexOfImage]
      tileImage.x = x
      tileImage.y = y
      game.drawImage(tileImage)
    }
  }
  update() {

  }
}

class SceneEditor extends Scene {
    constructor(game) {
      super(game)
      this.init()
    }
    init() {
      var game = this.game
      // this.bird = Bird(game);
      this.sprite = NesSprite.new(game, window.bitesData)
  
      // game.context.fillStyle = '#5080ff'
      // game.context.fillRect(0, 0, 1000, 1000)
  
      this.score = 0;

      this.map = GuaTileMap.new(game)
  
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
        this.sprite.move(-1, keyStatus)
      })
      game.registerAction("d", (keyStatus) => {
        this.sprite.move(1, keyStatus)
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
      // game.drawImage(this.background);
      // game.drawImage(this.bird);

      this.map.draw()
  
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
      // game.context.fillText("分数: " + this.score, 350, 50);
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
  