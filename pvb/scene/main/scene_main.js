class SceneMain extends Scene {
  constructor(game) {
    super(game)
    this.init()
  }
  init() {
    let game = this.game
    this.debugPath = []

    // this.background = GuaImage.new(game, 'background')
    // this.addElement(this.background)

    this.setMap()

    this.gun = GuaImage.new(game, 'b1', 500, 280)
    this.addElement(this.gun)

    this.enemys = []
    this.towers = []
    this.setEnemys()
    this.setTowers()
    

    this.registerAction()
    this.registerMouse()
    
  }
  setMap() {
    this.map = TDMap.new(this.game, 100)
  }
  setEnemys() {
    this.addEnemy()
  }
  addEnemy() {
    let y = 100
    let x = 0
    const enemy = Enemy.new(this.game, 'b3', x, y)
    this.addElement(enemy)
    this.enemys.push(enemy)
    
  }
  drawPath(path) {
    let context = this.game.context
    context.fillStyle = 'rgba(200, 200, 200, 0.2)'
    for (const p of path) {
      // log('position => ', p)
      let [x, y] = p
      context.fillRect(x, y, 100, 100)
    }
  }
  findPathing(start, end) {
    let [i1, j1] = start
    let [i2, j2] = end
    let grids = this.map.normalGrid()
    let graph = new Graph(grids)
    let start1 = graph.grid[i1][j1]
    let end1 = graph.grid[i2][j2]
    let result = astar.search(graph, start1, end1)
    let path = []
    for (const p of result) {
      path.push([p.x * 100, p.y * 100])
    }
    return path
  }
  setTowers() {
    this.addTowers(200, 100)
    this.addTowers(200, 300)
  }
  addTowers(x, y) {
    let game = this.game
    let tileSize = this.map.tileSize
    let [i, j] = this.map.computeRowAndColumn(x, y)
    let tower = Tower.new(game, 'b1', i * tileSize, j * tileSize)
    this.addElement(tower)
    this.towers.push(tower)
    this.map.addTower(x, y)
    this.findPathForEnemies()
  }
  findPathForEnemies() {
    for (const e of this.enemys) {
      let start = this.map.computeRowAndColumn(e.x, e.y)
      let path = this.findPathing(start, [5, 2])
      e.setPath(path)
      this.debugPath = path
    }
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
  positionInCanvas(event) {
    const target = event.target
    let rect = target.getBoundingClientRect()
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top
    return [x, y]
  }
  blockCoordsInCanvas(event, eWidth) {
    let [x, y] = this.positionInCanvas(event)
    let i = Math.floor(x / eWidth)
    let j = Math.floor(y / eWidth)
    return [i, j]
  }
  registerMouse() {
    const { game, gun } = this
    let isDragGun = false
    let offset = 16
    game.registerMouseAction("mousedown", (event) => {
      let [x, y] = this.positionInCanvas(event)
      if (gun.isContain(x, y)) {
        this.tower = gun.copy()
        this.addElement(this.tower)
        isDragGun = true
      }
    })
    game.registerMouseAction("mousemove", (event) => {
      if (isDragGun) {
        let [x, y] = this.positionInCanvas(event)
        this.tower.x = x - offset
        this.tower.y = y - offset
      } 
    })
    game.registerMouseAction("mouseup", (event) => {
      isDragGun = false
      this.removeElement(this.tower)
      let [x, y] = this.positionInCanvas(event)
      this.addTowers(x, y)
    })
  }
  draw() {
    super.draw()
    // log('scene draw')
    this.drawPath(this.debugPath)
  
  }
  checkEnemys() {
    // to check with gua video
    // 先删除elements中的
    this.enemys.forEach((item) => {
      if (item.isDead) {
        this.removeElement(item)
      }
    })
    this.enemys = this.enemys.filter((enemy) => !enemy.isDead)
    
    let enemys = this.enemys
    let towers = this.towers
    for (let index = 0; index < enemys.length; index++) {
      const enemy = enemys[index]
      this.removeElement()
      for (let i = 0; i < towers.length; i++) {
        const tower = towers[i]
        if (tower.target == null) {
          tower.target = enemy
          tower.canAttack()
        }
      }
    }
  }
  update() {
    if (window.paused) {
      return;
    }
    this.checkEnemys()

    super.update()

    
  }
}
