var e = selector => document.querySelector(selector);

var log = console.log.bind(console);

var imageFromPath = function(path) {
  var img = new Image();
  img.src = path;
  return img;
};

var rectIntersects = function(a, b) {
  var o = a;
  if (b.y > o.y && b.y < o.y + o.image.height) {
    if (b.x > o.x && b.x < o.x + o.image.width) {
      return true;
    }
  }
  return false;
};

var randomInt = function(min, max) {
  var range = max - min
  return min + Math.floor(Math.random() * range)
};
