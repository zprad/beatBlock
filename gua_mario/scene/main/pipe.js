var Pipe = function (game, x, y) {
  var o = game.imageByName("pipe_top");
  o.x = x || 0
  o.y = y || 0
  // o.y = randomInt(-1 * window.SCREENHEIGHT, 0)
  o.speed = -3
  o.alive = true
  o.move = function () {
    if (o.x < 0 - o.w || !o.alive) {
      o.reborn()
      return
    }
    o.x += o.speed
  }
  o.kill = function () {
    o.alive = false
  }
  o.reborn = function () {
    o.x = 3 / 2 * window.SCREENWIDTH
    o.y = y || 0
    o.alive = true
  }
  return o
}

