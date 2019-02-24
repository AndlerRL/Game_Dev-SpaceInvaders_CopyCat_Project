(function (scope) {
  function App() {
    this.initialize();
  }

  const canvas = App.prototype;
  const stage = App.prototype;
  const loader = App.prototype;
  const back = App.prototype;
  const spaceShip = App.prototype;
  const enemyContainer = App.prototype;
  const shoot = App.prototype;
  const _fps = App.prototype;

  let scoreCount = 0;

  const SOUNDS = App.prototype;
  let loadedSounds = App.prototype;

  const spaceShip_path = 'assets/nave.png';
  const _enemyPath = 'assets/malo.png';
  const shootSpaceShip_path = 'assets/DisparoNave.png';

  const enemyPath = App.prototype;

  App.prototype.initialize = function () {
    // Loading initial elements...
    this.enemyPath = _enemyPath;
    this._fps = 40;

    const self = this;

    this.canvas = document.createElement('canvas');
    this.canvas.width = 600;
    this.canvas.height = 600;

    const container = document.getElementById('juego');
    container.appendChild(this.canvas);

    this.stage = new createjs.Stage(this.canvas);

    this.loader = new Loader();
    this.loader.onComplete = function () {
      self.loadedAssets();
    }
    this.loader.loadImgs([spaceShip_path, _enemyPath, shootSpaceShip_path]);

    if (createjs.Touch.isSupported()) {
      createjs.Touch.enable(this.stage);
    }

    this.stage.addEventListener("stagemousedown", e => {
      self.handleMouseDown(e);
    });

    window.addEventListener("keydown", e => {
      this.handleMovement(e);
    }, false);
    //console.debug(this.canvas);
  }

  App.prototype.loadedAssets = function () {
    // console.log('Imgs has been loaded...');
    // console.debug(this.loader);

    this.loadSounds();
  }

  App.prototype.exeApp = function () {
    const spaceShip_data = {
      images: [this.loader[spaceShip_path]],
      frames: {
        width: 103,
        height: 90
      },
      animations: {
        run: [0, 19],
        fire: [19, 47, "fire"],
        boom: [48, 71, "boom"]
      }
    };

    const spriteSheet = new createjs.SpriteSheet(spaceShip_data);
    this.spaceShip = new SpaceShip(spriteSheet);
    this.stage.addChild(this.spaceShip);

    const self = this;

    createjs.Ticker.setFPS(this._fps);
    createjs.Ticker.addListener(e => {
      self.tick();
    });
    createjs.Ticker.addListener(this.tickCreateEnemy);
  }

  App.prototype.tickCreateEnemy = function () {
    const app = window.app;
    const point = app.spaceShip.localToGlobal(app.spaceShip.x, app.spaceShip.y);

    if (point.y > 200) {
      const container = new EnemyContainer();
      
      app.stage.addChild(container);
      enemyContainer.x = 0;
      enemyContainer.y = 0;
      app.enemyContainer = container;
      createjs.Ticker.removeListener(app.tickCreateEnemy);
    }
  }

  App.prototype.tick = function (e) {
    if (this.enemyContainer) {
      this.enemyContainer.testSpaceShip_shoot(this.shoot);
      this.enemyContainer.testSpaceShip_crash(this.spaceShip);
    }

    this.stage.update();
  }

  App.prototype.handleMouseDown = function (e) {
    this.spaceShip.jump(e);
  }

  App.prototype.handleMovement = function (e) {
    this.spaceShip.move(e);
  }

  App.prototype.spaceShip_shoot = function (Xaxis, Yaxis) {
    if (this.shoot == null)
      this.shoot = new SpaceShip_Shoot(this.loader[shootSpaceShip_path], Xaxis, Yaxis);
  }

  App.prototype.end = function () {
    const game_over = document.getElementById('rotulo');
    const play_again = document.getElementById('play_again');

    game_over.setAttribute('class', 'z-index');
    play_again.addEventListener("click", () => {
      window.location.reload();
      game_over.setAttribute('class', 'hidden');
    });

    scoreCount = 0;
  }

  App.prototype.loadSounds = function () {
    loadedSounds = 0;
    const registeredPlugins = createjs.Sound.registerPlugins([
      createjs.CocoonJSAudioPlugin,
      createjs.WebAudioPlugin,
      createjs.HTMLAudioPlugin
    ]);

    if (registeredPlugins) {
      createjs.Sound.addEventListener("loadComplete", createjs.proxy(this.soundsLoaded, this));
      SOUNDS.SOUNDS = {};

      SOUNDS.SOUNDS.FIRE = 'sfx/fire.m4a|sfx/fire.ogg';
      createjs.Sound.registerSound(SOUNDS.SOUNDS.FIRE, "FIRE", 2);

      SOUNDS.SOUNDS.BOOM = 'sfx/boom.m4a|sfx/boom.ogg';
      createjs.Sound.registerSound(SOUNDS.SOUNDS.BOOM, "BOOM", 4);

      SOUNDS.SOUNDS.POP = 'sfx/pop.m4a|sfx/pop.ogg';
      createjs.Sound.registerSound(SOUNDS.SOUNDS.POP, "POP", 4);

      /* SOUNDS.SOUNDS.ENEMY = 'sfx/enemy.m4a|sfx/enemy.ogg';
      createjs.Sound.registerSound(SOUNDS.SOUNDS.ENEMY, "ENEMY", 4) */
    }
  }

  App.prototype.soundsLoaded = function (e) {
    loadedSounds++;

    if (loadedSounds == 3) {
      //console.log("Sounds Loaded");
      this.exeApp();
    }
  }

  App.prototype.playFire = function () {
    const myInstance = createjs.Sound.createInstance("FIRE");
    myInstance.play();
  }

  App.prototype.playBoom = function () {
    const myInstance = createjs.Sound.createInstance("BOOM");
    myInstance.play();
  }

  App.prototype.playPop = function () {
    const myInstance = createjs.Sound.createInstance("POP");
    myInstance.play();
  }

  /* App.prototype.playEnemy = function () {
    const myInstance = createjs.Sound.createInstance("ENEMY");
    const props = createjs.PlayPropsConfig().set({
      interrupt: createjs.Sound.INTERRUPT_NONE,
      loop: -1
    })
    myInstance.play();
  } */

  App.prototype.loading_screen = function () {
    const load = document.getElementById('load');
    const load_1 = document.getElementById('load_1');
    const load_2 = document.getElementById('load_2');
    const load_3 = document.getElementById('load_3');

    setTimeout(() => {
      load_1.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 hidden');
      load_2.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 z-index');
    }, 150);

    setTimeout(() => {
      load_2.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 hidden');
      load_3.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 z-index');
    }, 300);

    setTimeout(() => {
      load_3.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 hidden');
      load_1.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 z-index');
    }, 450);

    setTimeout(() => {
      load_1.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 hidden');
      load_2.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 z-index');
    }, 600);

    setTimeout(() => {
      load_2.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 hidden');
      load_3.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 z-index');
    }, 750);

    setTimeout(() => {
      load_3.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 hidden');
      load_1.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 z-index');
    }, 1000);

    setTimeout(() => {
      load_1.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 hidden');
      load_2.querySelector('h2:nth-child(2)').setAttribute('class', 'col s6 pull-s1 z-index');
    }, 1150);

    setTimeout(() => {
      load.setAttribute('class', 'load hidden');
      load_1.setAttribute('class', 'load-1 row hidden');
      load_2.setAttribute('class', 'load-2 row hidden');
      load_3.setAttribute('class', 'load-3 row hidden');
    }, 1300);
  }();

  scope.App = App;
}(window));

window.onload = function () {
  this.app = new App();
}