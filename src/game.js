var game = new Phaser.Game(640, 480, Phaser.Auto, 'gameContainer');

// Add all the states here.
game.state.add('Boot', TestGame.Boot);
game.state.add('Load', TestGame.Load);
game.state.add('Menu', TestGame.Menu);
game.state.add('Play', TestGame.Play);

game.state.start('Boot');