var game = new Phaser.Game(Width, Height, Phaser.AUTO, 'gameContainer');


game.state.add('Load', Game.Load);
game.state.add('Menu', Game.Menu);
game.state.add('Play', Game.Play);
game.state.add('Over', Game.Over);
game.state.add('Instr', Game.Instr);
game.state.add('Credits', Game.Credits);


game.state.start('Load');