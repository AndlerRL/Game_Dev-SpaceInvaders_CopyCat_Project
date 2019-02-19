(function(scope) {
  function Loader() {
    this.initialize();
  }

  const loads = Loader.prototype;
  const totals = Loader.prototype;
  const onComplete = Loader.prototype;

  Loader.prototype.initialize = function () {
    console.log('Loader generated...');
  };

  Loader.prototype.loadImgs = function (list) {
    this.loads = 0;
    this.totals = list.length;

    for (i = 0; i < this.totals; i++) {
      this.loadImg(list[i]);
    }
  }

  Loader.prototype.loadImg = function (route) {
    const self = this;
    const image = new Image();
    
    this[route] = image;

    image.onload = function(e) {
      self.loadedImg();
    }

    image.src = image.url = route;
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