(function(scope) {
  function App() {
    this.initialize();
  }

  const canvas = App.prototype;
  const stage = App.prototype;
  const loader = App.prototype;
  const back = App.prototype;
  const spaceShip = App.prototype;

  const spaceShip_path = 'assets/nave.png';
  const _enemyPath = 'assets/malo.png';
  // const background_path = 'assets/outer_space.gif'; 
  const shootSpaceShip_path = 'assets/DisparoNave.png';

  App.prototype.initialize = function() {
    // Loading initial elements...
    const self = this;

    this.canvas = document.createElement('canvas');
    this.canvas.width = 600;
    this.canvas.height = 600;
    const container = document.getElementById('juego');
    container.appendChild(this.canvas);

    this.stage = new createjs.Stage(this.canvas);

    this.loader = new Loader();
    this.loader.onComplete = function() {
      self.loadedAssets();
    }
    this.loader.loadImgs([spaceShip_path, _enemyPath/* , background_path */, shootSpaceShip_path]);

    console.debug(this.canvas);
  }

  App.prototype.loadedAssets = function () {
    // console.log('Imgs has been loaded...');
    // console.debug(this.loader);

    const spaceShip_data = {
      images: [this.loader[spaceShip_path]],
      frames: { width: 103, height: 90 },
      animations: { run: [0, 19] , fire: [19, 47, "fire"], boom: [48, 71, "boom"] }
    };

    const spriteSheet = new createjs.SpriteSheet(spaceShip_data);
    this.spaceShip = new SpaceShip(spriteSheet);
    this.stage.addChild(this.spaceShip);

    const self = this;

    createjs.Ticker.setFPS(32);
    createjs.Ticker.addListener(e => {
      self.tick();
    });

    this.stage.addEventListener("stagemousedown", e => {
      self.handleMouseDown(e);
    });

    window.addEventListener("keydown", e => {
      this.handleMovement(e);
    }, false);
  }

  App.prototype.tick = function () {
    this.stage.update();
  }

  App.prototype.handleMouseDown = function (e) {
    this.spaceShip.jump(e);
  }

  App.prototype.handleMovement = function (e) {
    this.spaceShip.move(e);
  }

  App.prototype.loading_screen = function () {
    const load = document.getElementById('load');
    const load_1 = document.getElementById('load_1');
    const load_2 = document.getElementById('load_2');
    const load_3 = document.getElementById('load_3');

    setTimeout(() => {
      load_1.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 hidden');
      load_2.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 z-index');
    }, 250);

    setTimeout(() => {
      load_2.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 hidden');
      load_3.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 z-index');
    }, 500);

    setTimeout(() => {
      load_3.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 hidden');
      load_1.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 z-index');
    }, 750);

    setTimeout(() => {
      load_1.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 hidden');
      load_2.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 z-index');
    }, 1000);

    setTimeout(() => {
      load_2.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 hidden');
      load_3.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 z-index');
    }, 1250);

    setTimeout(() => {
      load_3.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 hidden');
      load_1.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 z-index');
    }, 1500);

    setTimeout(() => {
      load_1.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 hidden');
      load_2.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 z-index');
    }, 1750);

    setTimeout(() => {
      load.setAttribute('class', 'load hidden');
      load_1.setAttribute('class', 'load-1 row hidden');
      load_2.setAttribute('class', 'load-2 row hidden');
      load_3.setAttribute('class', 'load-3 row hidden');
    }, 2000);
  }();

  scope.App = App;
}(window));

window.onload = function() {
  this.app = new App();
}