// var Player = function (game, x, y, name) {
// 	Entity.apply(this, [game, x, y, name]);
// 	this.title = 'player';	
// 	this.scale.setTo(1.75, 1.75);
// 	game.physics.arcade.enable(this);
// 	this.body.bounce.y = 0.2;
// 	this.body.gravity.y = 500;
// 	this.body.collideWorldBounds = true;
// 	this.animations.add('walk', [5, 6, 7, 8], 10, true);
// 	this.speedX = 350;	
// };

var Player = function (game, x, y, name) {
	var player = Entity(game, x, y, name);	
	player.scale.setTo(1.75, 1.75);
	game.physics.arcade.enable(player);
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 500;
	player.body.collideWorldBounds = true;
	player.animations.add('walk', [5, 6, 7, 8], 10, true);
	player.speedX = 350;
	
	player.update = Player.update;
		
	return player;
};

//Player.prototype = Object.create(Entity.prototype);
//Player.prototype.constructor = Player;

Player.update = function (game) {
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