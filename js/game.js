function Actor (x, y, health, image) {
    var self = this;
    
    self.getX = function() {
        return x;
    };
    
    self.getY = function() {
        return y;
    };
    
    self.getHealth = function() {
        return health;
    };
    
    self.setX = function(newx) {
        x = newx;
    };
    
    self.setY = function(newy) {
        y = newy;
    };
    
    self.setHealth = function(newhealth) {
        health = newhealth;
    };
    
    self.move = function(dx, dy) {
        x += dx;
        y += dy;
    };
    
    self.damage = function(dhealth) {
        health -= dhealth;
    };
    
    self.draw = function(canvas_context) {
        canvas_context.drawImage(image, x, y);
    };
    
    self.run = function(gamestate, context) {
		context.drawImage(image, x, y);
    };

    return self;
}

function Enemy (x, y, health, image) {
	var self = new Actor(x, y, health, image);
	
	self.run = function(gamestate, context) {
		y += 1;
		context.drawImage(image, x, y);
    };
	
	return self;
}

function Player (x, y, health, image) {
	var self = new Actor(x, y, health, image);
	return self;
}

function GameState () {
	var self = this;
	var actors = [];
	
	self.addActor = function(actor) {
		actors.push(actor);
	};
	
	self.getActors = function(actortype) {
		actortype = typeof actortype !== 'undefined' ? actortype : Object;
		var acts = [];
		for(var i=0; i<actors.length; i++) {
			if(actors[i] instanceof actortype) {
				acts.push(actors[i]);
			}
		}
		return actors;
	};
	
	self.run = function(gamestate, context) {
		for(var i=0; i<actors.length; i++) {
			actors[i].run(gamestate, context);
		}
	};
	
	return self;
}

function Game () {
	var self = this;
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');  
	var images = {};
	var gamestate = new GameState ();
	
	self.init  = function() {
		images.enemyimg1 = new Image();
		images.enemyimg1.src = '/thormme/vhoot/workspace/images/redtri.svg';
		gamestate.addActor(new Enemy(12, 40, 1, images.enemyimg1));
		
		setInterval ( self.run, 20 );
	};
	
	self.run = function () {
		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.restore();
		gamestate.run(gamestate, ctx);
	};
	
	
	
	return self;
}

var game = new Game();
game.init();

