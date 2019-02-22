(function (scope) {
  function Enemy(spriteSheet) {
    this.initialize(spriteSheet);
  }

  Enemy.prototype = new createjs.BitmapAnimation();
  Enemy.prototype.BitmapAnimation_init = Enemy.prototype.initialize;

  const Width = Enemy.prototype;
  const Height = Enemy.prototype;

  Enemy.prototype.initialize = function (spriteSheet) {
    this.BitmapAnimation_init(spriteSheet);
    this.gotoAndPlay("run");

    this.Width = spriteSheet.getFrame(0).rect.width;
    this.Height = spriteSheet.getFrame(0).rect.height;

    this.snapToPixel = true;
  }

  Enemy.prototype.onTick = function () {
    if (this.currentFrame == 24) {
      this.parent.removeChild(this);
    }
  }

  Enemy.prototype.explode = function () {
    window.app.playBoom();
    this.gotoAndPlay("boom");
  }

  scope.Enemy = Enemy;
}(window));