var ItemSpawner = function (game, hazardGroup) {
	this.timer = 0;
	this.timeToSpawn = game.rnd.integerInRange(1000, 3000);
	this.hazardGroup = hazardGroup;
};

ItemSpawner.prototype.update = function(game) {
	this.timer += game.time.elapsed;
	if (this.timer > this.timeToSpawn) {
		this.timer = 0;
		this.timeToSpawn = game.rnd.between(500, 2500);
		this.spawnHazard(game);
	}	
};

ItemSpawner.prototype.spawnHazard = function(game) {
	var hazard = this.hazardGroup.getFirstExists(false);
	
	if (hazard) {		
		// Not sure this is needed, maybe if we need alive to be true?
		// The reset method seems to work despite docs not saying alive is set to true.
		hazard.lifetime = 0; 		
		hazard.alpha = 1;		
		hazard.reset(game.world.randomX, -40);
		// hazard.revive();
		// hazard.alive = true;
		if (game.rnd.between(0, 1) > 0)	{
			hazard.scale.x = -hazard.scale.x;
			hazard.body.gravity.y = game.rnd.between(300, 400);
		}

	}
	else {
		hazard = this.hazardGroup.create(game.world.randomX, -40, 'monster');
		hazard.name = 'hazard';
		//hazard.body.collideWorldBounds = true;
		hazard.anchor.setTo(0.5, 0.5);
		hazard.scale.setTo(1.5, 1.5);
		//hazard.body.bounce.y = 0.2;
		hazard.body.gravity.y = game.rnd.between(300, 400);
		hazard.animations.add('walk', [2, 3], 6, true);
		hazard.animations.play('walk');
		if (game.rnd.between(0, 1) > 0)	{
			hazard.scale.x = -hazard.scale.x;
		}	
	}
};

