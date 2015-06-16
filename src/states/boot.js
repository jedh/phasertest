var TestGame = {};

TestGame.boot = function (game) {

};

TestGame.boot.prototype = {
	init: function() {
		this.physics.startSystem(Phaser.Physics.ARCADE);
	},
	
	preload: function() {
		// Load any assets needed for the loading (backgrounds, loading bars, etc.)
		alert('boot');
	},
	
	create: function() {
		// Everything should be loaded into cache by now.
		// It's now safe to start the real loading.
		this.state.start('load');
	}
}