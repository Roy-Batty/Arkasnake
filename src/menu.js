Game.Menu = function (game) { };

Game.Menu.prototype = {

	create: function() {
		game.stage.backgroundColor = '#000';
        
    var style = { font: 'bold 60px Arial', fill: '#62ff00', stroke: '#33aaaa', strokeThickness: 4};
		var title = game.add.text(semiW, semiH - 180, 'ArkaSnake', style);
		title.anchor.setTo(0.5, 0.5);
    
    var grd = title.context.createLinearGradient(0, 0, 0, title.height);
    grd.addColorStop(0, '#fff');
    grd.addColorStop(1, '#000');
    title.fill = grd;
    
    
		var style = { font: 'bold 44px Arial', fill: '#edc623', stroke: '#2f1000', strokeThickness: 7};
		var play = game.add.text(semiW, semiH, "Jugar", style);
		play.anchor.setTo(0.5, 0.5);
    
    var grd = play.context.createLinearGradient(0, 0, 0, play.height);
    grd.addColorStop(0, '#edc623');
    grd.addColorStop(1, '#937700');
    play.fill = grd;
    
    
		var style = { font: 'bold 30px Arial', fill: '#edc623', stroke: '#2f1000', strokeThickness: 0};
		var instr = game.add.text(semiW, semiH + 120, "Controles", style);
		instr.anchor.setTo(0.5, 0.5);
    
    var grd = instr.context.createLinearGradient(0, 0, 0, instr.height);
    grd.addColorStop(0, '#edc623');
    grd.addColorStop(1, '#937700');
    instr.fill = grd;
    
    
		var style = { font: 'bold 30px Arial', fill: '#edc623', stroke: '#181818', strokeThickness: 0};
		var credits = game.add.text(semiW, semiH + 200, "Creditos", style);
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
  
  goPlay: function() {
    this.game.state.start('Play');
  },
  
  goInstr: function() {
    this.game.state.start('Instr', true, false, 'Menu');
  },
  
  goCredits: function() {
    this.game.state.start('Credits', true, false, 'Menu');
  }
};