(function(scope) {
  function Loader() {
    this.initialize();
  }

  const loads = Loader.prototype;
  const totals = Loader.prototype;
  const onComplete = Loader.prototype;

  Loader.prototype.initialize = function () {
    this.loads = 0;
    this.totals = 0;
    
    // console.log('Loader generated...');
  };

  Loader.prototype.loadImgs = function (list) {
    this.loads = 0;
    this.totals = list.length;

    for (let i = 0; i < this.totals; i++) {
      this.loadImg(list[i]);
    }
  }

  Loader.prototype.loadImg = function (route) {
    const self = this;
    const image = new Image();
    
    this[route] = image;

    image.onload = function(e) {
      self.loadedImg(e);
    }

    image.src = image.url = route;
    // console.debug(image)
  }

  Loader.prototype.loadedImg = function () {
    this.loads++;

    if (this.loads == this.totals) {
      if (this.onComplete)
        this.onComplete();
      else
        console.log('onComplete not defined...');
    }
  }

  scope.Loader = Loader;
}(window));