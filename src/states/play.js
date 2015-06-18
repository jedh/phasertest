TestGame.Play = function (game) {
	this.player = null;
	this.platforms = null;
	this.cursors;
	this.playerSpeed = 300;
};

TestGame.Play.prototype = {	
	create: function() {	
		this.add.sprite(0, 0, 'background');
		
		this.platforms = this.add.group();
		this.platforms.enableBody = true;
		
		var ground = this.platforms.create(0, game.world.height - 64, 'ground');
		ground.scale.setTo(2, 2);
		ground.body.immovable = true;
		
		this.player = this.add.sprite(game.world.centerX, game.world.height - 150, 'player');
		this.player.anchor.setTo(0.5, 0.5);
		this.player.scale.setTo(1.5, 1.5);
		this.physics.arcade.enable(this.player);
		this.player.body.bounce.y = 0.2;
		this.player.body.gravity.y = 300;
		this.player.body.collideWorldBounds = true;
		this.player.animations.add('walk', [5, 6, 7, 8], 10, true);
		
		this.cursors = this.game.input.keyboard.createCursorKeys();
	},
	
	update: function() {
		this.game.physics.arcade.collide(this.player, this.platforms);
		
		this.player.body.velocity.x = 0;
		
		if (this.cursors.left.isDown){
			this.player.scale.x = -Math.abs(this.player.scale.x);
			this.player.animations.play('walk');
			this.player.body.velocity.x = -this.playerSpeed;
		}
		else if (this.cursors.right.isDown) {
			this.player.scale.x = Math.abs(this.player.scale.x);
			this.player.animations.play('walk');
			this.player.body.velocity.x = this.playerSpeed;
		}
		else {
			this.player.animations.stop();
			this.player.frame = 4;
		}
		
		
	}
};