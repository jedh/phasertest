var Player = function (game, x, y, name) {
	Entity.apply(this, [game, x, y, name]);
	this.title = 'player';
	this.scale.setTo(1.75, 1.75);
	game.physics.arcade.enable(this);
	this.body.bounce.y = 0.2;
	this.body.gravity.y = 500;
	this.body.collideWorldBounds = true;
	this.animations.add('walk', [5, 6, 7, 8], 10, true);
	this.speedX = 350;	
};

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

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