TestGame.Load = function (game) {

};

TestGame.Load.prototype = {
	preload: function() {
		this.load.image('background', 'assets/images/sky.png');
		this.load.image('ground', 'assets/images/platform.png');
		this.load.spritesheet('player', 'assets/images/dude.png', 32, 48);
	},
	
	create: function() {	
		this.state.start('Menu');
	}
}