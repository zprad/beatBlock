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

const _ajax = (request) => {
  log('ajax start')
  let callback = request.callback
  let r = new XMLHttpRequest()
  r.open(request.method, request.url, true)
  r.responseType = request.responseType
  r.onreadystatechange = () => {
    log('ajax state => ', r.readyState, r.status)
      if (r.readyState == 4 && r.status == 200) {
          callback(r.response)
      }
  }
  r.send()
}

const __main = function() {
  window.offset = 32784
  log('main start')
  let request = {
    method: 'GET',
    url: 'mario.nes',
    responseType: 'arraybuffer',
    callback(data) {
      log('start callback')
        let bitesData = new Uint8Array(data)
        window.bitesData = bitesData.slice(window.offset)

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
        window.SCREENWIDTH = 288
        window.SCREENHEIGHT = 512
        const game = Game.instance(30, images, function(g) {
          // const s = SceneMain.new(g);
          const s = SceneEditor.new(g)
          g.runWithScene(s);
        });
      
        enableDebugMode(true)

        

        // log('bitesData => ', bitesData)
        // drawNes(bitesData)
        // let frameCount = 4
        // let frameIndex = 0
        // setInterval(() => {
        //     frameIndex++
        //     frameIndex = frameIndex % frameCount
        //     if (window.pause) {
        //         return
        //     }
        //     drawSprite(bitesData.slice(window.offset + frameIndex * 16 * 8))
        // }, 500)
        
    }
  }
  _ajax(request)

};

__main();
