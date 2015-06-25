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
	this.bodyCheckScore = 100;
	this.dropKickScore = 180;
	this.playerHitScore = -50;
	this.hazardHitScoreText;
	this.groundHitScoreText;
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
		this.player = Player(game, game.world.centerX, game.world.height - 200, 'player');
		game.add.existing(this.player);
		
		this.scoreText = game.add.text(12, 0, "", {
			font: '32px Arial Black',
			fill: '#FF9933',
			align: 'center'
		});
		this.scoreText.setShadow(3, 3, 'rgba(255, 102, 255, 0.6)', 0);
		this.updateScore();						
		//this.scoreText.anchor.setTo(0.5, 0.5);				
		
		this.hazardHitScoreText = new Phaser.Text(game, 100, 100, '0', {
			font: '28px Arial Black',
			fill: '#FF9933',
			align: 'center'
		});
		this.hazardHitScoreText.setShadow(3, 3, 'rgba(255, 102, 255, 0.6)', 0);	
		this.hazardHitScoreText.anchor.set(0.5);	
		
		this.groundHitScoreText = new Phaser.Text(game, 100, 100, '0', {
			font: '28px Arial Black',
			fill: '#FF5050',
			align: 'center'
		});
		this.groundHitScoreText.setShadow(3, 3, 'rgba(255, 255, 102, 0.6)', 0);	
		this.groundHitScoreText.anchor.set(0.5);	
		
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
			this.score += this.playerHitScore;
			this.showGroundHitScoreText(this.playerHitScore, hazard.x);
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
		this.itemSpawner.reset();
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
		if (this.player.isAirborne) {
			this.score += this.dropKickScore;
			this.showHazardHitScoreText(this.dropKickScore, this.player.x, this.player.y);
		}
		else
		{
			this.score += this.bodyCheckScore;
			this.showHazardHitScoreText(this.bodyCheckScore, this.player.x, this.player.y);
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
	},
	
	showHazardHitScoreText: function(score, x, y) {
		this.hazardHitScoreText.revive();
		this.hazardHitScoreText.alpha = 1;		
		this.hazardHitScoreText.x = x;
		this.hazardHitScoreText.y = y - (this.player.height * .5) - 10;
		this.hazardHitScoreText.text = "+" + score;
		game.add.existing(this.hazardHitScoreText);
		game.add.tween(this.hazardHitScoreText).to( { alpha: 0 }, 1000, 'Linear', true);
		this.hazardHitScoreText.lifespan = 1000;			
	},	
	
	showGroundHitScoreText: function(score, x) {
		this.groundHitScoreText.revive();
		this.groundHitScoreText.alpha = 1;		
		this.groundHitScoreText.x = x;
		this.groundHitScoreText.y = game.world.height - 170;
		this.groundHitScoreText.text = score;
		game.add.existing(this.groundHitScoreText);
		game.add.tween(this.groundHitScoreText).to( { alpha: 0 }, 1000, 'Linear', true);
		this.groundHitScoreText.lifespan = 1000;			
	}	
};