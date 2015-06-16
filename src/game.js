var game = new Phaser.Game(640, 480, Phaser.Auto, 'gameContainer');

// Add all the states here.
game.state.add('boot', TestGame.boot);
game.state.add('load', TestGame.load);
// game.state.add('menu', TestGame.menu);
// game.state.add('game', TestGame.game);

game.state.start('boot');