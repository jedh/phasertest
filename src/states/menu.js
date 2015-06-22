TestGame.Menu = function (game) {
	
};

TestGame.Menu.prototype = {
	create: function() {	
		game.stage.setBackgroundColor(0x169AC5);
		var startLabel = game.add.text(24, game.height * 0.3, 
			"Body check falling crap on their sides. \nDon't let them fall on your head. \nUse the arrow keys. \nTap spacebar to begin.", {
				font: '28px Arial Black',
				fill: '#FF9933',
				align: 'left'
		});
		startLabel.setShadow(3, 3, 'rgba(255, 102, 255, 0.6)', 0);	
		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
		
		spaceKey.onUp.addOnce(this.start, this);
		//this.start();
	},
	
	update: function() {
		
	},
	
	start : function() {
		game.state.start('Play');
	}
}