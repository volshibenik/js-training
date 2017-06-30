var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 512;
document.body.appendChild(canvas);

//background image

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
	bgReady = true;
};
bgImage.src = 'img/clouds.jpg';

var hReady = false;
var hImage = new Image();
hImage.onload = function () {
	hReady = true;
}
hImage.src = 'img/hero.png';

var mReady = false;
var mImage = new Image();
mImage.onload = function() {
	mReady = true;
}
mImage.src = 'img/monster.png'
//game objects

var hero = {
	speed : 256,
	x : 0,
	y : 0
};
var monster = {
	x : 0,
	y : 0
};
var monsterCaught = 0;

//handle keyboard controls

var keysDown = {};
addEventListener('keydown', function(e){
	keysDown[e.keyCode] = true;
}, false);

addEventListener('keyup', function(e){
	delete keysDown[e.keyCode];
}, false);

//reset when player catches monster

var reset = function() {
	hero.x = canvas.width/2;
	hero.y = canvas.height/2;
	
	//throw the monster somewhere
	
	monster.x =(32 + Math.random() * (canvas.width - 64));
	monster.y =(32 + Math.random() * (canvas.height - 64));
	
};


var update = function(modifier) {
	if (38 in keysDown) {
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) {
		hero.y +=hero.speed * modifier;
	}
	if (37 in keysDown) {
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) {
		hero.x += hero.speed * modifier;
	}
	
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monsterCaught;
		reset();
	}
	
}

//draw everything

var render = function() {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	if (hReady) {
		ctx.drawImage(hImage, hero.x, hero.y);
	}
	if (mReady) {
		ctx.drawImage(mImage, monster.x, monster.y);
	}
	ctx.fillStyle = 'rgb(250,250,250)';
	ctx.font = '24px cursive';
	ctx.font.color = 'coral';
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	ctx.fillText('Monsters caught: ' + monsterCaught, 32, 32)
}

var main = function () {
	var now = Date.now();
	var delta = now - then;
	update(delta/1000);
	render();
	then = now;
	
	requestAnimationFrame(main);
	
}

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();