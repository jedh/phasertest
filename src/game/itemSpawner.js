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
		hazard.alpha = 1;		
		hazard.reset(game.world.randomX, -40);		
		// hazard.revive();
		// hazard.alive = true;
	}
	else {
		hazard = new Hazard(game, game.world.randomX, -40, 'monster');
		this.hazardGroup.add(hazard);
		hazard.animations.play('walk');			
	}
	
	hazard.body.gravity.y = game.rnd.between(300, 400);
	if (game.rnd.between(0, 1) > 0)	{
		hazard.scale.x = -hazard.scale.x;			
	}
};

