(function(scope) {
  function App() {
    this.initialize();
  }

  const canvas = App.prototype;
  const stage = App.prototype;
  const loader = App.prototype;
  const back = App.prototype;

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

    let container = document.getElementById('juego');
    container.appendChild(this.canvas);

    this.stage = new createjs.Stage(this.canvas);

    this.loader = new Loader();
    this.loader.onComplete = function() {
      self.loadedAssets();
    }
    this.loader.loadImgs([spaceShip_path, _enemyPath, /* background_path, */ shootSpaceShip_path]);

    console.debug(this.canvas);
  }

  App.prototype.loadedAssets = function () {
    console.log('Imgs has been loaded...');
    console.debug(this.loader);
    /* const bmp = this.loader[background_path];
    this.back = new createjs.Bitmap(bmp);
    this.back.alpha = 0.85;
    this.stage.addChild(this.back); */

    const self = this;

    createjs.Ticker.setFPS(32);
    createjs.Ticker.addListener(function (e) {
      self.tick();
    });
  }

  App.prototype.tick = function () {
    this.stage.update();
  }

  App.prototype.loading_screen = function () {
    const load = document.getElementById('load');
    const load_1 = document.getElementById('load_1');
    const load_2 = document.getElementById('load_2');
    const load_3 = document.getElementById('load_3');

    setTimeout(function () {
      load_1.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 hidden');
      load_2.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 z-index');
    }, 300);

    setTimeout(function () {
      load_2.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 hidden');
      load_3.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 z-index');
    }, 600);

    setTimeout(function () {
      load_3.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 hidden');
      load_1.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 z-index');
    }, 900);

    setTimeout(function () {
      load_1.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 hidden');
      load_2.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 z-index');
    }, 1200);

    setTimeout(function () {
      load_2.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 hidden');
      load_3.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 z-index');
    }, 1500);

    setTimeout(function () {
      load_3.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 hidden');
      load_1.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 z-index');
    }, 1800);

    setTimeout(function () {
      load_1.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 hidden');
      load_2.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 z-index');
    }, 2100);

    setTimeout(function () {
      /* load_2.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 hidden');
      load_3.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 z-index'); */

      load.setAttribute('class', 'load hidden');
      load_1.setAttribute('class', 'load-1 row hidden');
      load_2.setAttribute('class', 'load-2 row hidden');
      load_3.setAttribute('class', 'load-3 row hidden');
    }, 2400);

    /* setTimeout(function () {
      load.setAttribute('class', 'load hidden');
      load_1.setAttribute('class', 'load-1 row hidden');
      load_2.setAttribute('class', 'load-2 row hidden');
      load_3.setAttribute('class', 'load-3 row hidden');
    }, 2700); */
  }();

  scope.App = App;
}(window));

window.onload = function() {
  this.app = new App();
}