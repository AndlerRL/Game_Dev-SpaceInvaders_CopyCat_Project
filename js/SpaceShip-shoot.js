(function (scope) {
  function SpaceShip_Shoot (img, Xaxis, Yaxis) {
    this.initialize(img, Xaxis, Yaxis);
  }

  SpaceShip_Shoot.prototype = new createjs.Bitmap();
  SpaceShip_Shoot.prototype.Bitmap_init = SpaceShip_Shoot.prototype.initialize;

  const Width = SpaceShip_Shoot.prototype;

  SpaceShip_Shoot.prototype.initialize = function (img, Xaxis, Yaxis) {
    this.Width = 6;

    this.Bitmap_init(img);
    this.x = Xaxis;
    this.y = Yaxis;

    app.stage.addChild(this);

    this.snapToPixel = true;
    this.velocity = {
      x: 0,
      y: -18
    };

    window.app.playPop();
  }


  SpaceShip_Shoot.prototype.onTick = function () {
    if (this.y < 0) {
      this.destroy();
    } else if (this.velocity.y < 0) {
      this.y += this.velocity.y;
    }
  }

  SpaceShip_Shoot.prototype.destroy = function () {
    window.app.shoot = null;
    app.stage.removeChild(this);
  }

  scope.SpaceShip_Shoot = SpaceShip_Shoot;
}(window));