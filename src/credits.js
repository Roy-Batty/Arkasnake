Game.Credits = function (game) { };

Game.Credits.prototype = {
	create: function () {
		game.stage.backgroundColor = '#000';
    
    var style = { font: '35px Arial', fill: '#62ff00', stroke: '#33aaaa', strokeThickness: 2, align: 'center'};
    var t = 'Desarrollo del juego:\nJavier Perez Martinez';
		var text1 = game.add.text(semiW, semiH-150, t, style);
		text1.anchor.setTo(0.5, 0.5);
    
    var t = 'Recursos gráficos:\nJavier Perez Martinez';
		var text2 = game.add.text(semiW, semiH-40, t, style);
		text2.anchor.setTo(0.5, 0.5);
    
    var grd = text1.context.createLinearGradient(0, 0, 0, text1.height);
    grd.addColorStop(0, '#fff');
    grd.addColorStop(1, '#555');
    text1.fill = grd;
    text2.fill = grd;
        
    
		var style = { font: 'bold 25px Arial', fill: '#edc623', stroke: '#181818', strokeThickness: 0};
		var exit = game.add.text(semiW, semiH + 200, 'volver atras', style);
    
    var grd = exit.context.createLinearGradient(0, 0, 0, exit.height);
    grd.addColorStop(0, '#edc623');
    grd.addColorStop(1, '#937700');
    exit.fill = grd;
		exit.anchor.setTo(0.5, 0.5);
    exit.scale.setTo(0, 0);
    
    
    exit.inputEnabled = true;
    exit.events.onInputDown.add(this.goMenu, this);
    
    var tw = game.add.tween(exit.scale).to({x: 1, y: 1}, 250).start();
    tw.chain(game.add.tween(exit.scale).to({x: 1.25, y: 1.25}, 500).to({x: 1, y: 1}, 500).loop());
        
	},
  
  init: function(arg) {
    goTo = arg;
  },
  
  goMenu: function() {
    this.game.state.start(goTo);
  }
};
