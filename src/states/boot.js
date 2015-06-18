var TestGame = {};

TestGame.Boot = function (game) {

};

TestGame.Boot.prototype = {
	init: function() {
		this.physics.startSystem(Phaser.Physics.ARCADE);
	},
	
	preload: function() {
		// Load any assets needed for the loading (backgrounds, loading bars, etc.)
	},
	
	create: function() {
		// Everything should be loaded into cache by now.
		// It's now safe to start the real loading.
		this.state.start('Load');
	}
}