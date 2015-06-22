var Entity = function (game, x, y, name) {
	this.speedX = null;
	this.name = null;
	this.isAirborne = false; // True if the sprite is in the air.
	
	Phaser.Sprite.call(this, game, x, y, name);
	this.anchor.setTo(0.5, 0.5);
	game.add.existing(this);
};

Entity.prototype = Object.create(Phaser.Sprite.prototype);
Entity.prototype.constructor = Entity;

Entity.prototype.whoAmI = function () {
	alert(this.name);	
};

Entity.getPlayer = function (game, x, y) {
	var player = new Player(game, x, y, 'player');	
	player.scale.setTo(1.75, 1.75);
	game.physics.arcade.enable(player);
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 500;
	player.body.collideWorldBounds = true;	
	player.animations.add('walk', [5, 6, 7, 8], 10, true);
	player.speedX = 350;
	player.name = 'player';
	
	return player;
};

Entity.getMonster = function (game, x, y) {
	var monster = new Entity(game, x, y, 'monster');	
	monster.scale.setTo(2.0, 2.0);
	game.physics.arcade.enable(monster);
	monster.body.bounce.y = 0.2;
	monster.body.gravity.y = 300;
	monster.body.collideWorldBounds = true;	
	monster.animations.add('walk', [2, 3], 10, true);
	monster.speedX = 300;
	monster.name = 'monster';
	
	return monster;
}