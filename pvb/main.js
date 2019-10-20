const enableDebugMode = function(enable = true) {
  if (!enable) {
    return;
  }
  window.paused = false;
  window.addEventListener("keydown", function(event) {
    let k = event.key;
    if (k == "p") {
      // 暂停功能
      window.paused = !window.paused;
    }
  });
};

const testPathFinding = () => {
  var graph = new Graph([
		[1,1,1,1],
		[0,1,1,0],
		[0,0,1,1]
	]);
	var start = graph.grid[0][0];
	var end = graph.grid[1][2];
  var result = astar.search(graph, start, end);
  log('path result => ', result)
}

const __main = function() {
  const images = {
    bird: "img/fly1.png",
    background: "img/background.png",
    ground: "img/ground.png",
    pipe_bottom: "img/pipe_bottom.png",
    b1: "img/b1.png",
    b2: "img/b2.png",
    b3: "img/b3.png",
    b4: "img/b4.png",
    b5: "img/b5.png",
    // pipe_top: "img/pipe_top.png",
  };
  window.SCREENWIDTH = 600
  window.SCREENHEIGHT = 400
  const game = Game.instance(30, images, function(g) {
    // const s = SceneMain.new(g);
    const s = SceneMain.new(g)
    g.runWithScene(s);
  });

  enableDebugMode(true)
  testPathFinding()

};

__main();
