(function () {
	"use strict";
	var base_directory = "../",
		current_game;
	function inputState() {
		var self = {},
			pressedkeys = [];
		self.keys = {
			LEFT: 37,
			UP: 38,
			RIGHT: 39,
			DOWN: 40
		};
		self.isKeyPressed = function (code) {
			return pressedkeys[code] || false;
		};
		self.onKeyup = function (event) {
			pressedkeys[event.keyCode] = false;
		};
		self.onKeydown = function (event) {
			pressedkeys[event.keyCode] = true;
		};
		document.addEventListener('keyup', function (event) { self.onKeyup(event); }, false);
		document.addEventListener('keydown', function (event) { self.onKeydown(event); }, false);
		return self;
	}
	function actor(x, y, health, image, secret) {
		secret = secret || {};
		var self = {};
		secret.x = x;
		secret.y = y;
		secret.health = health;
		secret.image = image;
		secret.type = "actor";
		self.getType = function () {
			return secret.type;
		};
		self.getX = function () {
			return secret.x;
		};
	    self.getY = function () {
	        return secret.y;
	    };
	    self.getHealth = function () {
	        return secret.health;
	    };
	    self.setX = function (newx) {
	        secret.x = newx;
	    };
	    self.setY = function (newy) {
	        secret.y = newy;
	    };
	    self.setHealth = function (newhealth) {
	        health = newhealth;
	    };
	    self.move = function (dx, dy) {
	        secret.x += dx;
	        secret.y += dy;
	    };
	    self.damage = function (dhealth) {
	        secret.health -= dhealth;
	    };
	    self.draw = function (canvas_context) {
	        canvas_context.drawImage(secret.image, secret.x, secret.y);
	    };
	    self.run = function (gamestate, canvas_context) {
			self.draw(canvas_context);
	    };
	    return self;
	}
	function enemy(x, y, health, image, secret) {
		secret = secret || {};
		var self = actor(x, y, health, image, secret),
			super_run = self.run;
		secret.type = "enemy";
		self.run = function (gamestate, canvas_context) {
			secret.y += 1;
			super_run(gamestate, canvas_context);
	    };
		return self;
	}
	function player(x, y, health, image, secret) {
		secret = secret || {};
		var self = actor(x, y, health, image, secret),
			super_run = self.run;
		secret.type = "player";
		self.run = function (gamestate, canvas_context, input) {
			if (input.isKeyPressed(input.keys.UP)) {
				secret.y -= 2;
			}
			if (input.isKeyPressed(input.keys.DOWN)) {
				secret.y += 2;
			}
			if (input.isKeyPressed(input.keys.LEFT)) {
				secret.x -= 2;
			}
			if (input.isKeyPressed(input.keys.RIGHT)) {
				secret.x += 2;
			}
			super_run(gamestate, canvas_context);
	    };
		return self;
	}
	function gameState() {
		var self = {},
			actors = [];
		self.addActor = function (actor) {
			actors.push(actor);
		};
		self.getActors = function (actortype) {
			actortype = typeof actortype !== 'undefined' ? actortype : "actor";
			var acts = [],
				i;
			for (i = 0; i < actors.length; i++) {
				if (actors[i].getType() === actortype || actortype === "actor") {
					acts.push(actors[i]);
				}
			}
			return acts;
		};
		self.run = function (gamestate, context, input) {
			var i;
			for (i = 0; i < actors.length; i++) {
				actors[i].run(gamestate, context, input);
			}
		};
		return self;
	}
	function game() {
		var self = {},
			canvas = document.getElementById('canvas'),
			ctx = canvas.getContext('2d'),
			images = {},
			gamestate = gameState(),
			input = inputState();
		self.init = function () {
			images.enemyimg1 = new Image();
			images.enemyimg1.src = base_directory + 'images/redtri.svg';
			images.playerimg1 = new Image();
			images.playerimg1.src = base_directory + 'images/bluetri.svg';
			gamestate.addActor(enemy(12, 40, 1, images.enemyimg1));
			gamestate.addActor(player(100, 100, 1, images.playerimg1));
			setInterval(self.run, 20);
		};
		self.run = function () {
			ctx.save();
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.restore();
			gamestate.run(gamestate, ctx, input);
		};
		return self;
	}
	current_game = game();
	current_game.init();
}());

