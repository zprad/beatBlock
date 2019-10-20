class Scene {
  constructor(game) {
    this.game = game;
    this.elements = []
  }
  static new(game) {
    var i = new this(game);
    return i;
  }
  addElement(element) {
    this.elements.push(element)
  }
  removeElement(node) {
    this.elements = this.elements.filter((el) => el != node)
  }
  draw() {
    var g = this.game
    var a = this.elements
    for (let index = 0; index < a.length; index++) {
      const element = a[index];
      element.draw()
    }
  }
  update() {
    var a = this.elements
    for (let index = 0; index < a.length; index++) {
      const element = a[index];
      element.update()
    }
  }
}
