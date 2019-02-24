(function (scope) {
  function EnemyContainer() {
    this.initialize();
  }

  EnemyContainer.prototype = new createjs.Container();
  EnemyContainer.prototype.Container_init = EnemyContainer.prototype.initialize;

  const enemy = EnemyContainer.prototype;
  const indexEnemies = EnemyContainer.prototype;
  const enemyCount = EnemyContainer.prototype;
  const lines = EnemyContainer.prototype;
  const steps = EnemyContainer.prototype;
  const initY = EnemyContainer.prototype;
  const loaded = EnemyContainer.prototype;

  let scoreCount = 0;
  let lastScore = 0;
  let highScore = 0;

  let str_lastScore = localStorage.getItem('lastScore');
  let str_highScore = localStorage.getItem('highScore');

  const vX = EnemyContainer.prototype;
  const vY = EnemyContainer.prototype;

  EnemyContainer.prototype.initialize = function () {
    this.Container_init();

    this.vX = 6;
    this.vY = 70;
    this.velocity = {
      x: this.vX,
      y: 0.16666
    };
    this.init();
  }

  EnemyContainer.prototype.init = function () {
    const self = this;
    this.loaded = false;

    // console.log('Initializing EnemyContainer');

    this.x = 0;
    this.y = 0;

    this.enemies = new Array();
    this.indexEnemies = 0;
    this.enemyCount = 7;
    this.lines = 3;
    this.steps = 0;
    this.initY = 60;

    this.snapToPixel = true;

    createjs.Ticker.addListener(this.tickCreator);
  }

  EnemyContainer.prototype.onTick = function () {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.x >= 150)
      this.velocity.x = this.velocity.x * -1;
    else if (this.x <= -150) {
      this.velocity.x = this.velocity.x * -1;

      if (this.steps < 3)
        this.steps++;
      else {
        this.steps = 0;
        this.y += this.vY;

        if (this.y > 400)
          this.y = 0;
      }
    }
  }

  EnemyContainer.prototype.createEnemy = function () {
    if (!this.loaded) {
      // window.app.playEnemy();

      if (this.indexEnemies < this.enemyCount * this.lines) {
        const enemyData = {
          images: [window.app.loader[window.app.enemyPath]],
          frames: {
            width: 33,
            height: 31
          },
          animations: {
            run: [0, 12],
            boom: [13, 24, "boom"]
          }
        };

        const Ypos = Math.floor(this.indexEnemies / this.enemyCount);
        const Xpos = this.indexEnemies - (Ypos * this.enemyCount);

        const spriteSheet = new createjs.SpriteSheet(enemyData);
        const enemy = new Enemy(spriteSheet);

        enemy.x = 50 + Xpos * 80;
        enemy.y = this.initY + Ypos * 60;
        this.addChild(enemy);

        this.enemies.push(enemy);
        this.indexEnemies++;
      } else {
        this.loaded = true;
        createjs.Ticker.removeListener(this.tickCreator);
      }
    }
  }

  EnemyContainer.prototype.tickCreator = function () {
    window.app.enemyContainer.createEnemy();
  }

  EnemyContainer.prototype.testSpaceShip_shoot = function (shoot) {
    if (shoot != null) {
      for (let i = 0; i < this.enemies.length; i++) {
        const enemy = this.enemies[i];

        col = ndgmr.checkRectCollision(enemy, shoot);

        if (col) {
          enemy.explode();
          scoreCount += 10;
          this.enemies.splice(i, 1);
          shoot.destroy();
          this.testTotals();
          this.score();

          console.log(scoreCount);
          break;
        }
      }
    }
  }

  EnemyContainer.prototype.testSpaceShip_crash = function (spaceShip) {
    if (spaceShip != null) {
      for (let i = 0; i < this.enemies.length; i++) {
        const enemy = this.enemies[i];

        col = ndgmr.checkRectCollision(enemy, spaceShip);

        if (col) {
          enemy.explode();
          this.enemies.splice(i, 1);
          spaceShip.explode();

          console.log('highScore: ' + highScore + '\n' + 'lastScore: ' + lastScore);

          if ((str_lastScore == null || str_lastScore == "null") && (str_highScore == null || str_highScore == "null")) {
            lastScore = scoreCount;
            highScore = lastScore;
          } else {
            lastScore = parseInt(str_lastScore);
            highScore = parseInt(str_highScore);
          }

          lastScore = scoreCount;

          if (lastScore > highScore) {
            highScore = lastScore;

            localStorage.setItem('highScore', highScore);
            localStorage.setItem('lastScore', lastScore);
          }

          const HighScore = document.getElementById('highScore');
          HighScore.innerHTML = highScore;
          
          const LastScore = document.getElementById('lastScore');
          LastScore.innerHTML = lastScore;

          console.log('highScore: ' + highScore + '\n' + 'lastScore: ' + lastScore);
          this.score();
          break;
        }
      }
    }
  }

  EnemyContainer.prototype.testTotals = function () {
    if (this.enemies.length == 0) {
      this.init();
      this.forward();
    }
  }

  EnemyContainer.prototype.forward = function () {
    this.velocity.x += 2.25;
  }

  EnemyContainer.prototype.score = function () {
    const score = document.getElementById('score');
    score.innerHTML = scoreCount;
  };

  scope.EnemyContainer = EnemyContainer;
}(window));