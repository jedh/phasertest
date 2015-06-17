TestGame.load = function (game) {

};

TestGame.load.prototype = {
	preload: function() {
	},
	
	create: function() {	
		this.state.start('menu');
	}
}