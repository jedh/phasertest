(function () {
	'use stict';
	
	requirejs.config({
		baseUrl: "src/",
		
		paths: {
			phaser: "libs/phaser.js"
		},
		
		shim: {
			'phaser': {
				exports: 'Phaser'
			}
		}
	});
	
	require(['stat'])
}());