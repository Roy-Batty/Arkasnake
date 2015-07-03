Game = {};

var Width = 500;
var Height = 600;
var limit = 400;
var topB = -350;
var leftB = -180;
var semiW = Width/2;
var semiH = Height/2;
var score = 0;
var bestScore = 0;
var level = 0;
var lives = 3;
var goTo = '';

var maps = {
  1: [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0]],
  2: [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 2, 2, 2, 2, 2, 0],
    [0, 1, 1, 1, 1, 1, 0]],
  3: [
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 1, 2, 1, 1, 1],
    [0, 1, 2, 3, 2, 1, 0],
    [0, 0, 1, 2, 1, 0, 0]],
  4: [
    [4, 4, 4, 4, 4, 4, 4],
    [3, 3, 3, 3, 3, 3, 3],
    [2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 1]]
};

function rand(num){ return Math.floor(Math.random() * num) };


Game.Load = function (game) { };

Game.Load.prototype = {
	preload: function () {

		game.load.image('player', 'assets/player.png');
    game.load.image('ball', 'assets/ball.png');
		game.load.image('line', 'assets/line.png');
		game.load.image('brick1', 'assets/brick1.png');
		game.load.image('brick2', 'assets/brick2.png');
		game.load.image('brick3', 'assets/brick3.png');
		game.load.image('brick4', 'assets/brick4.png');
		game.load.image('brick5', 'assets/brick5.png');
		game.load.image('food', 'assets/food.png');
		game.load.image('heart', 'assets/heart.png');

	},
	create: function () {
		game.state.start('Menu');
	}
};
