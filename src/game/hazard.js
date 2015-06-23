var Hazard = function (game, x, y, name) {
	Entity.apply(this, [game, x, y, name]);
	this.title = 'hazard';
	this.scale.setTo(1.5, 1.5);
	//this.body.bounce.y = 0.2;
	this.animations.add('walk', [2, 3], 6, true);
};

Hazard.prototype = Object.create(Entity.prototype);
Hazard.prototype.constructor = Hazard;