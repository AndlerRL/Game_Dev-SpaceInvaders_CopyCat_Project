(function(scope) {
  function App() {
    this.initialize();
  }

  const canvas = App.prototype;
  const stage = App.prototype;
  const loader = App.prototype;

  const spaceShip_path = 'assets/nave.png';
  const _enemyPath = 'assets/malo.png';
  const background_path = 'assets/outer_space.gif'; 
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
    this.loader.loadImgs([spaceShip_path, _enemyPath, background_path, shootSpaceShip_path]);

    console.debug(this.canvas);
  }

  App.prototype.loadedAssets = function () {
    console.log('Imgs has been loaded...');
    console.debug(this.loader);
  }

  scope.App = App;
}(window));

window.onload = function() {
  this.app = new App();
}