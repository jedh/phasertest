var Player = function (game, x, y, name) {
	Entity.apply(this, [game, x, y, name]);
};

//Player.prototype = new Entity(game, x, y, name);
Player.prototype = Object.create(Entity.prototype);

Player.prototype.update = function (game) {
	if (this.body.velocity.x != 0) {
		this.animations.play('walk');
		
		if (this.body.velocity.x < 0)
		{
			this.scale.x = -Math.abs(this.scale.x);
		} else {
			this.scale.x = Math.abs(this.scale.x);
		}
	}
	else {
		this.animations.stop();
		this.frame = 4;
	}
};