TestGame.Play = function (game) {
	this.player;
	this.platforms ;
	this.cursors;
	this.itemSpawner;
	this.hazardGroup;
	this.scoreText;
	this.score = 0; // Could look at making this a game global.
	this.cameraShakeTween;
	this.gameOver = false;
};

TestGame.Play.prototype = {	
	create: function() {
		game.world.setBounds(0, -50, 640, 580);
							
		this.add.sprite(0, 0, 'background');						
		
		this.platforms = this.add.group();
		this.platforms.enableBody = true;
		
		var ground = this.platforms.create(0, game.world.height - 150, 'ground');
		ground.scale.setTo(2, 2);
		ground.body.immovable = true;
		
		this.hazardGroup = this.add.group();
		this.hazardGroup.enableBody = true;	
		this.hazardGroup.physicsBodyType = Phaser.Physics.ARCADE;
		
		this.itemSpawner = new ItemSpawner(game, this.hazardGroup);			
		
		//this.player = Entity.getPlayer(game, game.world.centerX, game.world.height - 200);
		this.player = new Player(game, game.world.centerX, game.world.height - 200, 'player');
		game.add.existing(this.player);
		
		this.scoreText = game.add.text(12, 0, "", {
			font: '32px Arial Black',
			fill: '#FF9933',
			align: 'center'
		});
		this.scoreText.setShadow(3, 3, 'rgba(255, 102, 255, 0.6)', 0);
		this.updateScore();		
		//this.scoreText.anchor.setTo(0.5, 0.5);
		
		this.cursors = this.game.input.keyboard.createCursorKeys();		
					
	},
	
	update: function() {
		// Rig up all the collisions.
		this.player.isAirborne = !this.game.physics.arcade.collide(this.player, this.platforms);			
		this.game.physics.arcade.collide(this.player, this.hazardGroup, this.playerCollisionHandler, null, this);
		this.game.physics.arcade.collide(this.platforms, this.hazardGroup, this.groundCollisionHandler, null, this);	
		
		this.player.body.velocity.x = 0;
		
		if (!this.gameOver) {																	
			if (this.cursors.left.isDown){
				this.player.body.velocity.x = -this.player.speedX;
			}
			else if (this.cursors.right.isDown) {
				this.player.body.velocity.x = this.player.speedX;
			}
			
			// You can jump while moving.
			if (this.cursors.up.isDown && !this.player.isAirborne) {
				this.player.body.velocity.y = -250;
			}		
			
			this.player.update(game);
			this.itemSpawner.update(game);
		}
		else {
			if (this.cursors.down.isDown) {
				this.restartGame();
			}
		}
	},
	
	playerCollisionHandler: function (player, hazard) {				
		// We only care about collisions if the hazard is alive.
		if (hazard.alive) {
			var playerTop = player.y - player.height * 0.5;
			var hazardBottom = hazard.y + hazard.height * 0.5;
			if (playerTop <= (hazardBottom)) {
				this.hazardHit(hazard);
			}
			else {
				this.scoreText.setText('LOSER...hit down to restart...');
				//hazard.kill();
				this.player.kill();
				this.gameOver = true;
			}
		}
	},
	
	groundCollisionHandler: function(ground, hazard) {		
		// game.time.events.add(50, function() {
		// 	this.score -= 10;
		// 	this.scoreText.setText('score: ' + this.score);
		// 	hazard.kill();
		// 	// Shake camera.
		// 	this.shakeCamera();
		// }, this);
		
		if (!this.gameOver) {
			this.score -= 50;
			this.updateScore();
		}
		
		hazard.kill();
		this.shakeCamera();
	},
	
	shakeCamera: function() {
		// game.add.tween(game.camera).to( { y: -20}, 66, 'Power0', true, 0, 1, true);
		this.cameraShakeTween = game.add.tween(game.camera).to( { y: -30}, 66, 'Sine', true, 0, 0, true);
		this.cameraShakeTween.onComplete.add(function () {
			game.add.tween(game.camera).to( { y: 20}, 66, 'Sine', true, 0, 0, true);
		}, this);
	},
	
	restartGame: function() {
		this.score = 0;
		this.updateScore();
		this.gameOver = false;
		this.player.x = game.world.centerX;
		this.player.revive();
	},
	
	updateScore: function() {
		this.scoreText.setText('SCORE: ' + this.score);
	},
	
	hazardHit: function(hazard) {
		this.score += 100;
		if (this.player.isAirborne) {
			this.score += 80;
		}
		
		this.updateScore();
		hazard.body.velocity.x = 400;
		if (hazard.x < this.player.x) {
			hazard.body.velocity.x = -hazard.body.velocity.x;
		}			
		hazard.body.velocity.y = -200;
		hazard.alive = false;
		hazard.lifespan = 500;
		game.add.tween(hazard).to( {alpha: 0}, 450, 'Linear', true);
	}	
};