var Entity = function (game, x, y, name) {
	Phaser.Sprite.apply(this, [game, x, y, name]);
	this.title = 'entity';
	this.anchor.setTo(0.5, 0.5);	
	this.speedX = 0;	
	this.isAirborne = false; // True if the sprite is in the air.			
};

Entity.prototype = Object.create(Phaser.Sprite.prototype);
Entity.prototype.constructor = Entity;