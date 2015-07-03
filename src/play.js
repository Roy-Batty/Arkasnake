
Game.Play = function (game) { };

Game.Play.prototype = {

	create: function () {
		game.stage.backgroundColor = '#000';

		game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision.down = false;

		this.cursor = this.game.input.keyboard.createCursorKeys();
    
    level++;
    
		var style = { font: '20px Arial', fill: 'rgba(255, 255, 255, 0.75)'};
		this.scoreLabel = game.add.text(0, 0, '' + score, style);
    
    
		var style = { font: '20px Arial', fill: '#fff'};
		this.textIni = game.add.text(semiW, Height - 140, 'Pulsa flecha derecha para comenzar', style);
    this.textIni.anchor.setTo(0.5, 0.5);
    
    this.hearts = game.add.group();
    for(var i = 0; i < lives; i++){
      var heart = this.game.add.sprite(Width - 10, 10 + 20 *i, 'heart');
      heart.anchor.setTo(0.5, 0.5);
      heart.scale.setTo(0.15, 0.15);
      heart.alpha = 0.75;
      this.hearts.add(heart);
    }
    
		this.snakeArray = [];
		this.snake = game.add.group();
		this.newBody(0, 1, true);
		this.newBody(-1, 1);
		this.newBody(-2, 1);
    
    this.ball = this.game.add.sprite(0, -50, 'ball');
		this.ball.anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(this.ball);
		//this.ball.body.setSize(1, 1, 0, 0);
    this.ball.checkWorldBounds = true;
    this.ball.body.collideWorldBounds = true;
    this.ball.body.bounce.set(1);
    this.ball.events.onOutOfBounds.add(this.ballLost, this);
    
    this.lines = game.add.group();
    
    for(var i=0; i<Width/30; i++){
      var line = this.game.add.sprite(-semiW+i*30, 0, 'line');
      this.lines.add(line);
    }
    
    var map = maps[level];
    this.bricks = game.add.group();
    for(var i=0; i<map.length; i++) {
      for(var j=0; j<map[i].length; j++) {
        var num = map[i][j];
        if(num!=0) {
          this.newBrick(leftB+j*60, topB+i*20, num);
        }
      }
    }
      
    
    
    
		this.food = this.game.add.sprite(100, 100, 'food');
		this.food.anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(this.food);
		this.food.body.setSize(1, 1, 0, 0);

		this.level = game.add.group();
		this.level.add(this.snake);
		this.level.add(this.ball);
		this.level.add(this.lines);
		this.level.add(this.bricks);
		this.level.add(this.food);
		this.level.x = semiW;
		this.level.y = limit;
    

		this.direction = 4;
		this.maxSnake = {top: 0, down: Height-limit, right: semiW, left: semiW};
		this.isDead = false;
    this.start = false;

		
	},

	update: function() {
    if(!this.start && this.cursor.right.isDown) {
      this.start = true;
      this.ball.body.velocity.setTo(66, 66);
      game.time.events.loop(200, this.move, this);
      
      var tw = game.add.tween(this.textIni).to({alpha: 0}, 350).start();
    }
    else {
      
      game.physics.arcade.collide(this.ball, this.snake);//, null, null, this);
      game.physics.arcade.collide(this.ball, this.bricks, this.breakBrick, null, this);

      game.physics.arcade.overlap(this.snake, this.food, this.takeFood, null, this);

      if (this.snakeArray[0].x >= this.maxSnake.right 
          || this.snakeArray[0].x <= -this.maxSnake.left
          || this.snakeArray[0].y >= this.maxSnake.down
          || this.snakeArray[0].y <= -this.maxSnake.top)
        this.dead();

      this.playerMovements();
    }
    
	},

	newBody: function(i, j, head) {
    
		var body = this.game.add.sprite(0, 0, 'player');
		body.anchor.setTo(0.5, 0.5);
		body.reset(i*20, j*20);
		body.isHead = head || false;
		game.physics.arcade.enable(body);
    body.body.immovable = true;
		body.body.setSize(20, 20, 0, 0);
		this.snake.add(body);
		this.snakeArray.push(body);

	},

	newBrick: function(x, y, num) {
    
    var brick = this.game.add.sprite(x, y, 'brick'+num);
    brick.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(brick);
    brick.body.immovable = true;
    brick.body.setSize(60, 20, 0, 0);
    brick.hits = num;
    this.bricks.add(brick);

	},

	dead: function() {
		if (this.isDead)
			return;
    
		this.isDead = true;
    this.ball.body.velocity.setTo(0, 0);
    lives--;
    
    
    game.add.tween(this.hearts.children[lives]).to({x:semiW, y:semiH}, 1000).start();
    var t1 = game.add.tween(this.hearts.children[lives].scale).to({x:1.5, y:1.5}, 1000).start();
    var t2 = game.add.tween(this.hearts.children[lives].scale).to({x:0, y:0}, 1000)
    t1.chain(t2);
    
    if(lives>0){
      
      t2.onComplete.add(function(){
        this.hearts.children[lives].destroy();
        this.reset();
      }, this);
      
    }
    else {
      var t3 = game.add.tween(this.level.scale).delay(500).to({x:0, y:0}, 500);
      t2.chain(t3);
      
      t3.onComplete.add(function(){
        game.state.start('Over');
      }, this);
    }
    
	},

	win: function() {
		if (this.isDead)
			return;

		var t = game.add.tween(this.level.scale).to({x:0, y:0}, 500).start();
    
    if(maps[level+1] === undefined){
      level = 0;
      t.onComplete.add(function(){
        game.state.start('Over');
      }, this);      
    }
    else {

      t.onComplete.add(function(){
        game.state.start('Play');
      }, this);
    }
	},
  
  reset: function() {
    this.snake.destroy();
    
    this.snakeArray = [];
		this.snake = game.add.group();
		this.newBody(0, 1, true);
		this.newBody(-1, 1);
		this.newBody(-2, 1);
    this.level.add(this.snake);
    
    this.ball.body.velocity.setTo(0, 0);
    this.ball.reset(0, -50);
    
		this.direction = 4;
		this.isDead = false;
    this.start = false;
    game.time.events.removeAll();
  },

	move: function() {
		if (this.isDead)
			return;

		var head = this.snakeArray[0];
		var headX = head.x;
		var headY = head.y;

		if (this.direction == 1)
			headY -= 20;
		else if (this.direction == 2)
			headY += 20;
		else if (this.direction == 3)
			headX -= 20;
		else if (this.direction == 4)
			headX += 20;

		this.snake.forEach(function(e){
			if (!e.isHead && head.x == e.x && head.y == e.y)
				this.dead();
		}, this);
    
    if (this.isDead)
			return;

		head.isHead = false;

		this.currentDirection = this.direction;

		var tail = this.snakeArray.pop();
		tail.x = headX;
		tail.y = headY;
    tail.isHead = true;
		this.snakeArray.unshift(tail);
	},

	takeFood: function() {
		if (this.isDead)
			return;

		var pos;
		var tmp = true;
    var w = (Width-20)/20;
    var h = (Height - limit-40)/20;

		while (tmp) {
			pos = {x: 10-semiW+rand(w)*20, y: 20+rand(h)*20};

			tmp = false;
			this.snake.forEach(function(e){
				if (e.x == pos.x && e.y == pos.y)
					tmp = true;
			}, this);
		}
		
		this.food.reset(pos.x, pos.y);
		
		score += 100;
		this.scoreLabel.text = score;
		this.newBody(50, 50);
    
	},
  
  breakBrick: function(ball, brick) {
    brick.hits--;
    
    if(brick.hits>0){
      
      var x = brick.x;
      var y = brick.y;
      var n = brick.hits;
      
      this.newBrick(x, y, n);
      
      brick.destroy();
            
      score += 10;
		  this.scoreLabel.text = score;
    }
    else {
      brick.destroy();
      this.ball.body.velocity.y += this.ball.body.velocity.y>0?4:-4;
      this.ball.body.velocity.x += this.ball.body.velocity.x>0?4:-4;
      
      score += 50;
		  this.scoreLabel.text = score;
    }
        
    

    
    if(this.bricks.length == 0)
      this.win();
  },
  
  ballLost: function() {
    
      this.dead();
  },

	playerMovements: function() {
    
		if (this.cursor.up.isDown && this.currentDirection != 2) 
        	this.direction = 1;
		else if (this.cursor.down.isDown && this.currentDirection != 1) 
        	this.direction = 2;
		else if (this.cursor.left.isDown && this.currentDirection != 4) 
        	this.direction = 3;
        else if (this.cursor.right.isDown && this.currentDirection != 3) 
        	this.direction = 4;
	}
};

