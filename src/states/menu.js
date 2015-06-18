TestGame.Menu = function (game) {
	
};

TestGame.Menu.prototype = {
	create: function() {	
		var startLabel = game.add.text(24, game.height * 0.3, 'Tap "w" to begin.',
			{ font: '32px Arial', fill: '#ffffff'});
			
		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.W); 
		
		//spaceKey.onUp.addOnce(this.start, this);
		this.start();
	},
	
	update: function() {
		
	},
	
	start : function() {
		game.state.start('Play');
	}
}