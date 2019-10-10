var Bird = function(game) {
  var o = game.imageByName("bird")
  o.x = 20
  o.y = window.SCREENHEIGHT / 2
  o.speed = 10
  o.alive = true
  o.move = function(y) {
    if (y < 0) {
      y = 0
    } else if (y > window.SCREENHEIGHT - o.h) {
      y = window.SCREENHEIGHT - o.h
    } else {

    }
    o.y = y
  }
  o.moveTop = function() {
    o.move(o.y - o.speed)
  }
  o.moveBottom = function() {
    o.move(o.y + o.speed)
  }
  o.collide = function(pipe) {
    return o.alive && (rectIntersects(o, pipe) || rectIntersects(pipe, o))
  }
  return o
}