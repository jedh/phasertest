TestGame.Play = function (game) {
	this.player = null;
	this.platforms = null;
	this.cursors = null;
	this.itemSpawner = null;
	this.hazardGroup = null;
	this.scoreText = null;
	this.score = 0; // Could look at making this a game global.
};

TestGame.Play.prototype = {	
	create: function() {					
		this.add.sprite(0, 0, 'background');
		
		this.scoreText = game.add.text(12, 0, "score: 0", {
			font: '32px Arial',
			fill: '#990044',
			align: 'center'
		});
		//this.scoreText.anchor.setTo(0.5, 0.5);		
		
		this.platforms = this.add.group();
		this.platforms.enableBody = true;
		
		var ground = this.platforms.create(0, game.world.height - 64, 'ground');
		ground.scale.setTo(2, 2);
		ground.body.immovable = true;
		
		this.hazardGroup = this.add.group();
		this.hazardGroup.enableBody = true;	
		this.hazardGroup.physicsBodyType = Phaser.Physics.ARCADE;
		
		this.itemSpawner = new ItemSpawner(game, this.hazardGroup);			
		
		this.player = Entity.getPlayer(game, game.world.centerX, game.world.height - 150);
		
		this.cursors = this.game.input.keyboard.createCursorKeys();			
	},
	
	update: function() {
		// Rig up all the collisions.
		this.game.physics.arcade.collide(this.player, this.platforms);			
		this.game.physics.arcade.collide(this.player, this.hazardGroup, this.playerCollisionHandler, null, this);
		this.game.physics.arcade.collide(this.platforms, this.hazardGroup, this.groundCollisionHandler, null, this);	
		
		this.player.body.velocity.x = 0;								
		if (this.cursors.left.isDown){
			// this.player.scale.x = -Math.abs(this.player.scale.x);
			// this.player.animations.play('walk');
			this.player.body.velocity.x = -this.player.speedX;
		}
		else if (this.cursors.right.isDown) {
			// this.player.scale.x = Math.abs(this.player.scale.x);
			// this.player.animations.play('walk');
			this.player.body.velocity.x = this.player.speedX;
		}
		else {
			//this.player.animations.stop();
			//this.player.frame = 4;
		}
		
		this.player.update(game);
		this.itemSpawner.update(game);
	},
	
	playerCollisionHandler: function (player, hazard) {
		this.score += 100;
		this.scoreText.setText('score: ' + this.score);
		hazard.kill();
	},
	
	groundCollisionHandler: function(ground, hazard) {		
		game.time.events.add(100, function() {
			this.score -= 10;
			this.scoreText.setText('score: ' + this.score);
			hazard.kill();
		}, this);
		//hazard.kill();
	}	
};