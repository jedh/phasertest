var ItemSpawner = function (game, hazardGroup) {
	this.timer = 0;
	this.timeToSpawn = game.rnd.integerInRange(1000, 3000);
	this.hazardGroup = hazardGroup;
};

ItemSpawner.prototype.update = function(game) {
	this.timer += game.time.elapsed;
	if (this.timer > this.timeToSpawn) {
		this.timer = 0;
		this.timeToSpawn = game.rnd.integerInRange(1000, 3000);
		this.spawnHazard(game);
	}	
};

ItemSpawner.prototype.spawnHazard = function(game) {
	var hazard = this.hazardGroup.getFirstExists(false);
	
	if (hazard) {		
		// Not sure this is needed, maybe if we need alive to be true?
		// The reset method seems to work despite docs not saying alive is set to true.
		//hazard.revive(); 
		hazard.reset(game.world.randomX, 0);		
	}
	else {
		hazard = this.hazardGroup.create(game.world.randomX, 0, 'monster');
		hazard.name = 'hazard';
		//hazard.body.collideWorldBounds = true;
		hazard.anchor.setTo(0.5, 0.5);
		hazard.body.bounce.y = 0.2;
		hazard.body.gravity.y = 300;	
	}
};

