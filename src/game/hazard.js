// var Hazard = function (game, x, y, name) {
// 	Entity.apply(this, [game, x, y, name]);
// 	this.title = 'hazard';
// 	this.scale.setTo(1.5, 1.5);
// 	//this.body.bounce.y = 0.2;
// 	this.animations.add('walk', [2, 3], 6, true);
// };

var Hazard = function (game, x, y, name) {
	var hazard = Entity(game, x, y, name);
	hazard.title = 'hazard';
	hazard.scale.setTo(1.5, 1.5);
	//this.body.bounce.y = 0.2;
	hazard.animations.add('walk', [2, 3], 6, true);
	
	return hazard;
};

// Hazard.prototype = Object.create(Entity.prototype);
// Hazard.prototype.constructor = Hazard;