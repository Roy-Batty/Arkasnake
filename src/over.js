Game.Over = function (game) { };

Game.Over.prototype = {
	create: function () {
    
		game.stage.backgroundColor = '#000';
		this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    if(level==0) {
      var text1 = 'Enorabuena';
      var text2 = 'Has completado el juego';
    }
    else {
      var text1 = 'Game Over';
      var text2 = '';
    }
    
		var style = { font: 'bold 60px Arial', fill: '#fff', stroke: '#2f1000', strokeThickness: 9};
		var label1 = game.add.text(semiW, semiH - 200, text1, style);
		label1.anchor.setTo(0.5, 0.5);
		var label2 = game.add.text(semiW, semiH - 130, text2, { font: '30px Arial', fill: '#fff'});
		label2.anchor.setTo(0.5, 0.5);
    
    var grd = label1.context.createLinearGradient(0, 0, label1.width, label1.height);
    grd.addColorStop(0, '#edc623');
    grd.addColorStop(1, '#937700');
    label1.fill = grd;
    label2.fill = grd;
    
    
		if (score > bestScore) {
		  bestScore = score;
      var text1 = 'Nuevo record';
      var style1 = { font: '40px Arial', fill: '#fff'};
      var text2 = '' + score;
      var style2 = { font: '60px Arial', fill: '#fff'};
    }
    else {
      var text1 = 'Record: ' + bestScore;
      var style1 = { font: '20px Arial', fill: '#fff'};
      var text2 = 'Puntuación: ' + score;
      var style2 = { font: '35px Arial', fill: '#fff'};
    }
    
    var label3 = game.add.text(semiW, semiH - 60, text1, style1);
		label3.anchor.setTo(0.5, 0.5);
		var label4 = game.add.text(semiW, semiH + 10, text2, style2);
		label4.anchor.setTo(0.5, 0.5);
    
    var grd = label4.context.createLinearGradient(0, 0, label4.width, label4.height);
    grd.addColorStop(0, '#edc623');
    grd.addColorStop(1, '#937700');
    label3.fill = grd;
    label4.fill = grd;
    
    
		var style = { font: 'bold 44px Arial', fill: '#edc623', stroke: '#2f1000', strokeThickness: 7};
		var play = game.add.text(semiW, semiH + 80, "Nueva partida", style);
		play.anchor.setTo(0.5, 0.5);
    
    var grd = play.context.createLinearGradient(0, 0, 0, play.height);
    grd.addColorStop(0, '#edc623');
    grd.addColorStop(1, '#937700');
    play.fill = grd;
    
    
		var style = { font: 'bold 30px Arial', fill: '#edc623', stroke: '#2f1000', strokeThickness: 0};
		var instr = game.add.text(semiW - 100, semiH + 200, "Controles", style);
		instr.anchor.setTo(0.5, 0.5);
    
    var grd = instr.context.createLinearGradient(0, 0, 0, instr.height);
    grd.addColorStop(0, '#edc623');
    grd.addColorStop(1, '#937700');
    instr.fill = grd;
    
    
		var style = { font: 'bold 30px Arial', fill: '#edc623', stroke: '#181818', strokeThickness: 0};
		var credits = game.add.text(semiW + 100, semiH + 200, "Creditos", style);
		credits.anchor.setTo(0.5, 0.5);
    
    var grd = credits.context.createLinearGradient(0, 0, 0, credits.height);
    grd.addColorStop(0, '#edc623');
    grd.addColorStop(1, '#937700');
    credits.fill = grd;
    
    
    play.inputEnabled = true;
    instr.inputEnabled = true;
    credits.inputEnabled = true;
    
    play.events.onInputDown.add(this.goPlay, this);
    instr.events.onInputDown.add(this.goInstr, this);
    credits.events.onInputDown.add(this.goCredits, this);
    
	},
  
	update: function() {
		if (this.space.isDown) {
			this.iniPlay();
		}
				
	},
  
  iniPlay: function() {
      score = 0;
      lives = 3;
      level = 0;
			game.state.start('Play');	    
  },
  
  goPlay: function() {
    this.iniPlay();
  },
  
  goInstr: function() {
    this.game.state.start('Instr', true, false, 'Over');
  },
  
  goCredits: function() {
    this.game.state.start('Credits', true, false, 'Over');
  }
};
