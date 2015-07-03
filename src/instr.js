Game.Instr = function (game) { };

Game.Instr.prototype = {
	create: function () {
		game.stage.backgroundColor = '#000';
    
    var style = { font: '30px Arial', fill: '#62ff00', stroke: '#33aaaa', strokeThickness: 1};
		var title1 = game.add.text(semiW, semiH - 200, 'Instrucciones:', style);
		title1.anchor.setTo(0.5, 0.5);
    
    var grd = title1.context.createLinearGradient(0, 0, 0, title1.height);
    grd.addColorStop(0, '#fff');
    grd.addColorStop(1, '#000');
    title1.fill = grd;
    
		var title2 = game.add.text(semiW, semiH + 20, 'Controles:\n', style);
		title2.anchor.setTo(0.5, 0.5);
    title2.fill = grd;
    
    
    
    var t = 'Acaba con todos los bloques\nde la zona superior\ny no dejes escapar la pelota';
		var text1 = game.add.text(semiW, semiH - 125, t, { font: '30px Arial', fill: '#fff', align: 'center'});
		text1.anchor.setTo(0.5, 0.5);
        
    var t = 'Utiliza las flechas del teclado\npara controlar la serpiente';
		var text2 = game.add.text(semiW, semiH + 80, t, { font: '30px Arial', fill: '#fff', align: 'center'});
		text2.anchor.setTo(0.5, 0.5);
    
    
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
