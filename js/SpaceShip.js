(function (scope) {
  function SpaceShip(spriteSheet) {
    this.initialize(spriteSheet);
  }

  SpaceShip.prototype = new createjs.BitmapAnimation();
  SpaceShip.prototype.BitmapAnimation_init = SpaceShip.prototype.initialize;

  const Width = SpaceShip.prototype;
  const Height = SpaceShip.prototype;
  const exploting = SpaceShip.prototype;

  SpaceShip.prototype.initialize = function (spriteSheet) {
    this.BitmapAnimation_init(spriteSheet);

    const self = this;

    //console.log('Initializing SpaceShip');

    this.x = 256;
    this.y = 50;

    this.Width = spriteSheet.getFrame(0).rect.width;
    this.Height = spriteSheet.getFrame(0).rect.height;

    this.snapToPixel = true;

    this.velocity = {
      x: 0,
      y: -10
    };
  }

  SpaceShip.prototype.onTick = function () {
    this.velocity.y++;

    if (this.velocity.y < 0 || this.y < 500)
      this.y += this.velocity.y;

    if (this.velocity.x != 0) {
      if (this.velocity.x > 0)
        this.velocity.x--;
      else
        this.velocity.x++;

      this.x += this.velocity.x;
    }

    if (this.currentFrame == 47) this.gotoAndPlay("run");
  }

  SpaceShip.prototype.jump = function (e) {
    if ((e.stageX >= this.x) && (e.stageX < this.x + this.Width)) {
      window.app.playFire();
    } else if (e.stageX > this.x) {
      this.velocity.x = +10;
    } else if (e.stageX < this.x) {
      this.velocity.x = -10;
    }

    if ((e.stageY <= this.y - 20) && (e.stageY < this.y + this.Height)) {
      this.velocity.y = -15;
    } else if (e.stageY > this.y - 20 && e.stageY < this.y + this.Height) {
      this.velocity.y = +0;
    } else {
      this.velocity.y = +15;
    }

    this.gotoAndPlay("fire");
  }

  SpaceShip.prototype.move = function (e) {
    if (e.keyCode == 37 || e.which == 37) {
      window.app.playFire();
      this.velocity.x = -9;
    } else if (e.keyCode == 39 || e.which == 39) {
      window.app.playFire();
      this.velocity.x = +9;
    }

    if (this.y <= 55) {
      console.log(this.y);
      if (e.keyCode == 40 || e.which == 40) {
        window.app.playFire();
        this.velocity.y = +14;
      }

      return false;
    }
    
    if (e.keyCode == 38 || e.which == 38) {
      window.app.playFire();
      this.velocity.y = -14;
    }

    this.gotoAndPlay("fire");
  }

  scope.SpaceShip = SpaceShip;
}(window));